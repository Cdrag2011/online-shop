const FloatingButtons = () => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      {/* WhatsApp */}
      <a
        href="https://wa.me/40723730664"
        target="_blank"
        className="w-14 h-14 flex items-center justify-center bg-green-500 rounded-full shadow-lg shadow-black/40 hover:scale-110 transition"
      >
        <img src="/icons/whatsapp.png" alt="WhatsApp" className="w-8 h-8" />
      </a>

      {/* Facebook */}
      <a
        href="https://facebook.com"
        target="_blank"
        className="w-14 h-14 flex items-center justify-center bg-blue-600 rounded-full shadow-lg shadow-black/40 hover:scale-110 transition"
      >
        <img src="/icons/facebook.png" alt="Facebook" className="w-8 h-8" />
      </a>

      {/* Telefon */}
      <a
        href="tel:+40723730664"
        className="w-14 h-14 flex items-center justify-center bg-yellow-400 rounded-full shadow-lg shadow-black/40 hover:scale-110 transition"
      >
        <img src="/icons/phone.png" alt="Call" className="w-8 h-8" />
      </a>

      {/* Email */}
      <a
        href="mailto:contact@neotechshop.ro"
        className="w-14 h-14 flex items-center justify-center bg-red-500 rounded-full shadow-lg shadow-black/40 hover:scale-110 transition"
      >
        <img src="/icons/email.png" alt="Email" className="w-8 h-8" />
      </a>
    </div>
  );
};

export default FloatingButtons;
