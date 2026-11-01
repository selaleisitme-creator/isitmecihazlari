

import { Link } from 'react-router-dom';
import { X, Menu, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
import SEO from '../components/SEO'; 
export default function TerapiProgrami(){
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "İşitsel Rehabilitasyon Programı",
    "description": "İşitme kaybı olan bireyler için kişiselleştirilmiş işitsel rehabilitasyon ve terapi programları. İşitme cihazı kullanımını destekleme ve iletişim becerilerini geliştirme.",
    "procedureType": "Rehabilitation",
    "bodyLocation": "Ear",
    "medicalSpecialty": "Otolaryngology" // Kulak Burun Boğaz
  };

  return (
   <>
      {/* SEO Meta Tags - Sayfanın başına eklenmelidir */}
      <SEO 
        title="İşitsel Rehabilitasyon ve Terapi Programı | Şelale İşitme Merkezi İstanbul"
        description="İstanbul Sarıyer'de işitme cihazı kullananlar için özel işitsel rehabilitasyon programları. Duyma, anlama ve iletişim becerilerinizi geliştirin. Randevu için arayın: 0532 275 24 14."
        keywords="işitsel rehabilitasyon, işitme terapisi, işitme cihazı eğitimi, konuşma terapisi, işitme kaybı tedavisi, rehabilitasyon programı, odyoloji, isitme kaybi, isitme cihazi, seltes, seltes işitme, selale işitme, isitme terapisi istanbul, seltes işitme cihazı"
        ogImage="/images/kid.png" // Sayfadaki ilgili görseli kullanın
        structuredData={structuredData}
      />
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
          <Link to="/randevu" onClick={() => setSidebarOpen(false)} className="block text-gray-800 font-medium hover:text-blue-900">
            Randevu Alın
          </Link>
          <Link to="/terapi-programi" onClick={() => setSidebarOpen(false)} className="block text-blue-900 font-semibold">
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


       
        
        {/*main code */ }
        <section id="isitme-rehabilitasyonu" className="max-w-6xl mx-auto my-16 px-6 bg-white rounded-xl shadow-md text-gray-800">
  <h2 className="text-3xl font-semibold text-blue-900 border-l-4 border-blue-900 pl-3 mb-6">
    İşitsel Rehabilitasyon
  </h2>

  <div className="flex flex-col lg:flex-row gap-8 items-start">
    {/* Text Column */}
    <div className="flex-1 space-y-6">
      <p>
        İşitme sorunlarının çözümü yalnızca bir <strong>işitme cihazı</strong> uygulamakla sınırlı değildir. 
        Gerçek başarı, bu sürecin doğru <strong>rehabilitasyon yöntemleri</strong> ile desteklenmesiyle elde edilir. 
        İşitme rehabilitasyonu, yalnızca duymayı değil; <strong>anlamayı ve etkili iletişim kurma becerilerini</strong> de yeniden kazandırmayı hedefler.
      </p>

      <p>
        İşitsel rehabilitasyon sürecinde, işitme kaybı yaşayan birey sürecin merkezindedir. 
        Hedeflerin belirlenmesi ve en uygun çözümlerin seçilmesi aşamalarında hastanın aktif katılımı büyük önem taşır. 
        Değerlendirme tamamlandıktan sonra kişiye özel bir <strong>işitme kaybı yönetim planı</strong> oluşturulur. 
        Bu plan sayesinde hasta, işitmesini koruma ve geliştirme sürecinde aktif bir rol üstlenir.
      </p>

      <p>
        Rehabilitasyon, yalnızca işitmeyi iyileştirmekle kalmaz; bireyin <strong>yaşam kalitesi</strong> algısını da güçlendirir. 
        Cihazın düzenli takibi, bakımı ve rehabilitasyon süreci, cihazın temin edildiği 
        <strong> işitme merkezi</strong> tarafından titizlikle yürütülür.
      </p>

      <p>
        Cihazınızla ilgili herhangi bir sorun yaşamanız durumunda, mutlaka cihazı aldığınız merkeze başvurmanız önemle tavsiye edilir. 
</p>
        <span className="text-red-700 font-semibold">
           Aksi halde, dış müdahaleler sonucunda cihazda oluşabilecek arızalardan işitme merkezi sorumlu tutulamaz.
        </span>
      
    </div>

    {/* Image Column */}
    <div className="flex-1 flex justify-end">
      <img
        src="/images/kid.png"
        alt="Kid with hearing device"
        className="max-w-full h-auto rounded-lg shadow-md"
      />
    </div>
  </div>
</section>

      
    </div> 
    </>
  );
}

{/*ask selale what to include  */}
