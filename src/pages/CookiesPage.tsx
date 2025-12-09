import FloatingButtons from "../components/FloatingButtons";

const CookiesPage = () => {
  return (
    <div className="pt-32 px-6 max-w-5xl mx-auto text-white mb-20">
      <h1 className="text-4xl font-bold mb-6 text-yellow-400">
        Politica de Cookies
      </h1>

      <p className="text-gray-300 mb-6">
        Această politică explică modul în care platforma <strong>Neo Tech Shop</strong>
        utilizează cookie-uri și tehnologii similare pentru a îmbunătăți experiența ta de navigare,
        pentru a analiza traficul și pentru a personaliza conținutul.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-3">1. Ce sunt cookie-urile?</h2>
      <p className="text-gray-300 mb-6">
        Cookie-urile sunt fișiere mici de text stocate pe dispozitivul tău (computer, tabletă,
        telefon) atunci când vizitezi un site. Ele permit site-ului să funcționeze corect și să
        memoreze preferințele tale.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-3">
        2. Tipuri de cookie-uri pe care le folosim
      </h2>

      <ul className="list-disc ml-6 text-gray-300 space-y-2">
        <li>
          <strong>Cookie-uri necesare</strong> – esențiale pentru funcționarea site-ului
          (coș de cumpărături, autentificare etc.).
        </li>
        <li>
          <strong>Cookie-uri de performanță</strong> – ne ajută să analizăm traficul și să
          îmbunătățim experiența utilizatorilor.
        </li>
        <li>
          <strong>Cookie-uri de funcționalitate</strong> – rețin preferințe precum limbă,
          setări sau date completate.
        </li>
        <li>
          <strong>Cookie-uri de marketing</strong> – folosite pentru reclame personalizate sau
          conversii (ex: Facebook Pixel / Google Ads).
        </li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-3">
        3. De ce folosim cookie-urile?
      </h2>

      <p className="text-gray-300 mb-6">
        Folosim cookie-uri pentru:
      </p>

      <ul className="list-disc ml-6 text-gray-300 space-y-2">
        <li>Funcționarea corectă a paginilor și a sistemului de cumpărături</li>
        <li>Autentificarea clienților</li>
        <li>Salvarea coșului între sesiuni</li>
        <li>Analiză trafic (Google Analytics)</li>
        <li>Promovare online (Facebook / Google Ads)</li>
        <li>Îmbunătățirea performanței site-ului</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-3">
        4. Cum poți controla cookie-urile?
      </h2>

      <p className="text-gray-300 mb-6">
        Poți controla sau șterge cookie-urile din setările browserului tău. Atenție: dezactivarea
        anumitor cookie-uri poate afecta funcționarea site-ului.
      </p>

      <h3 className="text-xl font-bold mt-6 mb-3">Linkuri utile:</h3>
      <ul className="list-disc ml-6 text-gray-300 space-y-2">
        <li>
          Chrome:{" "}
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            className="text-yellow-400 hover:underline"
          >
            Gestionarea cookie-urilor
          </a>
        </li>
        <li>
          Firefox:{" "}
          <a
            href="https://support.mozilla.org/ro/kb/activarea-si-dezactivarea-cookie-urilor"
            target="_blank"
            className="text-yellow-400 hover:underline"
          >
            Activarea și dezactivarea cookie-urilor
          </a>
        </li>
        <li>
          Safari:{" "}
          <a
            href="https://support.apple.com/ro-ro/guide/safari/sfri11471/mac"
            target="_blank"
            className="text-yellow-400 hover:underline"
          >
            Setări cookie-uri
          </a>
        </li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-3">5. Actualizări ale politicii</h2>
      <p className="text-gray-300 mb-10">
        Ne rezervăm dreptul de a actualiza această politică oricând. Te recomandăm să verifici
        periodic această pagină.
      </p>

      <FloatingButtons />
    </div>
  );
};

export default CookiesPage;
