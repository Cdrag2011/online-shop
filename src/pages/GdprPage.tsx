import React from "react";

const GdprPage: React.FC = () => {
  return (
    <div className="w-full pt-28 pb-20 px-4 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Politica GDPR</h1>
      <p className="text-gray-300 mb-4">
        Această politică explică modul în care Neo Tech Shop prelucrează datele
        cu caracter personal, în conformitate cu Regulamentul (UE) 2016/679
        (GDPR).
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Operator de date</h2>
      <p className="text-gray-300">
        Operatorul de date este Neo Tech Shop, cu sediul în Baia Mare, Maramureș,
        Str. Codrului, Nr. 124, România.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Ce date colectăm</h2>
      <ul className="list-disc list-inside text-gray-300 space-y-1">
        <li>Nume și prenume.</li>
        <li>Adresă de email.</li>
        <li>Număr de telefon.</li>
        <li>Denumire firmă și CUI (pentru clienți B2B).</li>
        <li>Mesajele transmise prin formularele de contact sau comenzi.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Scopul prelucrării</h2>
      <ul className="list-disc list-inside text-gray-300 space-y-1">
        <li>Răspuns la solicitări și oferte de preț.</li>
        <li>Procesarea comenzilor și comunicarea comercială.</li>
        <li>Respectarea obligațiilor legale (facturare, contabilitate).</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Temei legal</h2>
      <p className="text-gray-300">
        Prelucrarea datelor se bazează pe consimțământul dumneavoastră,
        pe executarea unui contract sau pe obligații legale.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        5. Drepturile persoanelor vizate
      </h2>
      <ul className="list-disc list-inside text-gray-300 space-y-1">
        <li>Dreptul de acces.</li>
        <li>Dreptul la rectificare.</li>
        <li>Dreptul la ștergere (“dreptul de a fi uitat”).</li>
        <li>Dreptul la restricționarea prelucrării.</li>
        <li>Dreptul la portabilitatea datelor.</li>
        <li>Dreptul de opoziție.</li>
      </ul>

      <p className="text-gray-300 mt-4">
        Pentru exercitarea acestor drepturi, ne puteți contacta la{" "}
        <a href="mailto:office@baiadeulei.ro" className="text-yellow-400">
          office@baiadeulei.ro
        </a>.
      </p>
    </div>
  );
};

export default GdprPage;
