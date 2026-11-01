import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Anasayfa from "./pages/Anasayfa";
import RandevuSistemi from "./pages/RandevuSistemi";
import UrunKatalogu from "./pages/UrunKatalogu";
import TerapiProgrami from "./pages/TerapiProgrami";
import OdemePlanlari from "./pages/OdemePlanlari";
import AudioServis from "./pages/AudioServisiUygulamasi";
import KvkkPopup from "./components/KvkkPopup.jsx";
import Hakkimizda from "./pages/Hakkimizda.jsx";
import OnlineTest from "./pages/OnlineTest.jsx";

function App() {
  return (
    <>
      {/* KVKK popup (appears on all pages) */}
      <KvkkPopup />

      {/* Main Router */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Anasayfa />} />
          <Route path="/randevu" element={<RandevuSistemi />} />
          <Route path="/urun-katalogu" element={<UrunKatalogu />} />
          <Route path="/terapi-programi" element={<TerapiProgrami />} />
          <Route path="/odeme-planlari" element={<OdemePlanlari />} />
          <Route path="/audio-servis" element={<AudioServis />} />
          <Route path="/hakkimizda" element={<Hakkimizda />} />
          <Route path="/online-test" element={<OnlineTest />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
