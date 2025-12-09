import { Link } from "react-router-dom";
import FloatingButtons from "../components/FloatingButtons";

const DespreNoiPage = () => {
  return (
    <div className="pt-24 text-white">
      {/* HERO SECTION */}
      <section
        className="w-full h-[40vh] md:h-[50vh] bg-cover bg-center relative"
        style={{ backgroundImage: `url(/assets/about-hero.jpg)` }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
            Despre <span className="text-yellow-400">Neo Tech Shop</span>
          </h1>
          <p className="max-w-2xl text-gray-300 mt-4 text-lg">
            Furnizor de lubrifianți premium, filtre industriale și soluții
            tehnice profesionale pentru auto, agricultură și industrie.
          </p>
        </div>
      </section>

      {/* CONȚINUT PRINCIPAL */}
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* 1. PREZENTARE */}
        <div>
          <h2 className="text-3xl font-bold mb-4 text-yellow-400">
            Cine suntem?
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            Neo Tech Shop este un distribuitor autorizat de lubrifianți, filtre
            și produse tehnice profesionale, adresate atât sectorului auto, cât
            și segmentelor industriale, comerciale și agricole. Cu peste 10 ani
            de experiență în domeniu, echipa noastră oferă soluții moderne,
            eficiente și adaptate nevoilor reale ale partenerilor noștri.
          </p>
        </div>

        {/* 2. VALORI */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-yellow-400">
            Valorile noastre
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                t: "Calitate garantată",
                d: "Lucrăm doar cu branduri premium și produse certificate internațional.",
              },
              {
                t: "Promptitudine",
                d: "Asigurăm livrări rapide și suport tehnic în timp real.",
              },
              {
                t: "Parteneriate pe termen lung",
                d: "Construim relații bazate pe încredere, profesionalism și transparență.",
              },
            ].map((v, i) => (
              <div
                key={i}
                className="bg-white/10 p-6 rounded-2xl border border-white/10"
              >
                <h3 className="text-xl font-bold mb-2">{v.t}</h3>
                <p className="text-gray-300">{v.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. DOMENII */}
        <div>
          <h2 className="text-3xl font-bold mb-4 text-yellow-400">
            Ce oferim?
          </h2>

          <ul className="space-y-3 text-gray-300 text-lg">
            <li>
              • Lubrifianți auto si vehicule comerciale, utilaje constructii si
              agricole și industriali
            </li>
            <li>• Filtre auto, utilaje, camioane, echipamente industriale</li>
            <li>
              • Soluții de igienă profesională pentru service-uri și industrie
            </li>
            <li>• Consultanță tehnică specializată</li>
            <li>• Prețuri competitive și oferte personalizate</li>
            <li>• Livrare rapidă în toată țara</li>
          </ul>
        </div>

        {/* 4. AVANTAJE */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-yellow-400">
            De ce să lucrezi cu noi?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 p-6 rounded-xl">
              ✔ Gamă variată de produse premium
            </div>
            <div className="bg-white/10 p-6 rounded-xl">
              ✔ Suport tehnic oferit de specialiști
            </div>
            <div className="bg-white/10 p-6 rounded-xl">
              ✔ Prețuri foarte bune pentru parteneri
            </div>
            <div className="bg-white/10 p-6 rounded-xl">
              ✔ Livrare rapidă în 24–48 ore
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            to="/contact"
            className="px-8 py-3 bg-yellow-500 text-black font-bold rounded-full hover:bg-yellow-400 transition"
          >
            Contactează-ne
          </Link>
        </div>
      </section>

      {/* Floating Buttons */}
      <FloatingButtons />
    </div>
  );
};

export default DespreNoiPage;
