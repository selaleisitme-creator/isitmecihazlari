import { useState } from "react";
import {
  Heart, ChevronRight, Volume2, Search, X, Menu, Phone, MapPin
} from "lucide-react";
import { Link } from "react-router-dom";
// SEO Bileşenini içe aktarıyoruz
import SEO from '../components/SEO';

export default function UrunKatalogu() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Structured Data (Google'ın sayfayı ürün kataloğu olarak anlaması için)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "İşitme Cihazı Modelleri ve Fiyatları",
    "description": "Sarıyer Şelale İşitme Merkezi'nde en yeni teknoloji RIC, BTE, CIC ve görünmez işitme cihazları. Bluetooth'lu ve şarj edilebilir modeller.",
    "provider": {
      "@type": "MedicalBusiness",
      "name": "Şelale İşitme Merkezi",
      "telephone": "0532 275 24 14",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Sarıyer",
        "addressRegion": "İstanbul"
      }
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Kulak Arkası (BTE) İşitme Cihazları" },
        { "@type": "ListItem", "position": 2, "name": "Kanal İçi (CIC/IIC) Görünmez Cihazlar" },
        { "@type": "ListItem", "position": 3, "name": "Alıcı Kulakta (RIC) Cihazlar" },
        { "@type": "ListItem", "position": 4, "name": "Şarj Edilebilir İşitme Cihazları" }
      ]
    }
  };

  const products = [
    {
      id: 1,
      name: "Müzik ve Konuşma Odaklı Estetik Pro",
      category: "cic",
      priceTag: "Premium",
      description: "48 Kanal, 6 program, Otomatik Yönsel Mikrofon, Gürültü Kesme, Frekans Sıkıştırma, Acclimatic, Binaural Senkronizasyon, Genişletilmiş Dinamik Aralık, IP 68, Rüzgar Gürültüsü Kesme, Tinnitus Terapisi, Music Select, 2earPhone, AudioLink, Notch Terapi, Güçlendirilmiş Ani Ses Baskılayıcı, Selectronic, Binaural Ses Lokalizasyonu, Oto Optimizasyon, HiFi, Oto EchoClear, AudioFocus 360",
      features: ["Bluetooth", "Tinnitus Terapisi", "Notch terapi","Şarj Edilebilir"],
      image: "/images/products/IF_CIC_LI_8_16.jpg",
    },
    {
      id: 2,
      name: "Gürültü Baskılayan Gizli Konfor Modeli",
      category: "cic",
      priceTag: "Orta",
      description: "32 Kanal, 6 program, Gürültü Kesme, Selectronic, Music Select.",
      features: ["Şarj edilebilir", "Bluetooth", "Tinnitus Terapisi"],
      image: "/images/products/IF_CIC_LI_8_16.jpg",
    },
    {
      id: 3,
      name: "Kanal İçi Dijital Net Duyum Serisi",
      category: "cic",
      priceTag: "Giriş",
      description: "16 Kanal, 4 program, Gürültü Kesme, Binaural Senkronizasyon, AudioLink, IP68.",
      features: ["Şarj edilebilir", "Bluetooth", "Gürültü Kesme"],
      image: "/images/products/IF_CIC_LI_8_16.jpg",
    },
    {
      id: 4,
      name: "Hareket Sensörlü 360° Pro Akış Modeli",
      category: "ric",
      priceTag: "Premium",
      description: "48 Kanal, 6 program, Otomatik Yönsel Mikrofon, Gürültü Kesme, Frekans Sıkıştırma, Acclimatic, Binaural Senkronizasyon, Genişletilmiş Dinamik Aralık, IP 68, Cep Telefonunda Ses Aktarımı (iPhone ve Android), Rüzgar Gürültüsü Kesme, Tinnitus Terapi, Tinnitus Notch Terapi, Oculmatic 2.0, Spatial Spot, Hareket Sensörü, Güçlendirilmiş Ani Ses Baskılayıcı, Selectronic, Oto Optimizasyon, Headset mod (iOS & LE Audio), HiFi, Oto EchoClear, AudioFocus 360, Spatial Spot, Bluetooth LE Audio Multi-Track Processing 2.0 (Hedef Ses 5)",
      features: ["Şarj edilebilir", "Bluetooth", "Gürültü Kesme"],
      image: "/images/products/SR_Li_8.png",
    },
    {
      id: 5,
      name: "Otomatik Ortam Tanıyan Akıllı RIC Serisi",
      category: "ric",
      priceTag: "Orta",
      description: "32 Kanal, 6 program, Otomatik Yönsel Mikrofon, Gürültü Kesme, Frekans Sıkıştırma, Acclimatic, Binaural Senkronizasyon, Genişletilmiş Dinamik Aralık, IP 68, Cep Telefonunda Ses Aktarımı (iPhone ve Android), Rüzgar Gürültüsü Kesme, Tinnitus Terapi, Notch Terapi, Entegre Hareket Sensörü, Güçlendirilmiş Ani Ses Baskılayıcı, SpeechAudio, Selectronic, Oto Optimizasyon, Tinnitus Notch Terapi, Oculmatic 2.0, Headset mod (iOS & LE Audio), Bluetooth LE Audio, Multi-Track Processing 2.0 (Hedef Ses 2)",
      features: ["Şarj edilebilir", "Bluetooth", "Gürültü Kesme"],
      image: "/images/products/SR_Li_8.png",
    },
    {
      id: 6,
      name: "Gürültü Önleyici Dijital Modeli",
      category: "ric",
      priceTag: "Giriş",
      description: "16 Kanal, 4 program, Otomatik Yönsel Mikrofon, Gürültü Kesme, Frekans Sıkıştırma, Acclimatic, Binaural Senkronizasyon, Genişletilmiş Dinamik Aralık, IP 68, Cep Telefonunda Ses Aktarımı (iPhone ve Android), Rüzgar Gürültüsü Kesme, 2earPhone, AudioLink, Güçlendirilmiş Ani Ses Baskılayıcı, Speech360, Selectronic, Bluetooth LE Audio, Multi-Track Processing 2.0 (Hedef Ses 2), Oto Optimizasyon",
      features: ["Şarj edilebilir", "Bluetooth", "Gürültü Kesme"],
      image: "/images/products/SR_Li_8.png",
    },
    {
      id: 7,
      name: "64 Kanal Ultra HD Şarj Edilebilir Pro",
      category: "ric",
      priceTag: "Premium",
      description: "64 Kanal, Multi-Track Processing 2.0 (Hedef Ses 2), Speech360, 2earPhone, AudioLink, Güçlendirilmiş Ani Ses Baskılayıcı, Bluetooth LE Audio, Binaural Senkronizasyon, Rüzgar Gürültüsü Kesme, Oto Optimizasyon, Selectronic, Acclimatic, Genişletilmiş Dinamik Aralık, IP 68, Cep Telefonunda Ses Aktarımı (iPhone ve Android)",
      features: ["Şarj edilebilir", "Bluetooth", "Gürültü Kesme"],
      image: "/images/products/RLi8.png",
    },
    {
      id: 8,
      name: "Gün Boyu Aktif Şarjlı Konfor Serisi",
      category: "ric",
      priceTag: "Orta",
      description: "32 Kanal, Selectronic, Acclimatic, Otomatik Yönsel Mikrofon, Rüzgar Gürültüsü Kesme, Genişletilmiş Dinamik Aralık, Binaural Senkronizasyon, Frekans Sıkıştırma, IP 68, Cep Telefonunda Ses Aktarımı (iPhone ve Android), Gürültü Kesme",
      features: ["Şarj edilebilir", "Bluetooth", "Gürültü Kesme"],
      image: "/images/products/RLi8.png",
    },
    {
      id: 9,
      name: "Pratik Kullanımlı Şarj Edilebilir Model",
      category: "ric",
      priceTag: "Giriş",
      description: "16 Kanal, 4 program, Otomatik Yönsel Mikrofon, Gürültü Kesme, Frekans Sıkıştırma, IP 68, Manuel Ses Kontrolü, Standart Dinamik Aralık",
      features: ["Şarj edilebilir", "Bluetooth", "Gürültü Kesme"],
      image: "/images/products/RLi8.png",
    },
    {
      id: 10,
      name: "IP68 Korumalı Dayanıklı Seri", 
      category: "bte",
      priceTag: "Giriş",
      description: "16 Kanal, 4 Program, Temel Gürültü Baskılama, Feedback (Ötme) İptali, Konuşma Ayrıştırma, Manuel Ses Kontrolü, IP68 Nem ve Toz Koruması, Standart Yönsel Mikrofon, Veri Kaydı.",
      features: ["Gürültü Önleme", "IP68 Koruma", "Feedback İptali"],
      image: "/images/products/btecihaz4.jpeg", 
    },
    {
      id: 11,
      name: "Tinnitus (Çınlama) Terapili Güçlü BTE",
      category: "bte",
      priceTag: "Orta",
      description: "32 Kanal, 6 Program, Bluetooth Bağlantısı (iOS & Android), Otomatik Ortam Tanıma, Rüzgar Gürültüsü Kesme, Tinnitus Terapisi, Çift Mikrofonlu Yönsel Odaklanma, Frekans Sıkıştırma.",
      features: ["Bluetooth", "Tinnitus Terapisi", "Akıllı Telefon Kontrolü"],
      image: "/images/products/btecihaz5.jpeg",
    },
    {
      id: 12,
      name: "Yapay Zeka Destekli 360° Uzamsal Seri",
      category: "bte",
      priceTag: "Premium",
      description: "48 Kanal, 12 Program, Binaural Senkronizasyon, 360° Uzamsal Ses Algısı, Yapay Zeka Destekli Gürültü Temizleme, HiFi Müzik Modu, Yankı Giderici, Ani Yüksek Ses Baskılama, Şarj Edilebilir.",
      features: ["Yapay Zeka", "360° Ses", "Şarj Edilebilir"],
      image: "/images/products/btecihaz6.jpeg",
    },

    {
      id: 15,
      name: "Premium Cros Serisi",
      category: "cros",
      priceTag: "Premium",
      description: "Yapay Zeka (AI) destekli işlemcisi ile saniyede milyonlarca kez ortamı tarar ve sesi optimize eder. 48 Kanal, 360° Uzamsal Ses Algısı sayesinde sesin yönünü kusursuz tayin eder. Gürültülü restoranlarda bile fısıltıyı duyuran 'Speech Focus' teknolojisi, HiFi Müzik Modu, Yankı Giderici ve Bluetooth ile telefondan direkt ses aktarımı (iOS & Android). Pil derdi olmayan Şarj Edilebilir Li-ion batarya ve IP68 dayanıklılık sertifikası.",
      features: ["Yapay Zeka", "360° Ses", "Şarj Edilebilir"],
      image: "/images/products/CROS1.jpeg",
    },
    
    {
      id: 16,
      name: "360° Çevresel Algılamalı Pro Akış Modeli",
      category: "ite",
      priceTag: "Premium",
      description: "32 Kanal, 6 Program, Hazır Silikon Başlık (Click Sleeve), Kalıp Alma Gerektirmez (Instant Fit), Bluetooth Uygulama Kontrolü, Gürültü Baskılama, Rüzgar Kalkanı, Tinnitus (Çınlama) Maskeleme, Anında Teslim, Doğal Ses Algısı, Konforlu Yumuşak Uç, IP 68 Dayanıklılık.",
      features: ["Premium Konfor Serisi", "Hava Alan Yapı","İş hayatı/Aktif Yaşam"],
      image: "/images/products/ITE1.jpeg",
    },
    {
      id: 17,
      name: "Doğal Ses Odaklı Konfor Serisi",
      category: "ite",
      priceTag: "Orta",
      description: "32 Kanal, 6 Program, Hazır Silikon Başlık (Click Sleeve), Kalıp Alma Gerektirmez (Instant Fit), Bluetooth Uygulama Kontrolü, Gürültü Baskılama, Rüzgar Kalkanı, Tinnitus (Çınlama) Maskeleme, Anında Teslim, Doğal Ses Algısı, Konforlu Yumuşak Uç, IP 68 Dayanıklılık.",
      features: ["Kullanımı Kolay Serisi", "Standart Konfor","Kolay Sağ-Sol Ayrımı"],
      image: "/images/products/ITE2.jpeg",
    },
    {
      id: 18,
      name: "Anında Uyumlu (Instant-Fit) Pratik Model",
      category: "ite",
      priceTag: "Giriş",
      description: "32 Kanal, 6 Program, Hazır Silikon Başlık (Click Sleeve), Kalıp Alma Gerektirmez (Instant Fit), Bluetooth Uygulama Kontrolü, Gürültü Baskılama, Rüzgar Kalkanı, Tinnitus (Çınlama) Maskeleme, Anında Teslim, Doğal Ses Algısı, Konforlu Yumuşak Uç, IP 68 Dayanıklılık.",
      features: ["Ekonomik Seri","İleri derece Kayıp(Ses Kaçırmaz)"],
      image: "/images/products/ITE3.jpeg",
    },
    {
      id: 19,
      name: "Gölge Etkili Dip Kanal Modeli",
      category: "itc",
      priceTag: "Görünmez Seri",
      description: "Özel Shadow (Gölge) kasa teknolojisi sayesinde kulak kanalının karanlığında tamamen kaybolur. Dışarıdan bakıldığında fark edilmez. 24 Kanal, Ortam Analizi, Fısıltı Modu ve Gelişmiş Gürültü Baskılama özellikleri ile estetik ve performansı birleştirir.",
      features: ["Tam Gizlilik", "Nano Kaplama", "Gölge Kasa"],
      image: "/images/products/ITC4.jpeg",
    },
    {
      id: 20,
      name: "Konfor Serisi Kanal İçi Modeli",
      category: "itc",
      priceTag: "Kişiye Özel",
      description: "Kendi kulak yapınıza birebir uygun, 3D lazer teknolojisi ile üretilmiş ergonomik tasarım. Cilde dost, antialerjik UV akrilik gövde. 16 Kanal, 4 Program, Tinnitus (Çınlama) Terapisi ve Otomatik Odaklanma özellikleri ile gün boyu konforlu kullanım sağlar.",
      features: ["3D lazer üretim", "Antialerjik", "Konfor odaklı"],
      image: "/images/products/ITC5.jpeg",
    },
    {
      id: 21,
      name: "Yüksek Performanslı Power Modeli",
      category: "itc",
      priceTag: "Yüksek Güç",
      description: "İleri derece işitme kayıpları için güçlendirilmiş hoparlör (receiver) yapısı. Ötme (Feedback) yapmadan yüksek ses çıkışı sağlar. 32 Kanal, Bluetooth Uygulama Kontrolü, Rüzgar Kalkanı, Çift Mikrofonlu Yön Algılama ve Kristal Netliğinde Ses teknolojisi.",
      features: ["İleri Kayıp", "Net Duyum", "Power Receiver"],
      image: "/images/products/ITC3.jpeg",
    },
    {
      id: 22,
      name: "Dip Kanal CIC Modeli",
      category: "cic",
      priceTag: "",
      description: "24 Kanal, %100 Görünmez Tasarım (IIC/CIC), Doğal Kulak Kepçesi Efekti (Pinna Effect), 10 Numara Pil, Dip Kanal Yerleşimi, Gelişmiş Feedback (Ötme) Kalkanı, Tek Mikrofonlu Omni-Directional Duyum, Kişiye Özel 3D Üretim, Sound Smoothing (Ani Ses Baskılama), Tinnitus Maskeleme, Nano Kaplama, Vent (Havalandırma) Teknolojisi, Kulak İçi Konfor Yazılımı",
      features: ["Tinnitus Terapisi", "Gürültü Kesme"],
      image: "/images/products/CıcMicro.png",
    },
    {
      id: 23,
      name: "Yüksek Performanslı Kulak İçi CIC Modeli",
      category: "cic",
      priceTag: "",
      description: "24 Kanal, %100 Görünmez Tasarım (IIC/CIC), Doğal Kulak Kepçesi Efekti (Pinna Effect), 10 Numara Pil, Dip Kanal Yerleşimi, Gelişmiş Feedback (Ötme) Kalkanı, Tek Mikrofonlu Omni-Directional Duyum, Kişiye Özel 3D Üretim, Sound Smoothing (Ani Ses Baskılama), Tinnitus Maskeleme, Nano Kaplama, Vent (Havalandırma) Teknolojisi, Kulak İçi Konfor Yazılımı",
      features: ["Tinnitus Terapisi", "Gürültü Kesme"],
      image: "/images/products/CicDouble.png",
    },
    {
      id: 24,
      name: "Bluetoothlu CIC Modeli",
      category: "cic",
      priceTag: "",
      description: "48 Kanal, Çift Yönsel Mikrofon (Dual Mic), Bluetooth Ses Aktarımı (iOS ve Android), OVP (Kendi Sesini Doğal Duyma Teknolojisi), Gürültü İçinde Konuşma Odaklanma, Binaural Senkronizasyon, IP 68 Su ve Toz Koruması, 312 veya 13 Numara Pil, Kişiye Özel 3D Lazer Baskı, Rüzgar Gürültüsü Kesme, Tinnitus (Çınlama) Terapisi, Genişletilmiş Dinamik Aralık, Acclimatic, Otomatik Ortam Analizi, Telecoil (Opsiyonel)",
      features: ["Dip Kanal CIC Modeli","Tinnitus Terapisi", "Gürültü Kesme"],
      image: "/images/products/CıcXp.png",
    },
    
  ];

  const categories = [
    { id: "all", name: "Tümü" },
    { id: "ric", name: "RIC (Kanal İçi Hoparlörlü Kulak Arkası)" },
    { id: "bte", name: "BTE (Kulak Arkası)" },
    { id: "cic", name: "CIC (Tamamen Kanal İçi)" },
    { id: "ite", name: "ITE (Hazır Kulak İçi)" },
    { id: "itc", name: "ITC (Kanal İçi)" },
    { id: "cros", name: "CROS/BICROS" },
    { id: "acc", name: "Aksesuarlar" },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <>
    {/* SEO Meta Tags */}
    <SEO 
      title="İşitme Cihazı Fiyatları ve Modelleri 2024 | Şelale İşitme Sarıyer"
      description="En yeni teknoloji işitme cihazı fiyatları ve modelleri. Görünmez kanal içi, kulak arkası ve şarj edilebilir cihazlar. Sarıyer işitme merkezi kataloğu."
      keywords="işitme cihazı, isitme cihazi, işitme cihazı fiyatları, isitme cihazi fiyatlari, kulaklık fiyatları, görünmez işitme cihazı, gorunmez isitme cihazi, kanal içi işitme cihazı, kulak arkası işitme cihazı, sarıyer işitme, istanbul işitme cihazı, phonak, signia, widex, kulak cihazi, duyma cihazi, isitme testi, bluetooth işitme cihazı, şarj edilebilir işitme cihazı"
      ogImage="/images/products/SR_Li_8.png"
      structuredData={structuredData}
    />

    <div className="min-h-screen bg-white relative">
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
          <Link to="/terapi-programi" onClick={() => setSidebarOpen(false)} className="block text-gray-800 font-medium hover:text-blue-900">
            Rehabilitasyon Programı
          </Link>
          <Link to="/urun-katalogu" onClick={() => setSidebarOpen(false)} className="block text-blue-900 font-semibold">
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

      {/* Header */}
      <header className="relative pt-30 pb-20 text-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

        <h1 className="text-5xl font-bold text-blue-900">
          Ürün Kataloğu
        </h1>
        <p className="text-blue-900 text-lg mt-4">
          En yeni işitme cihazlarını keşfedin
        </p>
      </header>

      {/* Educational Section */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="bg-linear-to.br from-blue-50 to-blue-100 rounded-2xl shadow-lg p-8 mb-8 border border-blue-200">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
            İşitme Cihazı Türlerini Tanıyalım
          </h2>
          <p className="text-blue-900 text-center mb-8 text-lg">
            Hangi cihaz sizin için uygun? İşte basit bir rehber:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">RIC</span>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-3">RIC - Alıcı Kulakta</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Küçük ve göze çarpmaz. Hoparlör kulak kanalında, cihaz kulak arkasında. Doğal ses kalitesi sağlar. Hafif ve orta kayıplar için ideal.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">BTE</span>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-3">BTE - Kulak Arkası</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                En güçlü cihaz tipi. Kulak arkasına oturur, tüp ile kulağa ses iletir. Hafiften çok ağıra kadar tüm kayıp seviyeleri için uygundur. Kullanımı kolaydır.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">ITE</span>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-3">ITE - Kulak İçi</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Kulak kepçesini tamamen doldurur. Gözle görülebilir ancak kullanımı kolaydır. Hafif-orta ve orta-ağır kayıplar için uygundur. Pil değiştirmek daha kolaydır.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">ITC</span>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-3">ITC - Kanal İçi</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Kulak kanalına kısmen oturur. ITE'den daha küçük ve göze daha az çarpar. Hafif-orta kayıplar için uygundur. İyi beceri gerektirir.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">CIC</span>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-3">CIC - Tamamen Kanal İçi</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Neredeyse görünmez! Kulak kanalının derininde oturur. Hafif-orta kayıplar için. Küçük boyut nedeniyle pil ömrü kısadır. İyi el becerisi gerekir.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-sm">AÇIK</span>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Açık Kulak (Open-Fit)</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Kulak kanalını tıkamaz, doğal havalandırma sağlar. Kendi sesinizin garip gelmesini önler. Yüksek frekanslarda kayıp olanlar için mükemmel. Çok rahat.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-sm">CROS</span>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-3">CROS/BiCROS</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Tek taraflı işitme kaybı için özel. Kötü kulaktaki sesi iyi kulağa iletir. BiCROS her iki kulakta da kayıp varsa kullanılır. Etrafınızı daha iyi duyarsınız.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition border-2 border-blue-300">
              <div className="w-12 h-12 bg-linear-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">💡</span>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Hangi Seviye?</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong className="text-blue-900">Giriş:</strong> Temel özellikler, ekonomik</p>
                <p><strong className="text-blue-900">Orta:</strong> Daha fazla özellik, Bluetooth</p>
                <p><strong className="text-blue-900">Premium:</strong> En gelişmiş teknoloji, yapay zeka</p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Terms Guide */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-200 mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
            Teknik Terimler Rehberi 
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border-l-4 border-blue-900 pl-4">
              <h4 className="font-semibold text-blue-900 mb-2">Kanal Sayısı</h4>
              <p className="text-sm text-gray-700">Sesin farklı frekanslarını ayrı ayrı ayarlamayı sağlar. Daha fazla kanal daha hassas ayar demektir. 16+ kanal çoğu kişi için yeterli.</p>
            </div>

            <div className="border-l-4 border-blue-900 pl-4">
              <h4 className="font-semibold text-blue-900 mb-2">Program Sayısı</h4>
              <p className="text-sm text-gray-700">Farklı ortamlar için ayarlar. Örnek: sessiz oda, gürültülü restoran, müzik dinleme. 4-6 program çoğunlukla yeterlidir.</p>
            </div>

            <div className="border-l-4 border-blue-900 pl-4">
              <h4 className="font-semibold text-blue-900 mb-2">Gürültü Kesme</h4>
              <p className="text-sm text-gray-700">Arka plan gürültüsünü azaltır, konuşmaları daha net duymanızı sağlar. Kalabalık yerlerde çok önemlidir.</p>
            </div>

            <div className="border-l-4 border-blue-900 pl-4">
              <h4 className="font-semibold text-blue-900 mb-2">Yönsel Mikrofon</h4>
              <p className="text-sm text-gray-700">Önünüzdeki seslere odaklanır, arkadaki gürültüyü azaltır. Sohbet ederken çok faydalıdır.</p>
            </div>

            <div className="border-l-4 border-blue-900 pl-4">
              <h4 className="font-semibold text-blue-900 mb-2">Bluetooth</h4>
              <p className="text-sm text-gray-700">Telefonunuzdan doğrudan cihazınıza ses gelir. Arama, müzik ve video içindir. iPhone ve Android'le çalışır.</p>
            </div>

            <div className="border-l-4 border-blue-900 pl-4">
              <h4 className="font-semibold text-blue-900 mb-2">Tinnitus Terapisi</h4>
              <p className="text-sm text-gray-700">Kulak çınlaması için özel sesler üretir. Çınlamayı maskelemeye yardımcı olur ve rahatlama sağlar.</p>
            </div>

            <div className="border-l-4 border-blue-900 pl-4">
              <h4 className="font-semibold text-blue-900 mb-2">IP68 Koruma</h4>
              <p className="text-sm text-gray-700">Su ve toz geçirmez. Ter, yağmur ve neme dayanıklı. Günlük kullanım için güvenlidir.</p>
            </div>

            <div className="border-l-4 border-blue-900 pl-4">
              <h4 className="font-semibold text-blue-900 mb-2">Şarj Edilebilir</h4>
              <p className="text-sm text-gray-700">Pil değiştirmeye gerek yoktur. Gece şarj edin, gün boyu kullanın. El becerileri zayıflamış olanlar için idealdir.</p>
            </div>

            <div className="border-l-4 border-blue-900 pl-4">
              <h4 className="font-semibold text-blue-900 mb-2">Feedback İptali</h4>
              <p className="text-sm text-gray-700">Cihazın çıkardığı ıslık sesini önler. Telefonda konuşurken veya sarılırken önemli.</p>
            </div>

            <div className="border-l-4 border-blue-900 pl-4">
              <h4 className="font-semibold text-blue-900 mb-2">Binaural (İki Kulak)</h4>
              <p className="text-sm text-gray-700">İki cihazınız birbirine bağlanır ve senkronize çalışır. Sesin nereden geldiğini daha iyi anlamanızı sağlar.</p>
            </div>

            <div className="border-l-4 border-blue-900 pl-4">
              <h4 className="font-semibold text-blue-900 mb-2">Otomatik Ortam Tanıma</h4>
              <p className="text-sm text-gray-700">Cihaz bulunduğunuz ortamı algılar ve ayarları otomatik değiştirir. Elle program değiştirmeye gerek kalmaz.</p>
            </div>

            <div className="border-l-4 border-blue-900 pl-4">
              <h4 className="font-semibold text-blue-900 mb-2">Yapay Zeka Destekli</h4>
              <p className="text-sm text-gray-700">Cihaz kullandıkça öğrenir ve tercihlerinize uyum sağlar. Her gün biraz daha iyi olur.</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3 text-lg">💡 Önemli Not:</h3>
            <p className="text-gray-700">
              Teknik özellikler önemli, ama en önemli şey <strong>sizin için doğru cihazı</strong> bulmak, doğru programlamak ve en yüksek verimi almanızı sağlamaktır.
              Uzman ekibimiz, işitme durumunuzu, yaşam tarzınızı ve bütçenizi dikkate alarak size en uygun cihazı önerecektir. 
              Danışmanlık için randevu alın!
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-blue-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-900" />
            <input
              type="text"
              placeholder="Ürün ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-5 py-2 rounded-full font-medium transition ${
                selectedCategory === c.id
                  ? "bg-blue-900 text-white"
                  : "bg-blue-50 text-blue-900 hover:bg-blue-100"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl border border-blue-100 transition"
            >
              <div className="relative">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-52 object-cover"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/400x300?text=No+Image")
                  }
                />
                <button
                  onClick={() => toggleFavorite(p.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:bg-blue-50"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(p.id)
                        ? "fill-red-500 text-red-500"
                        : "text-blue-900"
                    }`}
                  />
                </button>
                <span className="absolute top-3 left-3 bg-blue-900 text-white px-3 py-1 text-xs rounded-full">
                  {p.priceTag}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-semibold text-blue-900">{p.name}</h3>
                <p className="text-sm text-blue-900 mb-4 mt-2">{p.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {p.features.map((f, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-blue-50 text-blue-900 text-xs rounded-full"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-blue-900">
            <Volume2 className="w-12 h-12 mx-auto mb-4 text-blue-300" />
            Ürün bulunamadı.
          </div>
        )}
      </div>
    </div>
    </>
  );
}