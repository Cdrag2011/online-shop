import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  // La încărcare, verificăm dacă userul a răspuns
  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true); // Afișăm bannerul doar dacă NU există preferință salvată
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
    navigate("/cookies");
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900/95 backdrop-blur-md text-white py-4 px-6 border-t border-gray-700 z-50 shadow-xl">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Text */}
        <p className="text-gray-300 text-sm md:text-base">
          Acest site folosește cookie-uri pentru a-ți oferi o experiență mai bună. 
          Poți citi mai multe în <a href="/cookies" className="text-yellow-400 underline">Politica de cookies</a>.
        </p>

        {/* Butoane */}
        <div className="flex gap-3">
          <button
            onClick={rejectCookies}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold"
          >
            Nu, refuz
          </button>

          <button
            onClick={acceptCookies}
            className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
