import React from "react";
import { Link } from "react-router-dom";

const TermsConditionsPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 px-6 max-w-5xl mx-auto text-white">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        Termeni și condiții de utilizare și vânzare online
      </h1>

      <p className="text-sm text-gray-400 mb-6">
        Ultima actualizare: 2025 &middot; Acest document are rol informativ și nu
        reprezintă consultanță juridică. Recomandăm revizuirea sa de către un
        avocat specializat în drept comercial și protecția consumatorului.
      </p>

      <section className="space-y-6 text-gray-200 text-sm md:text-base">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Părțile contractului</h2>
          <p>
            Site-ul <strong>https://www.baiadeulei.ro</strong> este operat de{" "}
            <strong>Neo Tech Shop / Baiadeulei.ro</strong>, cu sediul în{" "}
            <strong>
              Baia Mare, Maramureș, Str. Codrului, Nr. 124, România
            </strong>
            .
          </p>
          <p className="mt-2">
            În continuare, „Vânzătorul” sau „Noi” se referă la operatorul site-ului,
            iar „Cumpărătorul” sau „Clientul” se referă la orice persoană fizică sau
            juridică ce plasează o comandă prin intermediul site-ului.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. Acceptarea termenilor</h2>
          <p>
            Utilizarea site-ului, crearea unui cont și/sau plasarea unei comenzi
            implică acceptarea implicită a prezentelor Termene și Condiții.
          </p>
          <p className="mt-2">
            Ne rezervăm dreptul de a modifica în orice moment conținutul acestor
            termeni, fără o notificare prealabilă. Versiunea actualizată va fi
            disponibilă pe această pagină.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            3. Înregistrarea contului și responsabilitatea clientului
          </h2>
          <ul className="list-disc list-inside mt-2">
            <li>
              Pentru a plasa comenzi poți utiliza fie un cont de client, fie
              comandă ca vizitator (dacă opțiunea este disponibilă).
            </li>
            <li>
              Ești responsabil pentru corectitudinea datelor furnizate (nume,
              adresă, date firmă, CUI, email, telefon).
            </li>
            <li>
              Ești responsabil pentru păstrarea confidențialității datelor de
              autentificare și a activității desfășurate în contul tău.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            4. Produse, prețuri și stocuri
          </h2>
          <ul className="list-disc list-inside mt-2">
            <li>
              Descrierile produselor au caracter informativ, bazat pe datele
              furnizate de producători / distribuitori.
            </li>
            <li>
              Prețurile afișate sunt exprimate în lei (RON) și pot include sau nu
              TVA, în funcție de setările afișate pe site (menționate expres).
            </li>
            <li>
              Ne rezervăm dreptul de a modifica prețurile fără notificare prealabilă.
              Pentru comenzile deja plasate, se aplică prețul valabil la momentul
              comenzii.
            </li>
            <li>
              Disponibilitatea produselor poate varia. În cazul în care un produs
              comandat nu mai este disponibil, vei fi informat și îți vom propune
              alternativa: rambursarea plății sau înlocuirea produsului.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Plasarea comenzii</h2>
          <p>Procesul general de comandă implică următorii pași:</p>
          <ol className="list-decimal list-inside mt-2">
            <li>Adăugarea produselor în coș.</li>
            <li>Completarea datelor de contact și de livrare/facturare.</li>
            <li>Alegerea metodei de plată și de livrare.</li>
            <li>Confirmarea și trimiterea comenzii.</li>
          </ol>
          <p className="mt-2">
            Prin trimiterea comenzii, declari că toate datele furnizate sunt
            reale, complete și corecte și că ești de acord cu Termenii și
            Condițiile afișate.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            6. Modalități de plată
          </h2>
          <p>
            Detaliile exacte de plată vor fi afișate în pagina de{" "}
            <strong>Checkout</strong> și pot include, fără a se limita la:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Plata ramburs la curier (cash sau card, unde este posibil).</li>
            <li>Plata prin transfer bancar (ordin de plată).</li>
            <li>
              Plata online cu cardul (dacă este integrat un procesator de plăți).
            </li>
          </ul>
          <p className="mt-2">
            În cazul plăților online, nu stocăm și nu avem acces la datele tale de
            card. Acestea sunt procesate direct de către procesatorul de plăți
            autorizat.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            7. Livrare și costuri de transport
          </h2>
          <ul className="list-disc list-inside mt-2">
            <li>
              Comenzile sunt livrate prin curier rapid sau pot fi ridicate
              personal (dacă această opțiune este disponibilă).
            </li>
            <li>
              Costul transportului este afișat înainte de finalizarea comenzii,
              în pagina de Checkout.
            </li>
            <li>
              Termenul de livrare estimat este comunicat în confirmarea comenzii,
              putând varia în funcție de adresă, volum sau perioade aglomerate.
            </li>
            <li>
              Proprietatea asupra produselor se transferă la client în momentul
              achitării integrale a contravalorii acestora.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            8. Dreptul de retragere (pentru consumatori)
          </h2>
          <p>
            Dacă ești consumator (persoană fizică), ai dreptul de a te retrage din
            contract, fără a preciza motivele, în termen de 14 zile de la primirea
            produselor, în condițiile prevăzute de OUG 34/2014.
          </p>
          <p className="mt-2">
            Pentru exercitarea dreptului de retragere ne poți contacta la{" "}
            <a
              href="mailto:office@baiadeulei.ro"
              className="text-yellow-400 underline"
            >
              office@baiadeulei.ro
            </a>{" "}
            sau folosind formularul de contact.
          </p>
          <p className="mt-2">
            Produsele trebuie returnate în ambalajul original, neutilizate și
            nedeteriorate (în măsura în care este posibil), împreună cu documentele
            aferente (factură, certificat de garanție, etc.).
          </p>
          <p className="mt-2">
            Ne rezervăm dreptul de a diminua valoarea sumei rambursate în cazul în
            care produsele prezintă urme de uzură, deteriorări sau lipsuri.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            9. Produse exceptate de la retur
          </h2>
          <p>
            Anumite categorii de produse pot fi exceptate de la dreptul de
            retragere, în conformitate cu legislația în vigoare (ex: produse
            desigilate care nu mai pot fi revândute în condiții de igienă sau
            siguranță etc.). Aceste situații vor fi specificate clar în pagina
            produsului sau în confirmarea comenzii.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            10. Garanții și reclamații
          </h2>
          <p>
            Produsele comercializate pot beneficia de garanție conform legislației
            aplicabile și condițiilor specifice ale producătorului.
          </p>
          <p className="mt-2">
            Pentru orice neconformitate, defect sau problemă legată de produsele
            achiziționate, te rugăm să ne contactezi cât mai curând la:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Telefon: (+40) 723 730 664</li>
            <li>Email: office@baiadeulei.ro</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            11. Răspunderea vânzătorului
          </h2>
          <p>
            Nu suntem răspunzători pentru pierderi indirecte, pierderi de profit,
            pierderi comerciale sau alte daune consecutive utilizării produselor,
            în măsura permisă de lege.
          </p>
          <p className="mt-2">
            Nu ne asumăm responsabilitatea pentru eventuale erori de afișare a
            prețurilor sau caracteristicilor produselor, cauzate de probleme
            tehnice sau erori umane, însă vom depune toate eforturile pentru a le
            corecta în cel mai scurt timp.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            12. Protecția datelor personale
          </h2>
          <p>
            Prelucrarea datelor tale personale se face conform{" "}
            <Link
              to="/confidentialitate"
              className="text-yellow-400 underline"
            >
              Politicii de confidențialitate (GDPR)
            </Link>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            13. Legea aplicabilă și soluționarea litigiilor
          </h2>
          <p>
            Prezentul contract este supus legislației române. Orice litigiu apărut
            între noi și client va fi soluționat pe cale amiabilă, iar dacă acest
            lucru nu este posibil, litigiul va fi înaintat instanțelor competente
            din România.
          </p>
          <p className="mt-2">
            Dacă ești consumator, poți apela și la procedurile alternative de
            soluționare a litigiilor (SAL), conform legislației în vigoare.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsConditionsPage;
