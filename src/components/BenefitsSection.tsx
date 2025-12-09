import OilFlowBackground from "./OilFlowBackground";

const BrandsSection = () => {
  const brands = [
    "Rheinol",
    "Repsol",
    "Record",
    "Valvoline",
    "Cyclon",
    "Sandexon",
    "Herzkraft",
    "Hifi Filter",
  ];

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* ANIMAȚIA DE ULEI */}
      <OilFlowBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
          Branduri de uleiuri și lubrifianți
        </h2>

        <p className="text-slate-700 mb-10 max-w-3xl mx-auto">
          Lucrăm cu producători consacrați de uleiuri și lubrifianți, pentru a oferi soluții 
          fiabile în aplicații auto, agricole și industriale.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {brands.map((brand) => (
            <span
              key={brand}
              className="
                px-5 py-2 rounded-full border border-slate-300 
                bg-white/80 backdrop-blur-md 
                text-slate-900 text-sm font-medium 
                shadow-sm hover:shadow-md transition
              "
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
