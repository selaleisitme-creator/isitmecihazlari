import { X, Menu, Phone, MapPin, Target, Zap, Heart } from 'lucide-react';
import { useState } from 'react';

export default function Hakkimizda(){ 
  const [sidebarOpen, setSidebarOpen] = useState(false);

  
  const navLinks = [
    { to: "/", label: "Anasayfa", active: false },
    { to: "/randevu", label: "Randevu Alın", active: false },
    { to: "/terapi-programi", label: "Rehabilitasyon Programı", active: false },
    { to: "/urun-katalogu", label: "Ürün Kataloğu", active: false },
    { to: "/odeme-planlari", label: "SGK", active: false },
    { to: "/audio-servis", label: "Telefon Uygulaması", active: false },
    { to: "/hakkimizda", label: "Hakkımızda", active: true }, 
    { to: "/online-test", label: "Ücretsiz İşitme Testi", active: false },
  ];

  return (
   
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

      {/* Sidebar Navigasyon */}
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

        {/* Navigasyon Linkleri - Link listesi kullanılarak render ediliyor */}
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

        {/* İletişim Bilgileri */}
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

      
      {/* Ana İçerik - Hakkımızda, Kurucu Profili, Vizyon ve Misyon */}
      <section id="hakkimizda-icerik" className="max-w-6xl mx-auto my-16 px-6 bg-white rounded-xl shadow-md text-gray-800 p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 border-l-4 border-blue-900 pl-4 mb-10">
          Hakkımızda
        </h2>

        {/* 1. KURUCU PROFİLİ VE FOTOĞRAF */}
<div className="flex flex-col md:flex-row items-center gap-8 mb-12 border-b pb-8 border-gray-100">
  {/* Fotoğraf ve İsim */}
  <div className="flex flex-col items-center">
    <div className="relative h-96 rounded-2xl shadow-2xl overflow-hidden mb-4">
      <img
        src="/images/Hakkimizda.png" 
        alt="Fotoğraf"
        className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
      />
    </div>
    <h3 className="text-2xl font-bold text-blue-800">Ody. Şelale Alağaş</h3>
  </div>
  
  {/* Kurucu Mesajı */}
  <div className="flex-1 text-center md:text-left">
     <h3 className="text-2xl font-bold text-blue-800 mb-5">Kurucu Mesajı: Sevdiklerinize Kulak Verin</h3>
    <p className="text-lg leading-relaxed italic text-gray-700">
      "İşitme, sadece bir duyu organının işlevi değil, aynı zamanda yaşamla kurduğumuz bağın temelidir. Şelale İşitme Merkezi'ni kurarken hedefimiz, teknolojiyi insan odaklı bir yaklaşımla birleştirerek her hastamızın hayatına berrak bir ses ve yeni bir güven katmaktı. Hayatın anlamı yaşam kalitesinde gizlidir. Sizlerin gülümsemesi ve gözlerinizde gördüğümüz ışık bizim en büyük motivasyon kaynağımızdır."
    </p>
  </div>
</div>


        {/* 2. VİZYONUMUZ VE MİSYONUMUZ - Yer Değiştirildi */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-12 border-b pb-8 border-gray-100">
          
          {/* Misyonumuz (Artık ilk sütunda) */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-blue-900" />
                Kurumsal Misyonumuz
            </h3>
            <p className="text-lg leading-relaxed text-gray-700">
              Hastalarımızın yaşam kalitesini artırmak için,işitme performansını en üst seviyeye taşıyacak çözümler sunuyoruz.
              Uzman ekibimiz, bireyin işitme kaybına en uygun modeli belirleyerek cihazı kişiye özel olarak programlar,adaptasyon süreci ve kullanıldığı süre boyunca kesintisiz destek sağlar.
            </p>
          </div>
          
          {/* Vizyonumuz (Artık ikinci sütunda) */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-blue-900" />
                Kurumsal Vizyonumuz
            </h3>
            <p className="text-lg leading-relaxed text-gray-700">
             Etik değerlere, yasal düzenlemelere ve profesyonel standartlara bağlı kalarak; yenilikçi, güvenilir ve hasta odaklı bir hizmet 
             anlayışıyla işitme sağlığı alanında öncü olmayı hedefliyoruz.
             Yapay zeka teknolojilerini sağlık hizmetlerine entegre ederek sektöre yön verirken 35 yılı aşkın bilgi birikimimizi geleceğin sağlık personellerine aktarmayı sürdürüyoruz.
            </p>
          </div>
        </div>

        {/* 3. TEMEL DEĞERLERİMİZ */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-600" />
              Temel Değerlerimiz
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <li className="p-4 bg-blue-50 rounded-xl shadow-md border-t-4 border-blue-500 hover:shadow-lg transition">
              <strong className="text-blue-700 block mb-1">Bilim ve Teknoloji Odaklı Yaklaşım</strong> 
              <p className="text-sm text-gray-600">Kullanıcıların işitme deneyimini kişiselleştirerek yaşam kalitesini artırmayı hedefler.</p>
            </li>
            <li className="p-4 bg-blue-50 rounded-xl shadow-md border-t-4 border-blue-500 hover:shadow-lg transition">
              <strong className="text-blue-700 block mb-1">Güven</strong> 
              <p className="text-sm text-gray-600">Kullanıcıların cihazın kalitesine,doğruluğuna ve sürekliliğine olan inancıyla işitme yolculuklarında huzur duymalarını sağlar.</p>
            </li>
            <li className="p-4 bg-blue-50 rounded-xl shadow-md border-t-4 border-blue-500 hover:shadow-lg transition">
              <strong className="text-blue-700 block mb-1">Kişiye Özel Çözümler</strong> 
              <p className="text-sm text-gray-600">Her bireyin işitme kayıp düzeyi,yaşam tarzı ve ihtiyaçlarına en uygun işitme deneyimini sunmayı amaçlar.</p>
            </li>
          </ul>
        </div>

      </section>

    </div> 
  );
}
