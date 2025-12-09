import OilFlowBackground from "./OilFlowBackground";

const CategoriesSection = () => {
  const categories = [
    "Uleiuri auto",
    "Uleiuri pentru vehicule comerciale",
    "Uleiuri pentru agricultură",
    "Uleiuri industriale",
    "Ulei hidraulic",
    "Unsori și vaseline",
    "Produse de întreținere și curățare",
    "Sisteme de filtrare",
  ];

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <OilFlowBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-900">
          Categorii de uleiuri și lubrifianți
        </h2>

        <p className="text-slate-700 mb-8 max-w-3xl">
          Gama noastră de produse acoperă aplicații auto, agricole, industriale
          și hidraulice, astfel încât să poți alege uleiul și lubrifiantul
          potrivit pentru fiecare utilaj sau echipament.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => (
            <div
              key={cat}
              className="border border-slate-200 rounded-xl bg-white/90 backdrop-blur-sm p-4 shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-semibold text-slate-900 mb-2">{cat}</h3>
              <p className="text-sm text-slate-600">
                Soluții dedicate pentru performanță, protecție și durată de
                viață extinsă.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
