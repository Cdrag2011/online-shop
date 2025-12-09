import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase.ts";

const WarrantyPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orderId, setOrderId] = useState("");
  const [productName, setProductName] = useState("");
  const [issue, setIssue] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      let photoUrl = "";

      if (file) {
        const storageRef = ref(
          storage,
          `warranty-photos/${Date.now()}-${file.name}`
        );
        const snap = await uploadBytes(storageRef, file);
        photoUrl = await getDownloadURL(snap.ref);
      }

      await addDoc(collection(db, "warrantyClaims"), {
        name,
        email,
        phone,
        orderId,
        productName,
        issue,
        photoUrl,
        status: "nouă",
        createdAt: serverTimestamp(),
      });

      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setOrderId("");
      setProductName("");
      setIssue("");
      setFile(null);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="pt-28 px-6 max-w-6xl mx-auto text-white pb-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow">
        Garanție produse
      </h1>

      <p className="text-gray-300 mb-8 max-w-3xl">
        Produsele comercializate prin Neo Tech Shop beneficiază de garanție
        conform legislației în vigoare și specificațiilor producătorilor.
        Folosește formularul de mai jos pentru a deschide un dosar de garanție.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        {/* INFO GARANȚIE */}
        <section className="bg-white/5 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-3">Condiții generale</h2>
          <ul className="list-disc ml-6 text-gray-300 text-sm space-y-1">
            <li>Garanția este valabilă doar în baza facturii fiscale.</li>
            <li>Defectele cauzate de montaj necorespunzător sau de utilizare 
                improprie nu fac obiectul garanției.</li>
            <li>
              Termenul de soluționare este de până la 15 zile lucrătoare de la
              primirea produsului în service.
            </li>
          </ul>
        </section>

        {/* FORMULAR GARANȚIE */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 p-6 rounded-2xl shadow-xl space-y-4"
        >
          <h2 className="text-2xl font-bold mb-2">Formular de garanție</h2>

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
            type="tel"
            placeholder="Telefon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/15 text-white focus:outline-none"
          />

          <input
            type="text"
            placeholder="Număr comandă (ex: #NT-1234)"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-white/15 text-white focus:outline-none"
          />

          <input
            type="text"
            placeholder="Denumire produs"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-white/15 text-white focus:outline-none"
          />

          <textarea
            placeholder="Descrie problema (simptome, când apare, etc.)"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            rows={4}
            required
            className="w-full p-3 rounded-lg bg-white/15 text-white focus:outline-none"
          />

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Poză / dovadă (opțional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-sm text-gray-300"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black
                       font-bold py-3 rounded-full disabled:opacity-60"
          >
            {status === "loading" ? "Se trimite..." : "Trimite cererea de garanție"}
          </button>

          {status === "success" && (
            <p className="text-green-400 text-xs mt-2">
              Cererea a fost trimisă. Vei primi un număr de dosar pe email.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-xs mt-2">
              A apărut o eroare. Te rugăm să încerci din nou sau să ne contactezi.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default WarrantyPage;
