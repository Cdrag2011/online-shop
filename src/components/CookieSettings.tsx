import React, { useState, useEffect } from "react";

interface CookieSettingsProps {
  open: boolean;
  onClose: () => void;
}

const CookieSettings: React.FC<CookieSettingsProps> = ({ open, onClose }) => {
  const [functional, setFunctional] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // La deschidere, încărcăm preferințele salvate
  useEffect(() => {
    if (open) {
      setFunctional(localStorage.getItem("cookie-functional") === "true");
      setAnalytics(localStorage.getItem("cookie-analytics") === "true");
      setMarketing(localStorage.getItem("cookie-marketing") === "true");
    }
  }, [open]);

  const savePreferences = () => {
    localStorage.setItem("cookie-functional", String(functional));
    localStorage.setItem("cookie-analytics", String(analytics));
    localStorage.setItem("cookie-marketing", String(marketing));
    localStorage.setItem("cookie-consent", "custom");

    onClose();

    // Dacă analytics este activat → încărcăm GA
    if (analytics) {
      loadGoogleAnalytics();
    }
  };

const loadGoogleAnalytics = () => {
  if (document.getElementById("ga-script")) return;

  const script = document.createElement("script");
  script.id = "ga-script";
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX";
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];

  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", "G-XXXXXXX", { anonymize_ip: true });
};

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-gray-900 p-6 rounded-2xl w-full max-w-lg shadow-xl border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">Setări Cookies</h2>

        {/* NECESARE — disabled */}
        <div className="mb-4 p-3 bg-gray-800 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Cookie-uri necesare</span>
            <input type="checkbox" checked disabled />
          </div>
          <p className="text-xs text-gray-500">
            Acestea sunt esențiale pentru funcționarea site-ului și nu pot fi dezactivate.
          </p>
        </div>

        {/* FUNCTIONALE */}
        <div className="mb-4 p-3 bg-gray-800 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Funcționale</span>
            <input
              type="checkbox"
              checked={functional}
              onChange={(e) => setFunctional(e.target.checked)}
            />
          </div>
          <p className="text-xs text-gray-500">
            Îmbunătățesc funcționalitatea și personalizarea site-ului.
          </p>
        </div>

        {/* ANALYTICS */}
        <div className="mb-4 p-3 bg-gray-800 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Statistică / Google Analytics</span>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
            />
          </div>
          <p className="text-xs text-gray-500">
            Ne ajută să înțelegem utilizarea site-ului și să îl optimizăm.
          </p>
        </div>

        {/* MARKETING */}
        <div className="mb-4 p-3 bg-gray-800 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Marketing / Remarketing</span>
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
            />
          </div>
          <p className="text-xs text-gray-500">
            Folosite pentru reclame personalizate.
          </p>
        </div>

        {/* BUTOANE */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white"
          >
            Anulează
          </button>
          <button
            onClick={savePreferences}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 rounded-lg text-black font-bold"
          >
            Salvează preferințele
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieSettings;
