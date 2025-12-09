import { SlSettings } from "react-icons/sl";

const CookieFloatingButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 left-6 bg-gray-800 text-white p-3 rounded-full shadow-xl 
                 hover:bg-gray-700 transition z-40 flex items-center gap-2"
    >
      <SlSettings size={20} />
      <span className="hidden md:inline text-sm">Setări Cookies</span>
    </button>
  );
};

export default CookieFloatingButton;
