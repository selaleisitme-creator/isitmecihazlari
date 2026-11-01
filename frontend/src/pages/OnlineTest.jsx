import { X, Menu, Phone, MapPin, Headphones } from 'lucide-react';
import { useState, useEffect } from 'react';
import * as Tone from "tone";
import SEO from '../components/SEO'; 

export default function OnlineTest(){ 
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Anasayfa", active: false },
    { to: "/randevu", label: "Randevu Alın", active: false },
    { to: "/terapi-programi", label: "Rehabilitasyon Programı", active: false },
    { to: "/urun-katalogu", label: "Ürün Kataloğu", active: false },
    { to: "/odeme-planlari", label: "SGK", active: false },
    { to: "/audio-servis", label: "Telefon Uygulaması", active: false },
    { to: "/hakkimizda", label: "Hakkımızda", active: false }, 
    { to: "/online-test", label: "Ücretsiz İşitme Testi", active: true }, 
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalTest",
    "name": "Online İşitme Testi",
    "description": "Ücretsiz online işitme kaybı testi. 6 farklı frekansta işitme eşiğinizi ölçün.",
    "usedToDiagnose": {
      "@type": "MedicalCondition",
      "name": "İşitme Kaybı"
    }
  };

  const [step, setStep] = useState(0);
  const [ear, setEar] = useState("left");
  const [frequencyIndex, setFrequencyIndex] = useState(0);
  const [volume, setVolume] = useState(-10);
  const [result, setResult] = useState({ left: [], right: [] });
  const [playing, setPlaying] = useState(false);
  const [testDone, setTestDone] = useState(false);
  const [headphonesChecked, setHeadphonesChecked] = useState(false);

  // Updated frequencies including 250Hz and 8000Hz
  const frequencies = [250, 500, 1000, 2000, 4000, 8000];

  // Key dB levels for the slider
  const dbLevels = [-10, 0, 25, 30, 40, 45, 55, 75, 90, 95];

  // Snap volume to nearest key level
  const snapToNearestLevel = (val) => {
    return dbLevels.reduce((prev, curr) => 
      Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev
    );
  };

  const playTone = async () => {
    try {
      await Tone.start();
      
      // Create a panner for stereo positioning
      const panner = new Tone.Panner(ear === "left" ? -1 : 1).toDestination();
      
      // Create oscillator with specific frequency
      const synth = new Tone.Oscillator(frequencies[frequencyIndex], "sine").connect(panner);
      
      // Convert dB to Tone.js volume (-Infinity to 0)
      // Tone.js uses a logarithmic scale where 0 is maximum
      // We map our dB scale (which goes higher for louder) to Tone's scale
      const toneVolume = volume - 95; // Normalize to Tone.js range
      synth.volume.value = toneVolume;
      
      synth.start();
      setPlaying(true);
      
      setTimeout(() => {
        synth.stop();
        synth.dispose();
        panner.dispose();
        setPlaying(false);
      }, 1500);
    } catch (error) {
      console.error("Error playing tone:", error);
      setPlaying(false);
    }
  };

  const handleVolumeChange = (newVolume) => {
    const snapped = snapToNearestLevel(newVolume);
    setVolume(snapped);
  };

  const handleContinue = () => {
    if (frequencyIndex < frequencies.length - 1) {
      setResult((prev) => ({
        ...prev,
        [ear]: [...prev[ear], { freq: frequencies[frequencyIndex], vol: volume }],
      }));
      setFrequencyIndex((prev) => prev + 1);
      setVolume(-10);
    } else if (ear === "left") {
      setResult((prev) => ({
        ...prev,
        left: [...prev.left, { freq: frequencies[frequencyIndex], vol: volume }],
      }));
      setEar("right");
      setFrequencyIndex(0);
      setVolume(-10);
    } else {
      setResult((prev) => ({
        ...prev,
        right: [...prev.right, { freq: frequencies[frequencyIndex], vol: volume }],
      }));
      setTestDone(true);
    }
  };

  const getHearingAssessment = (dbValue) => {
    if (dbValue >= -10 && dbValue <= 25) return { level: "Normal", color: "text-green-600" };
    if (dbValue >= 26 && dbValue <= 40) return { level: "Olası İşitme Kaybı", color: "text-yellow-600" };
    if (dbValue >= 41 && dbValue <= 55) return { level: "İşitme Kaybı", color: "text-orange-500" };
    if (dbValue >= 56 && dbValue <= 90) return { level: "İleri Derecede İşitme Kaybı", color: "text-red-600" };
    return { level: "Çok İleri Derecede İşitme Problemi", color: "text-red-800" };
  };

  const hasAnyHearingLoss = (earResults) => {
    return earResults.some(r => r.vol > 25);
  };

  const checkAsymmetricLoss = () => {
    const leftAvg = calculateAverageHearing(result.left);
    const rightAvg = calculateAverageHearing(result.right);
    return Math.abs(leftAvg - rightAvg) >= 16;
  };

  const calculateAverageHearing = (earResults) => {
    const avg = earResults.reduce((sum, r) => sum + r.vol, 0) / earResults.length;
    return Math.round(avg);
  };

  return (
    <>
      {/* SEO Meta Tags - Add this at the top of your component */}
      <SEO 
        title="Ücretsiz Online İşitme Testi | Şelale İşitme Merkezi Sarıyer İstanbul"
        description="İstanbul Sarıyer'de ücretsiz online işitme testi. İşitme kaybı testi, odyogram, işitme cihazı danışmanlığı. Hemen test olun, randevu alın. ☎️ 0532 275 24 14"
        keywords="işitme testi, çevrimiçi işitme testi, online işitme testi, ücretsiz işitme testi, işitme kaybı testi, odyogram, işitme cihazı, Sarıyer işitme merkezi, İstanbul işitme testi, işitme problemi, kulak testi, hearing test turkey, hearing test"
        ogImage="/images/IC.png"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-white relative">
        {/* Rest of your component code stays the same */}
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Menü"
          className={`fixed top-6 left-6 z-50 bg-blue-900 hover:bg-blue-800 text-white p-3 rounded-lg shadow-lg focus:outline-none transition-opacity duration-300 ${
            sidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <Menu className="w-6 h-6" />
        </button>
    <div className="min-h-screen bg-white relative">

      {/* Menü Açma Butonu */}
      <button
        onClick={() => setSidebarOpen(true)}
        aria-label="Menü"
        className={`fixed top-6 left-6 z-50 bg-blue-900 hover:bg-blue-800 text-white p-3 rounded-lg shadow-lg focus:outline-none transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
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
            className="p-1 text-gray-600 hover:text-gray-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-center py-6">
          <img src="/images/selaleLogo.jpeg" alt="Şelale Logo" className="w-32 h-auto rounded-lg shadow-sm" />
        </div>

        <nav className="p-5 space-y-3">
          {navLinks.map((link) => (
            <a 
              key={link.to} 
              href={link.to} 
              onClick={() => setSidebarOpen(false)} 
              className={`block font-medium ${link.active ? 'text-blue-900 font-semibold' : 'text-gray-800 hover:text-blue-900'}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="p-5 border-t border-gray-200">
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

      {/* Ana İçerik */}
      <section className="max-w-3xl mx-auto my-12 px-4 text-center">
        {!headphonesChecked && step === 0 && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-8 mb-8">
            <Headphones className="w-16 h-16 text-blue-900 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
              Kulaklık Kontrolü
            </h2>
            <p className="text-gray-700 mb-6">
              Bu test için kulaklık kullanmanız gerekmektedir. Lütfen kulaklığınızı takın ve her bir kulağın doğru kanala ayarlandığından emin olun.
            </p>
            <div className="bg-white rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold mb-2">Test Öncesi Kontrol Listesi:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Kulaklığınızı doğru şekilde takın (L = Sol, R = Sağ)</li>
                <li>Sessiz bir ortamda olun</li>
                <li>Cihazınızın ses seviyesini orta seviyede tutun</li>
                <li>Test sırasında dikkatlice dinleyin</li>
              </ul>
            </div>
            <button
              className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 font-semibold"
              onClick={() => setHeadphonesChecked(true)}
            >
              Kulaklığım Hazır, Başlayalım
            </button>
          </div>
        )}

        {headphonesChecked && !testDone && (
          <>
            {step === 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                  {ear === "left" ? "Sol" : "Sağ"} Kulak Testi
                </h2>
                <p className="text-gray-600 mb-6">
                  {frequencies.length} farklı frekansta tonlar duyacaksınız. Her frekans için sesi duyabileceğiniz en düşük seviyeye ayarlayın.
                </p>
                <button
                  className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
                  onClick={() => setStep(1)}
                >
                  Teste Başla
                </button>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h3 className="text-2xl font-semibold text-blue-900">
                    {ear === "left" ? "Sol Kulak" : "Sağ Kulak"} – {frequencies[frequencyIndex]} Hz
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Frekans {frequencyIndex + 1} / {frequencies.length}
                  </p>
                </div>
                
                <p className="text-gray-600">
                  Sesi duyabileceğiniz en düşük seviyeye ayarlayın (eşik seviyesi)
                </p>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-blue-900">{volume} dB HL</span>
                  </div>

                  <div className="flex items-center justify-center gap-4 mb-4">
                    <button 
                      type="button"
                      className="flex items-center justify-center text-3xl font-bold w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200" 
                      onClick={() => {
                        const newVol = Math.max(-10, volume - 5);
                        setVolume(newVol);
                      }}
                    >
                      <span className="leading-none">−</span>
                    </button>
                    
                    <div className="flex-1 px-4">
                      <div 
                        className="w-full h-3 bg-gray-200 rounded-full relative overflow-hidden"
                      >
                        <div 
                          className="h-full bg-blue-900 rounded-full transition-all duration-200"
                          style={{
                            width: `${((volume + 10) / 105) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                    
                    <button 
                      type="button"
                      className="flex items-center justify-center text-3xl font-bold w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200" 
                      onClick={() => {
                        const newVol = Math.min(95, volume + 5);
                        setVolume(newVol);
                      }}
                    >
                      <span className="leading-none">+</span>
                    </button>
                  </div>

                  <div className="flex justify-center gap-6 mt-6">
                    <button 
                      onClick={playTone} 
                      disabled={playing} 
                      className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
                    >
                      {playing ? "Çalıyor..." : "SESI OYNAT🔊"}
                    </button>

                    <button 
                      onClick={handleContinue} 
                      className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 font-semibold"
                    >
                      Devam Et
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {testDone && (
          <div className="mt-10">
            <h2 className="text-3xl font-bold text-green-600 mb-6">Test Tamamlandı!</h2>
            
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-8">
              <p className="text-gray-700 font-semibold">
                Bu bir ön tarama testidir — kesin sonuçlar için mutlaka bir işitme uzmanına başvurun.
              </p>
            </div>

            {(hasAnyHearingLoss(result.left) || hasAnyHearingLoss(result.right)) && (
              <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-4 mb-6">
                <p className="text-orange-800 font-semibold mb-3">
                  Dikkat: Bir veya daha fazla frekansta olası işitme kaybı tespit edildi. Profesyonel değerlendirme önerilir.
                </p>
                <button
                  onClick={() => window.location.href = '/randevu'}
                  className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 font-semibold transition-all"
                >
                  Randevu Almak İçin Tıklayın
                </button>
              </div>
            )}

            {checkAsymmetricLoss() && (
              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-6">
                <p className="text-red-800 font-semibold mb-3">
                  Uyarı: İki kulak arasında asimetrik işitme kaybı olasılığı tespit edildi (16 dB ve üzeri fark). Mutlaka bir uzman ile görüşün.
                </p>
                
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Sol Kulak</h3>
                <div className="space-y-2 text-left">
                  {result.left.map((r, i) => {
                    const assessment = getHearingAssessment(r.vol);
                    return (
                      <div key={i} className="flex justify-between items-center bg-white rounded p-2">
                        <span className="font-medium">{r.freq} Hz</span>
                        <span className={`font-bold ${assessment.color}`}>{r.vol} dB HL</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 pt-4 border-t-2 border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Ortalama Eşik:</span>
                    <span className={`font-bold text-lg ${getHearingAssessment(calculateAverageHearing(result.left)).color}`}>
                      {calculateAverageHearing(result.left)} dB HL
                    </span>
                  </div>
                  <p className={`text-sm mt-2 ${getHearingAssessment(calculateAverageHearing(result.left)).color}`}>
                    {getHearingAssessment(calculateAverageHearing(result.left)).level}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Sağ Kulak</h3>
                <div className="space-y-2 text-left">
                  {result.right.map((r, i) => {
                    const assessment = getHearingAssessment(r.vol);
                    return (
                      <div key={i} className="flex justify-between items-center bg-white rounded p-2">
                        <span className="font-medium">{r.freq} Hz</span>
                        <span className={`font-bold ${assessment.color}`}>{r.vol} dB HL</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 pt-4 border-t-2 border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Ortalama Eşik:</span>
                    <span className={`font-bold text-lg ${getHearingAssessment(calculateAverageHearing(result.right)).color}`}>
                      {calculateAverageHearing(result.right)} dB HL
                    </span>
                  </div>
                  <p className={`text-sm mt-2 ${getHearingAssessment(calculateAverageHearing(result.right)).color}`}>
                    {getHearingAssessment(calculateAverageHearing(result.right)).level}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => window.location.href = '/randevu'}
              className="mb-8 bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Profesyonel Test İçin Randevu Alın
            </button>

            <div className="bg-white rounded-lg shadow-md p-6 text-left">
              <h3 className="text-lg font-semibold mb-3 text-blue-900">İşitme Seviyeleri Rehberi:</h3>
              <ul className="space-y-2 text-sm">
                <li><span className="text-green-600 font-semibold">-10 ile 25 dB:</span> Normal</li>
                <li><span className="text-yellow-600 font-semibold">26 ile 40 dB:</span> Hafif İşitme Kaybı</li>
                <li><span className="text-orange-500 font-semibold">41 ile 55 dB:</span> Orta işitme Kaybı</li>
                <li><span className="text-red-600 font-semibold">56 ile 90 dB:</span> İleri Derecede İşitme Kaybı</li>
                <li><span className="text-red-800 font-semibold">90 dB üzeri:</span> Çok İleri Derecede İşitme Kaybı</li>
              </ul>
            </div>
          </div>
        )}
      </section>

    </div>
    </div>
    </>
  );
}
