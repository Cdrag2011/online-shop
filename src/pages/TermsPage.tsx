import React from "react";

const TermsPage: React.FC = () => {
  return (
    <div className="w-full pt-28 pb-20 px-4 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        Termeni și condiții
      </h1>

      <p className="text-gray-300 mb-4">
        Acești termeni și condiții reglementează utilizarea site-ului Neo Tech
        Shop, precum și relația comercială dintre distribuitor și client
        (persoană fizică sau juridică).
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Rolul site-ului</h2>
      <p className="text-gray-300">
        Site-ul funcționează ca platformă de prezentare produse, ofertare și, după
        caz, vânzare online. Comenzile pot fi confirmate ulterior telefonic, prin
        email sau WhatsApp.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Clienți B2B și B2C</h2>
      <p className="text-gray-300">
        Neo Tech Shop colaborează atât cu persoane fizice (B2C), cât și cu firme
        (B2B). Pentru clienții B2B se pot stabili condiții contractuale speciale,
        discounturi și termene de plată, în funcție de volum.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        3. Comenzi și disponibilitate
      </h2>
      <p className="text-gray-300">
        Comenzile plasate prin coș, email sau WhatsApp sunt considerate cereri
        de ofertă. Disponibilitatea produselor și prețul final vor fi confirmate
        de către un reprezentant Neo Tech Shop.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        4. Prețuri și facturare
      </h2>
      <p className="text-gray-300">
        Prețurile afișate sunt exprimate în lei și pot include sau nu TVA, în
        funcție de specificațiile afișate. Facturarea se face conform datelor
        furnizate de client (PF sau PJ).
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        5. Livrare și transport
      </h2>
      <p className="text-gray-300">
        Costul transportului este comunicat în momentul confirmării comenzii.
        Pentru anumite comenzi sau valori se pot aplica condiții speciale de
        transport.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        6. Garanții și retururi
      </h2>
      <p className="text-gray-300">
        Produsele sunt însoțite de garanția oferită de producător. Returul este
        posibil conform legislației în vigoare și condițiilor particulare
        comunicate la momentul vânzării.
      </p>
    </div>
  );
};

export default TermsPage;
