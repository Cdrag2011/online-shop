// src/pages/GuaranteePage.tsx

const GuaranteePage = () => {
  return (
    <div className="pt-28 px-6 text-white max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Garanție</h1>

      <p className="text-gray-300 leading-relaxed">
        Produsele comercializate pe Neo Tech Shop beneficiază de garanție conform
        legislației în vigoare, precum și politicilor producătorilor.
      </p>

      <ul className="list-disc pl-6 mt-4 text-gray-300">
        <li>Garanție standard între 12–36 luni (în funcție de produs).</li>
        <li>Posibilitatea de înlocuire sau rambursare.</li>
        <li>Suport tehnic prin email și telefon.</li>
      </ul>
    </div>
  );
};

export default GuaranteePage;
