import React from "react";

interface SectionProps {
  id: "client" | "delivery" | "invoice" | "summary";
  title: string;
  openSection: "client" | "delivery" | "invoice" | "summary";
  setOpenSection: (id: "client" | "delivery" | "invoice" | "summary") => void;
  children: React.ReactNode;
}

/**
 * Componentă generica pentru secțiunile tip acordeon
 * Folosită în CheckoutPage.
 * NU se mai închide automat când tastezi în input-uri.
 */
const Section: React.FC<SectionProps> = ({
  id,
  title,
  openSection,
  setOpenSection,
  children,
}) => {
  const isOpen = openSection === id;

  return (
    <div className="bg-white/5 rounded-2xl mb-4 border border-white/10">
      <button
        type="button"
        onClick={() => setOpenSection(id)}
        className="w-full flex justify-between items-center px-4 py-3 text-left"
      >
        <span className="font-semibold text-lg">{title}</span>
        <span className="text-yellow-400 text-xl">{isOpen ? "−" : "+"}</span>
      </button>

      {/* Important: folosește block/hidden, NU render condițional */}
      <div className={`${isOpen ? "block" : "hidden"} px-4 pb-4`}>
        {children}
      </div>
    </div>
  );
};

export default Section;
