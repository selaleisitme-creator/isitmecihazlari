import React, { useState, useEffect } from "react";

export default function KvkkPopup() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Optional: show popup 2 seconds after page load
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-sm w-[320px] bg-white border border-gray-200 shadow-2xl rounded-2xl p-5 animate-fade-in-up">
      {/* Close button */}
      <button
        onClick={() => setVisible(false)}
        className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-lg font-bold"
        aria-label="Kapat"
      >
        ×
      </button>

      {/* Title */}
      <h2 className="text-lg font-bold text-blue-900 mb-2">
        Kişisel Verilerinizin Korunması
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-700 mb-4 leading-snug">
        Verileriniz, KVKK kapsamında yalnızca sağlık hizmetleri, faturalandırma
        ve yasal yükümlülükler için işlenmektedir.
      </p>

      {/* Button */}
      <a
        href="/kvk.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-sm font-semibold text-white bg-blue-900 hover:bg-blue-800 py-2 px-4 rounded-lg transition"
      >
        Detaylı bilgi için tıklayın
      </a>
    </div>
  );
}
