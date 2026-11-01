import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Calendar, Clock, User, X, Menu, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config';


export default function RandevuSistemi() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    issue: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookedTimes, setBookedTimes] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00'
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const calendarDays = generateCalendar();
  const monthName = currentMonth.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateSelect = (day) => {
    if (day) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (date >= today) {
        setSelectedDate(day);
        setSelectedTime(null);
      }
    }
  };

  const selectedDayKey = selectedDate
    ? `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`
    : null;

  // Taken times are fetched whenever the time step is shown, so a slot booked
  // by someone else in the meantime appears as unavailable.
  useEffect(() => {
    if (step !== 2 || !selectedDayKey) return;
    let cancelled = false;
    setSlotsLoading(true);
    fetch(`${API_BASE_URL}/api/appointments/booked?date=${selectedDayKey}`)
      .then(res => (res.ok ? res.json() : { times: [] }))
      .then(data => {
        if (cancelled) return;
        const times = data.times || [];
        setBookedTimes(times);
        setSelectedTime(current => (times.includes(current) ? null : current));
      })
      .catch(() => { if (!cancelled) setBookedTimes([]); })
      .finally(() => { if (!cancelled) setSlotsLoading(false); });
    return () => { cancelled = true; };
  }, [step, selectedDayKey]);

  const isPastSlot = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const slot = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), selectedDate, hours, minutes);
    return slot <= new Date();
  };

  const isSlotUnavailable = (time) => bookedTimes.includes(time) || isPastSlot(time);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.email) {
      setError('Lütfen tüm zorunlu alanları doldurunuz.');
      return;
    }

    setLoading(true);
    setError('');
    
    const appointmentData = {
      date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), selectedDate),
      time: selectedTime,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      age: formData.age || '',
      issue: formData.issue || ''
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData)
      });

      if (response.ok) {
        setSubmitted(true);
      } else if (response.status === 409) {
        // Someone took the slot first: send the user back to pick another one.
        const data = await response.json().catch(() => ({}));
        setSelectedTime(null);
        setStep(2);
        setError(data.error || 'Bu saat az önce doldu. Lütfen başka bir saat seçin.');
      } else {
        setError('Randevu oluşturulurken hata oluştu. Lütfen tekrar deneyiniz.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Sunucuya bağlanırken hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Randevu Başarıyla Oluşturuldu!</h2>
          <p className="text-gray-600 mb-2">
            <strong>{formData.name}</strong>, randevunuz için teşekkürler.
          </p>
          <p className="text-gray-600 mb-6">
            Talebiniz bize ulaştı. Yakında sizinle iletişime geçilecektir.
          </p>
          <div className="bg-blue-50 p-4 rounded-xl mb-6">
            <p className="text-sm text-gray-700">
              <strong>Tarih:</strong> {new Date(currentMonth.getFullYear(), currentMonth.getMonth(), selectedDate).toLocaleDateString('tr-TR')}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Saat:</strong> {selectedTime}
            </p>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-8 rounded-lg w-full hover:from-blue-700 hover:to-purple-700 transition"
          >
            Anasayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative">
 {/*for navigation  */}

<button
  onClick={() => setSidebarOpen(true)}
  aria-label="Menü"
  className={`fixed top-6 left-6 z-50 bg-blue-900 hover:bg-blue-800 text-white p-3 rounded-lg shadow-lg focus:outline-none transition-opacity duration-300 ${
    sidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
  }`}
>
  <Menu className="w-6 h-6" />
</button>

      <aside
        className={`fixed top-0 left-0 h-full w-64 max-w-[70vw] z-40 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          boxShadow: "0 10px 30px rgba(2,6,23,0.12)",
          borderRight: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h3 className="text-lg font-bold text-blue-900">Menü</h3>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Logo */}
        <div className="flex justify-center py-6">
          <img
            src="/images/selaleLogo.jpeg"
            alt="Şelale Logo"
            className="w-32 h-auto rounded-lg shadow-sm"
          />
        </div>

        <nav className="p-5 space-y-3">
          <Link to="/" onClick={() => setSidebarOpen(false)} className="block text-gray-800 font-medium hover:text-blue-900">
            Anasayfa
          </Link>
          <Link to="/randevu" onClick={() => setSidebarOpen(false)} className="block text-blue-900 font-semibold">
            Randevu Alın
          </Link>
          <Link to="/terapi-programi" onClick={() => setSidebarOpen(false)} className="block text-gray-800 font-medium hover:text-blue-900">
            Rehabilitasyon Programı
          </Link>
          <Link to="/urun-katalogu" onClick={() => setSidebarOpen(false)} className="block text-gray-800 font-medium hover:text-blue-900">
            Ürün Kataloğu
          </Link>
          <Link to="/odeme-planlari" onClick={() => setSidebarOpen(false)} className="block text-gray-800 font-medium hover:text-blue-900">
            SGK
          </Link>
          <Link to="/audio-servis" onClick={() => setSidebarOpen(false)} className="block text-gray-800 font-medium hover:text-blue-900">
            Telefon Uygulaması
          </Link>
          <Link to="/hakkimizda" onClick={() => setSidebarOpen(false)} className="block text-gray-800 font-medium hover:text-blue-900">
            Hakkımızda
          </Link>
          <Link to="/online-test" onClick={() => setSidebarOpen(false)} className="block text-gray-800 font-medium hover:text-blue-900">
            Ücretsiz İşitme Testi
          </Link>
        </nav> 

        <div style={{ marginTop: "auto" }} className="p-5 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Phone className="w-5 h-5 text-blue-900" />
            <span className="text-gray-800 font-medium">0532 275 24 14</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-blue-900" />
            <span className="text-gray-800 font-medium">Merkez Mah., Sarıyer</span>
          </div>
        </div>
      </aside>


    <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Randevu Alın</h1>
          <p className="text-gray-600 text-lg">İşitme testiniz için bir randevu oluşturun</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center gap-4 mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                step >= s
                  ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}>
                {s}
              </div>
              {s < 3 && <div className={`w-12 h-1 transition ${step > s ? 'bg-linear-to-r from-blue-600 to-purple-600' : 'bg-gray-300'}`}></div>}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Step 1: Date Selection */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-blue-900" />
                Tarih Seçiniz
              </h2>

              <div className="grid md:grid-cols-2 gap-12">
                {/* Calendar */}
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-gray-900">{monthName}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={handlePrevMonth}
                        className="p-2 hover:bg-gray-200 rounded-lg transition"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleNextMonth}
                        className="p-2 hover:bg-gray-200 rounded-lg transition"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'].map((day) => (
                      <div key={day} className="text-center font-bold text-gray-600 text-sm py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {calendarDays.map((day, idx) => (
                      <div key={idx}>
                        {day ? (
                          <button
                            onClick={() => handleDateSelect(day)}
                            className={`w-full aspect-square rounded-lg font-semibold transition ${
                              selectedDate === day
                                ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white'
                                : 'bg-white text-gray-900 hover:bg-blue-50 border border-gray-200'
                            }`}
                          >
                            {day}
                          </button>
                        ) : (
                          <div className="aspect-square"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Date Info */}
                <div>
                  {selectedDate ? (
                    <div className="bg-linear-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200">
                      <p className="text-gray-600 mb-2">Seçili Tarih:</p>
                      <p className="text-3xl font-bold text-gray-900 mb-8">
                        {new Date(currentMonth.getFullYear(), currentMonth.getMonth(), selectedDate).toLocaleDateString('tr-TR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      {/* Düzeltme: Yinelenen ve çakışan sınıflar kaldırıldı */}
                      <button
                        onClick={() => setStep(2)}
                        className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition"
                      >
                        Devam Et
                      </button>
                    </div>
                  ) : (
                    <div className="bg-gray-100 p-6 rounded-2xl text-center">
                      <p className="text-gray-600">Lütfen bir tarih seçiniz</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Time Selection */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Clock className="w-6 h-6 text-blue-900" />
                Saat Seçiniz
              </h2>

              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Seçili Tarih: <strong>{new Date(currentMonth.getFullYear(), currentMonth.getMonth(), selectedDate).toLocaleDateString('tr-TR')}</strong>
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-8">
                {timeSlots.map((time) => {
                  const unavailable = slotsLoading || isSlotUnavailable(time);
                  return (
                    <button
                      key={time}
                      onClick={() => { setSelectedTime(time); setError(''); }}
                      disabled={unavailable}
                      title={bookedTimes.includes(time) ? 'Bu saat dolu' : undefined}
                      className={`py-3 px-4 rounded-lg font-semibold transition ${
                        selectedTime === time
                          ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white' // Düzeltme: bg-gradient-to-r -> bg-linear-to-r
                          : unavailable
                            ? 'bg-gray-100 text-gray-400 line-through border border-gray-200 cursor-not-allowed'
                            : 'bg-gray-100 text-gray-900 hover:bg-blue-50 border border-gray-200'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
              {!slotsLoading && timeSlots.every(isSlotUnavailable) && (
                <p className="mb-6 text-gray-600">Bu gün için boş saat kalmadı. Lütfen başka bir gün seçin.</p>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-50 transition"
                >
                  Geri
                </button>
                {/* Düzeltme: Yinelenen ve çakışan sınıflar kaldırıldı */}
                <button
                  onClick={() => setStep(3)}
                  disabled={!selectedTime}
                  className="flex-1 bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Devam Et
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Contact Form */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <User className="w-6 h-6 text-blue-900" />
                Bilgilerinizi Girin
              </h2>

              <div className="space-y-6 mb-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Ad Soyad *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
                      placeholder="Adınız"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Yaş</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
                      placeholder="Yaşınız"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Telefon *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
                    placeholder="05XX XXX XXXX"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">E-posta *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">İşitme Problemi</label>
                  <textarea
                    name="issue"
                    value={formData.issue}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
                    rows="4"
                    placeholder="İşitme probleminiz hakkında kısaca bilgi verin..."
                  ></textarea>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-50 transition"
                >
                  Geri
                </button>
                {/* Düzeltme: Yinelenen ve çakışan sınıflar kaldırıldı */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {loading ? 'Yükleniyor...' : 'Randevuyu Onayla'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>

  );
}
