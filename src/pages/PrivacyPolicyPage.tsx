import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 px-6 max-w-5xl mx-auto text-white">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        Politica de confidențialitate (GDPR)
      </h1>

      <p className="text-sm text-gray-400 mb-6">
        Ultima actualizare: 2025 &middot; Acest document are rol informativ și nu
        reprezintă consultanță juridică. Recomandăm verificarea conținutului de
        către un specialist juridic / GDPR.
      </p>

      <section className="space-y-6 text-gray-200 text-sm md:text-base">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Cine suntem</h2>
          <p>
            Acest site este operat de{" "}
            <strong>Neo Tech Management SRL / Baiadeulei.ro</strong>, cu sediul în{" "}
            <strong>
              Baia Mare, Maramureș, Str. Codrului, Nr. 124, România
            </strong>
            . <br />
            Ne poți contacta la:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Telefon: (+40) 723 730 664</li>
            <li>Email: office@baiadeulei.ro</li>
            <li>Website: https://www.baiadeulei.ro</li>
          </ul>
          <p className="mt-2">
            În sensul Regulamentului (UE) 2016/679 (GDPR), noi suntem operatorul
            de date cu caracter personal.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            2. Ce date personale prelucrăm
          </h2>
          <p>În funcție de modul în care folosești site-ul, putem prelucra:</p>
          <ul className="list-disc list-inside mt-2">
            <li>
              Date de identificare: nume, prenume, denumire firmă, CUI, nr.
              înregistrare la Registrul Comerțului (dacă este cazul).
            </li>
            <li>Date de contact: telefon, email, adresă de livrare / facturare.</li>
            <li>
              Date necesare pentru comenzi: produse comandate, valoare, modalitate
              de plată, status comandă.
            </li>
            <li>
              Date tehnice: adresă IP, tip browser, device, sistem de operare,
              date de log (prin cookie-uri și tehnologii similare).
            </li>
            <li>
              Date provenite din comunicare: mesaje trimise prin formularul de
              contact, email, WhatsApp, telefon.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            3. Scopurile și temeiurile prelucrării
          </h2>
          <p>Folosim datele tale în următoarele scopuri:</p>
          <ul className="list-disc list-inside mt-2">
            <li>
              <strong>Procesarea comenzilor</strong> – pentru a prelua, confirma,
              emite factură, livra și gestiona comenzile tale.
              <br />
              <em>Temei legal:</em> executarea contractului (art. 6 alin. (1)
              lit. b GDPR).
            </li>
            <li>
              <strong>Relația cu clienții</strong> – pentru a răspunde la
              întrebări, solicitări, reclamații, oferte personalizate.
              <br />
              <em>Temei legal:</em> interes legitim și/sau consimțământ.
            </li>
            <li>
              <strong>Obligații legale</strong> – emiterea documentelor contabile,
              arhivarea acestora, răspuns către autorități.
              <br />
              <em>Temei legal:</em> obligație legală (art. 6 alin. (1) lit. c
              GDPR).
            </li>
            <li>
              <strong>Marketing și comunicări comerciale</strong> – trimiterea de
              newslettere, oferte sau informații comerciale, dacă ai fost de
              acord.
              <br />
              <em>Temei legal:</em> consimțământ (art. 6 alin. (1) lit. a GDPR).
            </li>
            <li>
              <strong>Analiză și îmbunătățirea site-ului</strong> – analiza
              statistică a traficului, comportamentului de navigare, performanței
              site-ului.
              <br />
              <em>Temei legal:</em> interes legitim și/sau consimțământ (pentru
              cookie-uri de analiză).
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            4. Cui transmitem datele tale
          </h2>
          <p>
            Nu vindem și nu închiriem datele tale către terți. Totuși, anumite
            date pot fi comunicate către:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Firme de curierat și logistică.</li>
            <li>Bănci / procesatori de plăți online.</li>
            <li>
              Furnizori de servicii IT, hosting, mentenanță site, software
              contabil.
            </li>
            <li>Autorități publice, dacă există o obligație legală.</li>
          </ul>
          <p className="mt-2">
            În toate cazurile, lucrăm cu parteneri care asigură un nivel adecvat
            de protecție a datelor, conform GDPR.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            5. Perioada de stocare a datelor
          </h2>
          <p>
            Datele tale sunt păstrate doar atât timp cât este necesar pentru
            scopurile pentru care au fost colectate sau cât timp suntem obligați
            prin lege (de exemplu, documentele contabile se păstrează conform
            legislației fiscale în vigoare).
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            6. Drepturile tale ca persoană vizată
          </h2>
          <p>Conform GDPR, ai următoarele drepturi:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Dreptul de acces la datele tale.</li>
            <li>Dreptul la rectificarea datelor inexacte sau incomplete.</li>
            <li>Dreptul la ștergere („dreptul de a fi uitat”), în anumite condiții.</li>
            <li>Dreptul la restricționarea prelucrării.</li>
            <li>Dreptul la portabilitatea datelor.</li>
            <li>
              Dreptul de opoziție la prelucrarea bazată pe interes legitim sau
              marketing direct.
            </li>
            <li>
              Dreptul de a-ți retrage consimțământul, atunci când prelucrarea se
              bazează pe acesta.
            </li>
          </ul>
          <p className="mt-2">
            Pentru exercitarea acestor drepturi, ne poți contacta la{" "}
            <a
              href="mailto:office@baiadeulei.ro"
              className="text-yellow-400 underline"
            >
              office@baiadeulei.ro
            </a>
            . <br />
            Ai, de asemenea, dreptul de a depune o plângere la{" "}
            <strong>
              Autoritatea Națională de Supraveghere a Prelucrării Datelor cu
              Caracter Personal (ANSPDCP)
            </strong>.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">7. Cookie-uri și tracking</h2>
          <p>
            Site-ul nostru folosește cookie-uri necesare, funcționale,
            statistice și, în anumite condiții, cookie-uri de marketing.
          </p>
          <p className="mt-2">
            Detalii complete găsești în{" "}
            <Link
              to="/cookies"
              className="text-yellow-400 underline font-semibold"
            >
              Politica de cookie-uri
            </Link>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            8. Securitatea datelor
          </h2>
          <p>
            Luăm măsuri tehnice și organizatorice adecvate pentru a proteja
            datele tale împotriva pierderii, accesului neautorizat, alterării
            sau divulgării. Cu toate acestea, niciun sistem informatic nu poate
            garanta securitate 100%.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            9. Modificări ale acestei politici
          </h2>
          <p>
            Ne rezervăm dreptul de a actualiza periodic această politică pentru a
            reflecta modificări legislative sau schimbări în modul în care
            prelucrăm datele. Versiunea actualizată va fi afișată pe această
            pagină.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
