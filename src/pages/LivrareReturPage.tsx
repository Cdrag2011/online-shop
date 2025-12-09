import FloatingButtons from "../components/FloatingButtons";

const LivrareReturPage = () => {
  return (
    <div className="pt-24 px-6 text-white max-w-6xl mx-auto">

      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-yellow-400">
        Livrare & Retur
      </h1>

      {/* LIVRARE */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-4">📦 Livrare rapidă în toată țara</h2>

        <p className="text-gray-300 leading-relaxed mb-4">
          Neo Tech Shop livrează în orice localitate din România prin curieri 
          parteneri (Fan Courier, Cargus, Sameday). Comenzile sunt procesate 
          în 24h și livrate în 1–2 zile lucrătoare.
        </p>

        <ul className="space-y-2 text-gray-300">
          <li>• Cost livrare standard: <span className="text-yellow-400">19 lei</span></li>
          <li>• Transport gratuit peste <span className="text-yellow-400">500 lei</span></li>
          <li>• Ridicare personală din depozit: <span className="text-yellow-400">0 lei</span></li>
        </ul>
      </section>

      {/* RETUR */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-4">🔄 Politica de retur</h2>

        <p className="text-gray-300 leading-relaxed mb-4">
          Ai dreptul să returnezi orice produs în termen de 
          <span className="text-yellow-400"> 14 zile calendaristice</span>,
          fără invocarea unui motiv, conform legislației în vigoare (OUG 34/2014).
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Condiții retur:</h3>
        <ul className="space-y-2 text-gray-300">
          <li>• Produsul trebuie să fie în ambalajul original</li>
          <li>• Să nu prezinte urme de utilizare</li>
          <li>• Să fie însoțit de factură</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">Cum trimit returul?</h3>
        <ul className="space-y-2 text-gray-300">
          <li>1. Completezi formularul de retur</li>
          <li>2. Trimiți coletul prin curier</li>
          <li>3. Returnarea banilor se face în 3–7 zile după recepționarea produsului</li>
        </ul>
      </section>

      <FloatingButtons />
    </div>
  );
};

export default LivrareReturPage;
