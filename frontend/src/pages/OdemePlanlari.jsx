{/* QUESTION: DO YOU GUYS THINK I SHOULD CHANGE THE SIDE BAR NAVIGATION FROM ODEME PLANLARI TO SGK OR SHOULD WE REMOVE THIS WEBPAGE AND ADD SGK IN A SMALL SECTION IN THE MAIN PAGE?
  CONTANCT ME ON WHATSAPP +961 81 030 556  */}

import { Link } from 'react-router-dom';
import { X, Menu, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function OdemePlanlari() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
          <Link to="/randevu" onClick={() => setSidebarOpen(false)} className="block text-gray-800 font-medium hover:text-blue-900">
            Randevu Alın
          </Link>
          <Link to="/terapi-programi" onClick={() => setSidebarOpen(false)} className="block text-gray-800 font-medium hover:text-blue-900">
            Rehabilitasyon Programı
          </Link>
          <Link to="/urun-katalogu" onClick={() => setSidebarOpen(false)} className="block text-gray-800 font-medium hover:text-blue-900">
            Ürün Kataloğu
          </Link>
          <Link to="/odeme-planlari" onClick={() => setSidebarOpen(false)} className="block text-blue-900 font-semibold">
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
        {/*main code */ }
<div className="py-16 px-4 md:px-12 bg-linear-to-br from-blue-50 to-white-900 min-h-screen">
  <div className="max-w-4xl mx-auto">
    {/* Header */}
    <h1 className="text-5xl md:text-6xl font-bold text-center mb-12 text-blue-900">
      SGK Bilgisi
    </h1>
    
    {/* Divider */}
    <div className="w-full h-1 bbg-linear-to-r from-transparent via-blue-900 to-transparent mb-12"></div>
    
    {/* Intro Text */}
    <p className="text-center mb-16 text-xl md:text-2xl text-blue-900 font-medium">
      Merkezimiz, SGK ile sözleşmeli olarak çalışmaktadır.
    </p>

    {/* Info Cards */}
    <div className="space-y-8 mb-16">
      {/* Card 1 */}
      <div className="bg-white rounded-2xl shadow-lg p-8 flex items-start gap-6 hover:shadow-xl transition-shadow">
        <div className="shrink-0">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
        <p className="text-lg text-gray-700 leading-relaxed flex-1">
          SGK kapsamındaki cihazlar, hastanın raporu ve SGK onayına bağlı olarak temin edilmektedir.
        </p>
        <div className="shrink-0">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-linear-to-r from-transparent via-blue-200 to-transparent"></div>

      {/* Card 2 */}
      <div className="bg-white rounded-2xl shadow-lg p-8 flex items-start gap-6 hover:shadow-xl transition-shadow">
        <div className="shrink-0">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        </div>
        <p className="text-lg text-gray-700 leading-relaxed flex-1">
          SGK katkı oranları ve hangi cihazların kapsandığı hakkında ayrıntılı bilgi için lütfen bizimle iletişime geçin veya merkezimizi ziyaret edin.
        </p>
        <div className="shrink-0">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    {/* CTA Button */}
    <div className="text-center">
  <a
    href="https://wa.me/905322752414"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-blue-900 hover:bg-blue-900 text-white font-bold text-xl py-5 px-16 rounded-full transition transform hover:scale-105 shadow-xl"
  >
    Bize Ulaşın
  </a>
</div>
  </div>
</div>

      
    </div> 
  );
}


