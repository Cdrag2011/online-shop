import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="w-full pt-28 pb-20 px-4 max-w-7xl mx-auto text-white">
      <h1 className="text-4xl md:text-5xl font-bold drop-shadow mb-6 text-center">
        Despre Neo Tech Shop
      </h1>

      <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
        Neo Tech Shop este un distribuitor specializat de lubrifianți, filtre,
        produse chimice și soluții tehnice dedicate segmentelor auto, industrial,
        agricol și transporturi.
      </p>

      <div className="grid md:grid-cols-2 gap-10 mb-16">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Misiunea noastră</h2>
          <p className="text-gray-300">
            Misiunea noastră este să oferim clienților soluții complete de
            întreținere și protecție a utilajelor, flotelor și autovehiculelor,
            prin branduri premium și consultanță tehnică dedicată.
          </p>

          <h2 className="text-2xl font-semibold mt-6">Ce facem</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Distribuim lubrifianți auto și industriali de top.</li>
            <li>Asigurăm gamă completă de filtre HIFI Filter.</li>
            <li>Furnizăm soluții profesionale de curățare și igienă (Hertzkraft).</li>
            <li>Oferim consultanță pentru selecția produsului potrivit aplicației.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Branduri reprezentate</h2>
          <p className="text-gray-300">
            Lucrăm direct cu producători consacrați pentru a oferi calitate
            constantă și trasabilitate pe fiecare produs:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Rheinol – lubrifianți auto & industriali.</li>
            <li>Valvoline – soluții pentru flote și aplicații heavy-duty.</li>
            <li>Cyclon – lubrifianți dedicați segmentului agricol.</li>
            <li>Record – lubrifianți industriali și hidraulici.</li>
            <li>Sandexon – produse profesionale de igiena, biodegradabile.</li>
            <li>HIFI Filter – filtre pentru aer, ulei, combustibil, hidraulic.</li>
            <li>Hertzkraft – produse profesionale de curățare și șervețele industriale.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">De ce să lucrezi cu noi</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Stocuri disponibile și livrări rapide.</li>
            <li>Consultanță tehnică pentru fiecare aplicație.</li>
            <li>Posibilitate de colaborare B2B pe termen lung.</li>
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 text-center">
        <div className="bg-white/5 rounded-2xl p-6 shadow-lg">
          <p className="text-3xl font-bold text-yellow-400 mb-2">10+</p>
          <p className="text-gray-300">Branduri premium distribuite</p>
        </div>
        <div className="bg-white/5 rounded-2xl p-6 shadow-lg">
          <p className="text-3xl font-bold text-yellow-400 mb-2">1000+</p>
          <p className="text-gray-300">Produse în portofoliu</p>
        </div>
        <div className="bg-white/5 rounded-2xl p-6 shadow-lg">
          <p className="text-3xl font-bold text-yellow-400 mb-2">B2B & B2C</p>
          <p className="text-gray-300">Colaborări flexibile</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
