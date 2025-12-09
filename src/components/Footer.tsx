import { Link } from "react-router-dom";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-gray-300 pt-12 pb-6 mt-20 border-t border-gray-800">
      {/* GRID 3 COLUMNE */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* COL 1 – LOGO + DESCRIERE */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3">Neo Tech Shop</h3>
          <p className="text-sm text-gray-400">
            Furnizor autorizat de lubrifianți, filtre și produse tehnice
            profesionale. Soluții pentru auto, industrie și agricultură.
          </p>
        </div>

        {/* COL 2 – LINKURI RAPIDE */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            Linkuri utile
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/despre" className="hover:text-yellow-400">
                Despre noi
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-400">
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/politica-confidentialitate"
                className="hover:text-yellow-400"
              >
                Politica de confidențialitate
              </Link>
            </li>
            <li>
              <Link to="/termeni-conditii" className="hover:text-yellow-400">
                Termeni și condiții
              </Link>
            </li>
            <li>
              <Link to="/politica-cookies" className="hover:text-yellow-400">
                Politica de cookie-uri
              </Link>
            </li>
            <li>
              <Link to="/despre" className="hover:text-yellow-400">
                Despre noi
              </Link>
            </li>
            <li>
              <Link to="/livrare-retur">Livrare & retur</Link>
            </li>
            <li>
              <Link to="/recenzii">Recenzii</Link>
            </li>
            <li>
              <Link to="/garantie">Garanție</Link>
            </li>
          </ul>
        </div>

        {/* COL 3 – SOCIAL MEDIA */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            Social media
          </h4>
          <div className="flex items-center gap-4 text-xl">
            <a
              href="https://www.facebook.com/baiadeulei"
              target="_blank"
              className="p-3 bg-blue-600 rounded-full hover:bg-blue-500 transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://wa.me/40723730664"
              target="_blank"
              className="p-3 bg-green-600 rounded-full hover:bg-green-500 transition"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-gray-500 text-sm mt-10">
        © 2025 Neo Tech Shop — Toate drepturile rezervate.
      </div>
    </footer>
  );
};

export default Footer;
