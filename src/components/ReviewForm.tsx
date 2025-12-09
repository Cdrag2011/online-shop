import React, { useState } from "react";

interface ReviewsFormProps {
  onSubmit?: (data: { name: string; rating: number; message: string }) => void;
}

const ReviewsForm: React.FC<ReviewsFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !rating || !message) {
      alert("Te rugăm completează toate câmpurile.");
      return;
    }

    const reviewData = { name, rating, message };

    if (onSubmit) onSubmit(reviewData);

    // Reset după trimitere
    setName("");
    setRating(0);
    setMessage("");

    alert("Mulțumim pentru recenzie!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/10 p-6 rounded-2xl backdrop-blur shadow-lg"
    >
      <h2 className="text-2xl font-bold text-white mb-4">
        Lasă o recenzie
      </h2>

      {/* NUME */}
      <label className="block mb-3 text-gray-300">
        Numele tău
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mt-1 bg-slate-800 rounded-xl text-white outline-none"
          placeholder="ex: Andrei Popescu"
        />
      </label>

      {/* RATING */}
      <label className="block mb-3 text-gray-300">
        Evaluare
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full p-3 mt-1 bg-slate-800 rounded-xl text-white outline-none"
        >
          <option value={0}>Selectează...</option>
          <option value={5}>⭐⭐⭐⭐⭐ — Excelent</option>
          <option value={4}>⭐⭐⭐⭐ — Foarte bine</option>
          <option value={3}>⭐⭐⭐ — Bine</option>
          <option value={2}>⭐⭐ — Slab</option>
          <option value={1}>⭐ — Foarte slab</option>
        </select>
      </label>

      {/* MESAJ */}
      <label className="block mb-3 text-gray-300">
        Mesaj
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-28 p-3 mt-1 bg-slate-800 rounded-xl text-white outline-none"
          placeholder="Scrie părerea ta..."
        />
      </label>

      {/* TRIMITERE */}
      <button
        type="submit"
        className="w-full mt-3 px-6 py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition"
      >
        Trimite recenzia
      </button>
    </form>
  );
};

export default ReviewsForm;
