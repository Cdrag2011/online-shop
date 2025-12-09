import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";


const DeliveryReturnPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [reason, setReason] = useState("");
  const [iban, setIban] = useState("");
  const [type, setType] = useState<"return" | "exchange">("return");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await addDoc(collection(db, "returns"), {
        name,
        email,
        orderId,
        reason,
        iban,
        type,
        createdAt: serverTimestamp(),
      });

      setStatus("success");
      setName("");
      setEmail("");
      setOrderId("");
      setReason("");
      setIban("");
      setType("return");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="pt-28 px-6 max-w-6xl mx-auto text-white pb-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow">
        Livrare & Retur
      </h1>

      {/* INFO LIVRARE */}
      <section className="mb-10 bg-white/5 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-3">Livrare</h2>
        <p className="text-gray-300 mb-2">
          Livrarea se face prin curier rapid în toată România, în 24–72 ore
          lucrătoare, în funcție de localitate și de disponibilitatea produselor.
        </p>
        <ul className="list-disc ml-6 text-gray-300 text-sm space-y-1">
          <li>Cost livrare standard: 25 lei (gratuit peste 750 lei / comandă)</li>
          <li>Ridicare din sediu: gratuită (Baia Mare, Str. Codrului nr. 124)</li>
          <li>Program livrări: Luni–Vineri, 09:00–17:00</li>
        </ul>
      </section>

      {/* INFO RETUR */}
      <section className="mb-10 bg-white/5 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-3">Politica de retur</h2>
        <p className="text-gray-300 mb-2">
          Produsele pot fi returnate în termen de 14 zile calendaristice de la
          primire, dacă sunt în ambalajul original, nefolosite și însoțite de
          documentele de achiziție (factură / bon fiscal).
        </p>
        <ul className="list-disc ml-6 text-gray-300 text-sm space-y-1">
          <li>
            Costul transportului pentru retur este suportat de client, cu excepția
            situațiilor în care produsul este livrat greșit sau este neconform.
          </li>
          <li>
            Rambursarea banilor se face în maximum 14 zile lucrătoare de la
            recepționarea și verificarea produselor.
          </li>
        </ul>
      </section>

      {/* FORMULAR RETUR */}
      <section className="bg-white/10 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Formular de retur</h2>
        <p className="text-gray-300 mb-6 text-sm">
          Completează formularul de mai jos pentru a iniția un retur sau un schimb
          de produse. Vei primi confirmare pe email după procesare.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nume complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-white/15 text-white focus:outline-none"
            />
            <input
              type="email"
              placeholder="Adresă email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-white/15 text-white focus:outline-none"
            />
          </div>

          <input
            type="text"
            placeholder="Număr comandă (ex: #NT-1234)"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-white/15 text-white focus:outline-none"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <select
              value={type}
              onChange={(e) => setType(e.target.value as "return" | "exchange")}
              className="w-full p-3 rounded-lg bg-white/15 text-white focus:outline-none"
            >
              <option value="return">Retur bani</option>
              <option value="exchange">Schimb cu alt produs</option>
            </select>

            <input
              type="text"
              placeholder="IBAN pentru rambursare (dacă este retur bani)"
              value={iban}
              onChange={(e) => setIban(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/15 text-white focus:outline-none"
            />
          </div>

          <textarea
            placeholder="Motivul returului / detalii suplimentare"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            required
            className="w-full p-3 rounded-lg bg-white/15 text-white focus:outline-none"
          />

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-yellow-500 hover:bg-yellow-400 disabled:opacity-60
                         text-black font-bold px-6 py-3 rounded-full"
            >
              {status === "loading" ? "Se trimite..." : "Trimite cererea de retur"}
            </button>
          </div>

          {status === "success" && (
            <p className="text-green-400 text-sm mt-2">
              Cererea ta a fost trimisă. Vei fi contactat pe email în cel mai scurt timp.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-sm mt-2">
              A apărut o eroare la trimitere. Te rugăm să încerci din nou sau să ne contactezi telefonic.
            </p>
          )}
        </form>
      </section>
    </div>
  );
};

export default DeliveryReturnPage;
