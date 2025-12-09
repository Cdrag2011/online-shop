import React, { useState, useEffect } from "react";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

interface SiteReview {
  id?: string;
  name: string;
  rating: number;
  message: string;
  createdAt?: any;
}

const ReviewsPage: React.FC = () => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [reviews, setReviews] = useState<SiteReview[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "siteReviews"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const data: SiteReview[] = snap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<SiteReview, "id">),
      }));
      setReviews(data);
    });

    return () => unsub();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;

    setSending(true);
    try {
      await addDoc(collection(db, "siteReviews"), {
        name: name || "Client Neo Tech",
        rating,
        message,
        createdAt: new Date(),
      });
      setMessage("");
      setRating(5);
      setName("");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="pt-28 px-6 max-w-6xl mx-auto text-white pb-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow">
        Recenzii & Experiență de navigare
      </h1>
      <p className="text-gray-300 mb-8 max-w-2xl">
        Spune-ne cum ți s-a părut experiența ta pe site: ușurința navigării,
        claritatea informațiilor, timpul de răspuns și calitatea serviciilor.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        {/* FORMULAR RECENZIE */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 p-6 rounded-2xl shadow-xl space-y-4"
        >
          <h2 className="text-2xl font-bold mb-2">Lasă o recenzie</h2>

          <input
            type="text"
            placeholder="Nume (opțional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/15 text-white focus:outline-none"
          />

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Evaluare generală
            </label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full p-3 rounded-lg bg-white/15 text-white focus:outline-none"
            >
              <option value={5}>⭐⭐⭐⭐⭐ - Excelent</option>
              <option value={4}>⭐⭐⭐⭐ - Foarte bine</option>
              <option value={3}>⭐⭐⭐ - Acceptabil</option>
              <option value={2}>⭐⭐ - Slab</option>
              <option value={1}>⭐ - Foarte slab</option>
            </select>
          </div>

          <textarea
            placeholder="Descrie pe scurt experiența ta pe site..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            required
            className="w-full p-3 rounded-lg bg-white/15 text-white focus:outline-none"
          />

          <button
            type="submit"
            disabled={sending}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black 
                       font-bold py-3 rounded-full disabled:opacity-60"
          >
            {sending ? "Se trimite..." : "Trimite recenzia"}
          </button>
        </form>

        {/* LISTĂ RECENZII */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-2">Ce spun clienții</h2>

          {reviews.length === 0 && (
            <p className="text-gray-400 text-sm">
              Încă nu există recenzii. Fii primul care își spune părerea!
            </p>
          )}

          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-white/5 p-4 rounded-2xl border border-white/10"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">
                  {r.name || "Client Neo Tech"}
                </span>
                <span className="text-yellow-400">
                  {"★".repeat(r.rating)}{" "}
                  <span className="text-gray-500 text-xs">
                    ({r.rating}/5)
                  </span>
                </span>
              </div>
              <p className="text-gray-200 text-sm">{r.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
