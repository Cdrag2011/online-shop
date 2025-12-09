import {useState} from "react";
import { Phone, Mail, MessageCircle } from "lucide-react";
import Brandssection from "../components/BrandsSection";
import ProductList from "../components/ProductList";


function HomePage() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-col min-h-screen bg-gray-950 text-white">
        {/* Bara de top */}
        <div className="bg-gray-900 text-sm text-center py-2">
          Ulei auto, ulei industrial, ulei hidraulic, lubrifianți industriali,
          unsori, vaseline și igiena profesionala.
        </div>

        {/* Navbar */}
        <header className="bg-[#0f2a33] flex items-center justify-between px-8 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black-30 rounded-sm"></div>
            <img src="/logos/neo-tech-logo7.png" alt="Neo Tech Shop"></img>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 w-1/2">
            <input
              type="text"
              placeholder="Caută produse"
              className="flex-1 rounded-md px-3 py-2 text-black outline-none" />
            <button className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md">
              +40 723 730 664
            </button>
          </div>
        </header>

        {/* hero section */}
        <section
          className="flex flex-col justify-center items-center flex-1 text-center text-white bg-cover bg-center"
          style={{
            backgroundImage: "('/images/banner.jpg')",
          }}
        >
          <div className="bg-black/50 w-full h-full absolute inset-0" />
          <div className="relative z-10 p-6">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Neo Tech Shop
            </h2>
            <p className="text-lg md:text-xl mb-6 max-w-xl mx-auto">
              Furnizorul tău de ulei auto, ulei industrial, ulei hidraulic,
              lubrifianți industriali, unsori vaseline și igiena profesionala,
              high quality .
            </p>
            <button className="bg-yellow-500 text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-400 transition">
              Vezi produse
            </button>
          </div>
        </section>

        {/* Butoane flotante */}
        <div className="fixed left-4 bottom-6 flex flex-col gap-3 z-20">
          <a
            href="tel:0723730664"
            className="bg-yellow-500 text-black p-3 rounded-full shadow-md hover:bg-yellow-400 transition"
          >
            <Phone size={20} />
          </a>
          <a
            href="https://wa.me/40723730664"
            className="bg-green-500 text-white p-3 rounded-full shadow-md hover:bg-green-400 transition"
          >
            <MessageCircle size={20} />
          </a>
          <a
            href="mailto:contact@sigmadistributie.ro"
            className="bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-400 transition"
          >
            <Mail size={20} />
          </a>
        </div>
        <div>
          {/* alte secțiuni: header, hero etc. */}
          <Brandssection onSelectBrand={(brand) => {
            setSelectedBrand(brand);
          } } />
          <ProductList selectedBrand={selectedBrand} />
          {/* celelalte secțiuni */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
