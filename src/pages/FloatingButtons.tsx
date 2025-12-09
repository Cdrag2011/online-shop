import { useState } from "react";
import { FaWhatsapp, FaPhoneAlt, FaFacebookF } from "react-icons/fa";

const FloatingButtons = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-yellow-500 hover:bg-yellow-400 text-black p-4 rounded-full shadow-xl transition transform hover:scale-110"
      >
        {open ? "✖" : "☰"}
      </button>

      {/* Container animat */}
      <div
        className={`
          flex flex-col items-end gap-3 mt-4 transition-all duration-300
          ${open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"}
        `}
      >
        {/* WhatsApp */}
        <a
          href="https://wa.me/40723730664"
          target="_blank"
          className="flex items-center gap-3 bg-green-600 hover:bg-green-500 
                     text-white py-2 pl-4 pr-3 rounded-full shadow-lg 
                     transition transform hover:scale-105"
        >
          <span className="font-semibold">WhatsApp: +40 723 730 664</span>
          <FaWhatsapp size={22} />
        </a>

        {/* Telefon */}
        <a
          href="tel:+40723730664"
          className="flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 
                     text-black py-2 pl-4 pr-3 rounded-full shadow-lg 
                     transition transform hover:scale-105"
        >
          <span className="font-semibold">Sună: +40 723 730 664</span>
          <FaPhoneAlt size={20} />
        </a>

        {/* Facebook */}
        <a
          href="https://www.facebook.com/baiadeulei"
          target="_blank"
          className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 
                     text-white py-2 pl-4 pr-3 rounded-full shadow-lg 
                     transition transform hover:scale-105"
        >
          <span className="font-semibold">Facebook Neo Tech</span>
          <FaFacebookF size={18} />
        </a>
      </div>
    </div>
  );
};

export default FloatingButtons;
