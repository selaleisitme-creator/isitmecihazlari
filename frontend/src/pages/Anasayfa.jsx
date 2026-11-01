import { useState, useEffect } from 'react';
import {
  Heart, Users, Award, Phone, MapPin, Clock,
  ChevronRight, ChevronLeft, Star, Volume2, TrendingUp, Menu, X
} from 'lucide-react';
import SEO from '../components/SEO';


export default function Anasayfa() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTestImage, setCurrentTestImage] = useState(0);
  const [currentHeaderImage, setCurrentHeaderImage] = useState(0);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const testImages = [
      '/images/hastaTest.jpeg', 
      '/images/HearingTest.jpeg', 
  ];
  const headerImages = [
    '/images/anasayfaBigPic.jpeg',
    '/images/waterfall.jpg'
  ];
  
  const carouselImages = [
    '/images/H1.png',
    '/images/H2.png',
    '/images/H3.png',
    '/images/H4.png',
    '/images/H5.jpeg',
  ];
  const slideInterval = 5000;

  
   // Header image rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeaderImage(prev => (prev + 1) % headerImages.length);
    }, slideInterval);
    return () => clearInterval(timer);
  }, []);
  
  // Test images rotation
  useEffect(() => {
      const timer = setInterval(() => {
          setCurrentTestImage(prevIndex => (prevIndex + 1) % testImages.length);
      }, slideInterval);
      return () => clearInterval(timer);
  }, [testImages.length]);

  // Carousel rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCarouselIndex(prev => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);


  //ManuelSlide
  const nextTestImage = () => {
      setCurrentTestImage(prevIndex => (prevIndex + 1) % testImages.length);
  };

  const prevTestImage = () => {
      setCurrentTestImage(prevIndex => (prevIndex - 1 + testImages.length) % testImages.length);
  };

  const navLinks = [
    { to: "/", label: "Anasayfa", active: true },
    { to: "/randevu", label: "Randevu Alın", active: false },
    { to: "/terapi-programi", label: "Rehabilitasyon Programı", active: false },
    { to: "/urun-katalogu", label: "Ürün Kataloğu", active: false },
    { to: "/odeme-planlari", label: "SGK", active: false },
    { to: "/audio-servis", label: "Telefon Uygulaması", active: false },
    { to: "/hakkimizda", label: "Hakkımızda", active: false },
    { to: "/online-test", label: "Ücretsiz İşitme Testi", active: false },
  ];

  const scrollToTest = () => {
    const section = document.getElementById("ucretsiz-test");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Şelale İşitme Cihazı Merkezi",
  "description": "İstanbul Sarıyer'de işitme cihazları, işitme testleri ve rehabilitasyon hizmetleri. SGK anlaşmalı, 30+ yıl deneyim.",
  "url": "https://selaleisitme.com",
  "telephone": "+905322752414",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Merkez Mahallesi",
    "addressLocality": "Sarıyer",
    "addressRegion": "İstanbul",
    "addressCountry": "TR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "41.1666",
    "longitude": "29.0520"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "$$",
  "image": "https://selaleisitme.com/images/selaleLogo.jpeg",
  "medicalSpecialty": "Audiology",
  "availableService": [
    {
      "@type": "MedicalProcedure",
      "name": "İşitme Testi"
    },
    {
      "@type": "MedicalTherapy",
      "name": "İşitme Rehabilitasyonu"
    }
  ]
};



  const diseases = [
    {
      name: "Tinnitus",
      icon: "",
      shortDesc: "Kulak Çınlaması",
      description: "Dışarıdan ses kaynağı olmaksızın kulakta çınlama, uğultu veya gürültü hissi.",
      symptoms: ["Sürekli çınlama veya vızıltı", "Konsantrasyonda sorun", "Uyku problemleri", "Anksiyete"]
    },
    {
      name: "Yaşlanmaya Bağlı İşitme Kaybı",
      icon: "",
      shortDesc: "Presbiakuzi",
      description: "Yaşla birlikte işitme yetisinin doğal olarak zayıflaması. En yaygın işitme problemidir.",
      symptoms: ["Yüksek sesli konuşmaları anlamakta zorluk", "Telefonda ses duyamama", "Sosyal izolasyon"]
    },
    {
      name: "Gürültüye Bağlı İşitme Kaybı",
      icon: "",
      shortDesc: "NIHL",
      description: "Yüksek seviyelerdeki gürültüye uzun süreli maruziyetten kaynaklanan kalıcı işitme kaybı.",
      symptoms: ["Belirli frekanslar duyamama", "Konuşmaları anlamakta zorluk", "Denge sorunları"]
    },
    {
      name: "Meniere Hastalığı", 
      icon: "", 
      shortDesc: "", 
      description: "İç kulaktaki sıvı dengesizliği sonucu baş dönmesi,çınlama ve dalgalı işitme kaybı görülür.", 
      symptoms: ["Baş dönmesi(Vertigo) atakları","Kulakta dolgunluk hissi ","İşitme kaybı"] 
    },
    {
      name: "Otoskleroz", 
      icon: "", 
      shortDesc: "", 
      description: "Orta kulakta kemiklerin hareketini kısıtlayan kemik sertleşmesi; genellikle ilerleyici işitme kaybına yol açar.", 
      symptoms: ["Kendi sesini yüksek duyma","Aile öyküsü","Gebelik ve hormonal değişiklikler"] 
    },
    {
      name: "Doğumsal (Konjenital) İşitme Kaybı", 
      icon: "", 
      shortDesc: "", 
      description: "Bebeklerde ve çocuklarda görülebilir.İşitme gelişimi için erken dönemde işitme cihazı şarttır.",
      symptoms: ["0-3 ay arası yüksek seslere tepki vermeme","6-12 ay ismi söylendiğinde tepki vermeme","1 yaş sonrasında konuşma gelişiminin gecikmesi"] 
    
    }
  ];
  

  return (
    <>
  <SEO 
    title="İşitme Cihazı Merkezi Sarıyer İstanbul | SGK Anlaşmalı | Şelale İşitme"
    description="İstanbul Sarıyer'de işitme cihazı, ücretsiz işitme testi, rehabilitasyon programı. SGK anlaşmalı, 30+ yıl deneyim. Siemens, Phonak, Oticon, Widex cihazları. ☎️ 0532 275 24 14"
    keywords="işitme cihazı, işitme cihazı fiyatları, işitme merkezi, işitme testi, işitme kaybı tedavisi, işitme cihazı Sarıyer, işitme cihazı İstanbul, SGK işitme cihazı, işitme cihazı SGK, kulak cihazı, kulak cihazı fiyatları, odyolog, odyoloji merkezi, işitme problemi, işitme kaybı, presbiakuzi, tinnitus tedavisi, kulak çınlaması, işitme cihazı markaları, Siemens işitme cihazı, Phonak işitme cihazı, Oticon işitme cihazı, Widex işitme cihazı, Starkey işitme cihazı, Resound işitme cihazı, işitme cihazı modelleri, dijital işitme cihazı, şarjlı işitme cihazı, bluetooth işitme cihazı, görünmez işitme cihazı, kulak içi işitme cihazı, kulak arkası işitme cihazı, çocuk işitme cihazı, bebek işitme cihazı, yaşlı işitme cihazı, işitme cihazı bakımı, işitme cihazı servisi, işitme cihazı teknik servis, işitme cihazı pili, işitme cihazı aksesuarları, ücretsiz işitme testi, odyogram, odyometri, işitme testi ücretsiz, online işitme testi, işitme ölçümü, işitme kontrolü, işitme taraması, işitme değerlendirmesi, konuşma odyometrisi, timpanometri, refleks testi, OAE testi, ABR testi, BERA testi, işitme rehabilitasyonu, konuşma terapisi, dil terapisi, işitme cihazı uyum süreci, işitme cihazı alıştırma, işitme eğitimi, odyolojik rehabilitasyon, SGK işitme cihazı, SGK anlaşmalı işitme merkezi, işitme cihazı SGK ödemesi, işitme cihazı devlet desteği, işitme cihazı sigorta, işitme cihazı raporu, işitme engelli raporu, özürlü raporu işitme, SGK işitme cihazı başvurusu, sosyal güvenlik işitme cihazı, emekli sandığı işitme cihazı, bağkur işitme cihazı, yeşil kart işitme cihazı, Sarıyer işitme merkezi, Sarıyer işitme cihazı, İstanbul işitme merkezi, İstanbul işitme cihazı, Maslak işitme cihazı, Levent işitme cihazı, Etiler işitme cihazı, Beşiktaş işitme cihazı, Şişli işitme cihazı, Mecidiyeköy işitme cihazı, Beyoğlu işitme cihazı, Kadıköy işitme cihazı, Avrupa yakası işitme cihazı, işitme sağlığı, kulak sağlığı, KBB işitme cihazı, odyoloji uzmanı, işitme uzmanı, işitme protezi, kulak protezi, işitme implantı, koklear implant, kemik ankrajlı işitme cihazı, BAHA, işitme amplifikatörü, kulak amplifikatörü, TV dinleme cihazı, telefon dinleme cihazı, FM sistem, Roger sistem, işitme cihazı aksesuarı, işitme cihazı kulaklığı, işitme cihazı şarj cihazı, işitme cihazı kurutucu, işitme cihazı temizlik seti, cerumen koruyucu, wax guard, dome, kulak kalıbı, kulak küpü, özel kalıp, işitme cihazı garantisi, işitme cihazı iadesi, işitme cihazı taksit, işitme cihazı kredi, işitme cihazı kampanya, işitme cihazı indirim, ikinci el işitme cihazı, işitme cihazı kiralama, işitme cihazı deneme, işitme cihazı karşılaştırma, en iyi işitme cihazı, işitme cihazı yorumları, işitme cihazı tavsiye, işitme cihazı önerisi, işitme cihazı seçimi, hangi işitme cihazı, işitme cihazı nasıl alınır, işitme cihazı fiyat listesi, işitme cihazı 2024, işitme cihazı 2025, hearing aid Turkey, hearing aid Istanbul, hearing center Istanbul, audiology Istanbul, hearing test Istanbul, hearing loss treatment, hearing aid prices Turkey, hearing device, ear device, hearing amplifier, digital hearing aid, rechargeable hearing aid, bluetooth hearing aid, invisible hearing aid, behind the ear hearing aid, in the ear hearing aid, hearing aid for elderly, hearing aid for children, hearing aid battery, hearing aid accessories, free hearing test Istanbul, audiogram, audiometry, speech therapy, hearing rehabilitation, tinnitus treatment, ear ringing treatment, Meniere's disease, presbycusis, noise induced hearing loss, congenital hearing loss, sensorineural hearing loss, conductive hearing loss, mixed hearing loss, sudden hearing loss, age related hearing loss, hearing aid fitting, hearing aid adjustment, hearing aid maintenance, hearing aid repair, hearing aid technical service, insurance hearing aid, state support hearing aid, hearing disability report, SGK hearing aid Turkey, social security hearing aid, isitme cihazi, isitme merkezi, isitme testi, isitme kaybi, kulak cihazi, odyoloji, odyolog, SGK isitme cihazi, Sariyer isitme merkezi, Istanbul isitme merkezi, ucretsiz isitme testi, isitme rehabilitasyonu, konusma terapisi, tinnitus, kulak cinlamasi, presbiakuzi, isitme sorunu, isitme problemi, kulak problemi, duyma sorunu, sesiitme problemi, işitme ciazı, işitme cihası, isitme cihazı fiyatlari, isitme cihazi fiyatlari, isitme cihazı fiyatı, kulak cihazı fiyatı, işitme cihaz fiyatları, isitme cihaz, kulak cihaz, işitme aleti, kulak aleti, isitme aparatı, kulak aparati"
    ogImage="/images/anasayfaBigPic.jpeg"
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

      {/* Logo in the Top Left Corner */}
      <div className="fixed top-4 right-6 z-40">
        <img
          src="/images/selaleLogo.jpeg"
          alt="Şelale Logo"
          className="w-20 h-auto rounded-lg shadow-md border border-gray-200"
        />
      </div>


      <div className="relative">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        
        {/*Section: HEADER  */}
        
        <header className="relative pt-20 pb-32 overflow-hidden">
          {/* Image Slideshow */}
          {headerImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                currentHeaderImage === index ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
          ))}

          

          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center space-y-8">
              <h1 className="text-6xl sm:text-7xl font-bold text-white leading-tight drop-shadow-2xl" style={{
                textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)'
              }}>
                Şelale İşitme Cihazı Merkezi
              </h1>

              <p className="text-xl sm:text-2xl text-white max-w-2xl mx-auto leading-relaxed font-semibold drop-shadow-lg" style={{
                textShadow: '1px 1px 4px rgba(0,0,0,0.8)'
              }}>
                Hayatınızı değiştiren teknoloji ile tanışın.
              </p>

             <p className="text-xl sm:text-2xl text-white max-w-2xl mx-auto leading-relaxed font-semibold drop-shadow-lg" style={{
                textShadow: '1px 1px 4px rgba(0,0,0,0.8)'
              }}>
              <strong>Daha iyi duymaya hazır mısınız?</strong> 
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <a href="/randevu" className="group bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-bold py-4 px-8 rounded-lg transition transform hover:scale-105 flex items-center justify-center gap-2 shadow-xl">
                  Randevu Al
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </a>
               
                <button
              onClick={scrollToTest}
              className="border-2 border-white bg-white bg-opacity-90 text-blue-900 hover:bg-opacity-100 font-bold py-4 px-8 rounded-lg transition shadow-xl">
                  Ücretsiz İşitme Testi
            </button>
              </div>
            </div>
          </div>
        </header>

        


        {/*Stats Section */}
        <section className="relative py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Users, label: "Memnun Hasta", value: "500+" },
                { icon: Award, label: "Başarı Oranı", value: "%99" },
                { icon: TrendingUp, label: "Yıl Deneyim", value: "30+" },
                { icon: Heart, label: "Sağlık Profesyoneli", value: "Şelale Alağaş" }
              ].map((stat, i) => (
                <div key={i} className="group relative">
                  <div className="absolute inset-0 bg-linear-to-r from-blue-900 to-purple-900 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                  <div className="relative bg-white p-8 rounded-lg backdrop-blur-sm">
                    <stat.icon className="w-8 h-8 text-blue-900 mb-3" />
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 bg-linear-to-br from-blue-50 to-purple-50"> {/* Sınıf düzeltildi */}
  <div className="max-w-6xl mx-auto px-4">
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <div>
        <h2 className="text-4xl font-bold text-blue-900 mb-6">Neden Şelale?</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Şelale İşitme Cihazları olarak Sarıyer'de, en kaliteli ürünleri ve profesyonel hizmet anlayışını bir araya getiriyoruz. Kurucumuz ve Yönetim Kurulu Başkanımız hipokrat yeminli Ody. Şelale Alağaş önderliğinde, her bireyin işitme ihtiyaçlarına en uygun çözümü sunmak için çalışıyoruz.
        </p>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Teknolojinin sunduğu en son yenilikleri takip ederek, yüksek performanslı işitme cihazlarını sizlerle buluşturuyoruz. Amacımız doğru bilgilendirme, güvenilir testler ve sürekli danışmanlık ile kulak sağlığınızı korumanıza yardımcı olmaktır.
        </p>

        <p className="text-lg font-semibold text-gray-900 mb-4">
          Her bireyin işitme durumu farklıdır. Şelale'de verdiğimiz hizmetler:
        </p>
        <div className="space-y-3">
          {[
            "İşitme testleri",
            "Konuşma ve dil terapisi",
            "KOBİ ve sağlık danışmanlığı",
            "Teknik servis ve bakım hizmetleri",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-2 h-2 bg-linear-to-r from-blue-900 to-purple-900 rounded-full"></div> {/* Sınıf düzeltildi */}
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>

        <p className="text-lg text-gray-700 mt-6 pt-6 border-t border-gray-300 italic">
          Unutmayın, erken teşhis işitme sağlığında da fark yaratır.
        </p>
      </div>

      {/* image */}
      <div className="relative h-96 rounded-2xl shadow-2xl overflow-hidden">
        <img
          src="/images/NedenSelale.jpeg"
          alt="Neden Şelale"
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
        />
      </div>
    </div>
  </div>
</section>

        {/*diseases section */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-blue-900 mb-4">İşitme Problemleri</h2>
              <p className="text-gray-600 text-lg">Tanı, belirtiler ve çözümler hakkında bilgi edinin</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {diseases.map((disease, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-blue-900 to-purple-900 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div> {/* Sınıf düzeltildi */}
                  <div className="relative bg-white p-8 rounded-2xl border border-gray-100 group-hover:border-blue-200 transition overflow-hidden">
                    <div className="text-5xl mb-4">{disease.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{disease.name}</h3>
                    <p className="text-sm text-blue-900 font-semibold mb-3">{disease.shortDesc}</p>
                    <p className="text-gray-600 mb-6">{disease.description}</p>

                    <div className={`space-y-2 overflow-hidden transition-all duration-300 ${hoveredCard === idx ? 'max-h-48' : 'max-h-0'}`}>
                      <p className="font-semibold text-gray-900 text-sm">Belirtiler:</p>
                      {disease.symptoms.map((symptom, i) => (
                        <p key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-blue-900">✓</span>
                          <span>{symptom}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

{/* Image Carousel Section */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
          <div className="w-full">
            <div className="relative h-[500px] flex items-center justify-center">
              {carouselImages.map((image, index) => {
                const offset = (index - currentCarouselIndex + carouselImages.length) % carouselImages.length;
                const isCurrent = offset === 0;
                
                let translateX = 0;
                let scale = 0.7;
                let opacity = 0.4;
                let zIndex = 0;
                
                if (isCurrent) {
                  translateX = 0;
                  scale = 1;
                  opacity = 1;
                  zIndex = 30;
                } else if (offset === 1) {
                  translateX = 450;
                  scale = 0.85;
                  opacity = 0.6;
                  zIndex = 20;
                } else if (offset === carouselImages.length - 1) {
                  translateX = -450;
                  scale = 0.85;
                  opacity = 0.6;
                  zIndex = 20;
                } else if (offset === 2) {
                  translateX = 800;
                  scale = 0.7;
                  opacity = 0.3;
                  zIndex = 10;
                } else if (offset === carouselImages.length - 2) {
                  translateX = -800;
                  scale = 0.7;
                  opacity = 0.3;
                  zIndex = 10;
                } else {
                  opacity = 0;
                }
                
                return (
                  <div
                    key={index}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3 transition-all duration-700 ease-in-out"
                    style={{
                      transform: `translate(calc(-50% + ${translateX}px), -50%) scale(${scale})`,
                      opacity: opacity,
                      zIndex: zIndex
                    }}
                  >
                    <div className={`rounded-2xl overflow-hidden shadow-2xl ${isCurrent ? 'ring-4 ring-blue-500' : ''}`}>
                      <img
                        src={image}
                        alt={`Carousel ${index + 1}`}
                        className="w-[400px] h-[400px] object-cover"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Carousel indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCarouselIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentCarouselIndex === index 
                      ? 'bg-blue-900 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Görsel ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>



        {/* Importance of Hearing Devices Section */}
<section className="py-24 bg-linear-to-br from-blue-50 to-purple-50"> {/* Sınıf düzeltildi */}
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold text-blue-900 mb-6">
      İşitme Cihazı Kullanmak Neden Önemlidir?
    </h2>
    <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-16">
      İşitme kaybı sadece sesleri duymakla ilgili değildir. Sosyal yaşam, zihinsel sağlık ve genel yaşam kalitesi üzerinde derin etkiler bırakabilir. 
      İşitme cihazları, beynin sesleri yeniden işlemesine yardımcı olur ve iletişimi, özgüveni ve bağımsızlığı geri kazandırır.İşitme cihazını almayı tercih ettiğiniz yer markadan ve modelden daha önemlidir. Çünkü uzun yıllar rehabilitasyonunuzu sağlayacak işitme sağlığı uzmanınızdır.
    </p>

    <div className="grid md:grid-cols-3 gap-10">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition">
        <div className="text-5xl mb-4 text-blue-800"></div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Beyin Sağlığı</h3>
        <p className="text-gray-600">
          İşitme kaybı tedavi edilmediğinde, beyin sesleri tanıma yetisini yavaşça kaybeder. 
          Bu da zamanla bilişsel gerileme ve unutkanlık riskini artırabilir.
        </p>
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition">
        <div className="text-5xl mb-4 text-blue-800"></div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Sosyal Yaşam</h3>
        <p className="text-gray-600">
          İşitme güçlüğü yaşayan bireyler genellikle sosyal ortamlardan uzaklaşır. 
          İşitme cihazları, iletişimi kolaylaştırarak sosyal izolasyonu ve depresyon riskini azaltır.
        </p>
        
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition">
        <div className="text-5xl mb-4 text-blue-800"></div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Yaşam Kalitesi</h3>
        <p className="text-gray-600">
          İşitme cihazlarıyla birlikte çevrenizle yeniden güçlü bir bağ kurabilir, güvenliğinizi artırabilir 
          ve günlük aktivitelerinizde daha aktif ve mutlu olabilirsiniz.
        </p>
      </div>
    </div>

    <div className="mt-16">
      <p className="text-gray-700 text-lg max-w-3xl mx-auto">
        <strong>İşitme kaybınızı ihmal etmeyin. </strong> 
        Erken tanı ve doğru işitme cihazı seçimi, hem zihinsel hem duygusal sağlığınızı korumanın en etkili yoludur.
      </p>
    </div>
  </div>
</section>


         {/* Test Section - CAROUSEL IMPLEMENTED */}
<section id="ucretsiz-test" className="py-24 bg-gray-100">
  <div className="max-w-6xl mx-auto px-6">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Image Carousel */}
      <div className="order-2 md:order-1 relative h-[500px] rounded-lg shadow-xl overflow-hidden"> {/* h-96 -> h-[500px] olarak değiştirildi */}
        {/* Görsel Slaytları */}
        {testImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`İşitme Testi Görseli ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              currentTestImage === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Manuel Navigasyon Butonları */}
        <button
          onClick={prevTestImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black/40 text-white hover:bg-black/60 rounded-full transition"
          aria-label="Önceki Görsel"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextTestImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black/40 text-white hover:bg-black/60 rounded-full transition"
          aria-label="Sonraki Görsel"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        
        {/* Nokta İndikatörleri */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {testImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestImage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentTestImage === index ? 'bg-white scale-110' : 'bg-gray-400 opacity-60'
              }`}
              aria-label={`Görsel ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>

      {/* Text Content */}
      <div className="order-1 md:order-2 text-center md:text-left">
        <h2 className="text-4xl font-bold text-blue-900 mb-6">
          İşitme Testi
        </h2>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          İşitme testi, mevcut işitme seviyenizi ve kulak sağlığınızı değerlendirmek için yapılan temel bir ölçümdür. Bu test sayesinde hangi frekanslarda ve ses düzeylerinde zorlandığınız belirlenir. Sonuçlara göre uzmanlarımız size özel bir değerlendirme sunar ve gerekirse uygun işitme cihazı veya terapi planı önerilir. Böylece hem işitme kaybınızın türü netleşir hem de en verimli çözüm yolu belirlenir.
        </p>

        <a
          href="/randevu"
          className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 px-10 rounded-lg transition transform hover:scale-105 inline-flex items-center gap-2 text-lg shadow-md"
        >
          Test İçin Randevu Al
          <ChevronRight className="w-6 h-6" />
        </a>
        <a
          href="/online-test"
          className="bg-white hover:bg-blue-200 text-blue-900 font-bold py-4 px-10 rounded-lg transition transform hover:scale-105 inline-flex items-center gap-2 text-lg shadow-md"
        >
          Ücretsiz Testi Başla
          <ChevronRight className="w-6 h-6" />
        </a>
      </div>
    </div>
  </div>
</section>

        
        


        {/*Contact */}
        <section className="py-24 bg-linear-to-br from-blue-900 via-blue-800 to-purple-900 text-white relative overflow-hidden"> {/* Sınıf düzeltildi */}
  {/* Decorative blur background */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-screen filter blur-3xl"></div>
  </div>

  <div className="max-w-6xl mx-auto px-4 relative z-10">
    <h2 className="text-4xl font-bold mb-16 text-center">Bize Ulaşın</h2>

    <div className="grid md:grid-cols-2 gap-8">
      {/* Left card: Phone & Hours */}
      <div className="bg-white text-blue-900 rounded-2xl p-10 shadow-xl flex flex-col justify-center">
        <h3 className="text-2xl font-bold mb-6">İletişim Bilgileri</h3>

        <div className="mb-4">
          <p className="text-lg font-semibold">📞 Telefon</p>
          <p className="text-xl font-bold mt-1">0532 275 24 14</p>
        </div>

        <div>
          <p className="text-lg font-semibold">🕓 Çalışma Saatleri</p>
          <p className="mt-1 whitespace-pre-line">
            Pazartesi - Cumartesi{"\n"}09:00 - 18:00
          </p>
        </div>
      </div>

      {/* Right card: Map */}
      <a
        href="https://maps.app.goo.gl/BXqB7sb4okM2u4hD9"
        target="_blank"
        rel="noopener noreferrer"
        className="relative block rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition duration-300"
      >
        <img
          src="/images/Location.jpeg"
          alt="Şelale İşitme Merkezi Konumu"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition">
          <span className="text-white text-xl font-bold">
            📍 Google Haritalarda Gör
          </span>
        </div>
      </a>
    </div>
  </div>
</section>



        {/* buttom ection */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-5xl font-bold text-blue-900 mb-6">Hayatınızı Değiştirin</h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Bugün işitme testi yaptırın. Uzmanlarımız size özel bir plan hazırlayacak.
            </p>
            <a
            href="/randevu"
            className="group bg-linear-to-r from-blue-900 to-purple-900 hover:from-blue-800 hover:to-purple-800 text-white font-bold py-4 px-12 rounded-lg transition transform hover:scale-105 inline-flex items-center gap-2 text-lg shadow-lg" 
          >
            Hemen Randevu Al
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition" />
          </a>
          </div>
        </section>
      </div>
      {/* Floating WhatsApp Button */}
<a
  href="https://api.whatsapp.com/send?phone=905322752414&text=Merhaba%2C+i%C5%9Fitme+testi+i%C3%A7in+bilgi+almak+istiyorum.&fbclid=PAZXh0bgNhZW0CMTEAAacw3jq-QtUMKAFamWEi-oSW_a88B8PvaN8rDKqagAujlE47MbeRRyz81O_0gw_aem_6Z0PLqUVhtJdQCt6WMCQNg"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition transform hover:scale-110"
  aria-label="WhatsApp ile iletişime geç"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="currentColor"
    className="w-8 h-8"
  >
    <path d="M16.003 3.002c-7.18 0-13 5.82-13 13 0 2.288.602 4.528 1.747 6.487L3 29l6.67-1.726A12.923 12.923 0 0 0 16 29c7.18 0 13-5.82 13-13s-5.82-13-12.997-13zm0 23.733c-2.1 0-4.154-.547-5.967-1.585l-.427-.247-3.96 1.025 1.058-3.862-.277-.437A10.969 10.969 0 0 1 5.034 16c0-6.05 4.919-10.969 10.969-10.969 6.05 0 10.969 4.919 10.969 10.969s-4.919 10.735-10.969 10.735zm5.97-8.07c-.327-.164-1.946-.962-2.248-1.07-.302-.109-.522-.164-.743.164-.218.327-.854 1.07-1.047 1.292-.191.218-.382.246-.708.082-.327-.164-1.381-.51-2.63-1.625-.972-.867-1.625-1.94-1.818-2.268-.191-.327-.021-.505.144-.668.149-.148.327-.382.491-.573.164-.191.218-.327.327-.546.109-.218.055-.41-.027-.573-.082-.164-.743-1.795-1.018-2.459-.267-.64-.537-.55-.743-.561l-.637-.011c-.218 0-.573.082-.873.382-.3.3-1.145 1.118-1.145 2.724 0 1.606 1.172 3.157 1.337 3.374.164.218 2.309 3.525 5.593 4.946.782.337 1.392.538 1.868.687.785.25 1.498.214 2.063.13.63-.094 1.946-.795 2.22-1.562.273-.764.273-1.42.191-1.562-.082-.137-.3-.218-.627-.382z" />
  </svg>
</a>

    </div>
    </>
  );
}
