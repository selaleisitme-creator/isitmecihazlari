import { BrowserRouter, Route, Routes } from "react-router-dom";

import KvkkPopup from "./components/KvkkPopup.jsx";
import Anasayfa from "./pages/Anasayfa";
import AudioServis from "./pages/AudioServisiUygulamasi";
import Hakkimizda from "./pages/Hakkimizda.jsx";
import OdemePlanlari from "./pages/OdemePlanlari";
import OnlineTest from "./pages/OnlineTest.jsx";
import RandevuSistemi from "./pages/RandevuSistemi";
import TerapiProgrami from "./pages/TerapiProgrami";
import UrunKatalogu from "./pages/UrunKatalogu";

function App() {
  return (
    <>
      {/* KVKK popup (appears on all pages) */}
      <KvkkPopup />

      {/* Main Router */}
      <BrowserRouter>
        <Routes basename="/">
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
