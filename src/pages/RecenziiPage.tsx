import { useState } from "react";
import FloatingButtons from "../components/FloatingButtons";
import { FaStar } from "react-icons/fa";

const RecenziiPage = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitFeedback = () => {
    if (!rating || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="pt-24 px-6 text-white max-w-5xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-yellow-400">
        Recenzii & Evaluarea experienței pe site
      </h1>

      {!submitted ? (
        <>
          <p className="text-gray-300 mb-6">
            Ajută-ne să îmbunătățim experiența clienților Neo Tech Shop.
            Oferă o recenzie despre utilizarea site-ului și calitatea serviciilor.
          </p>

          {/* RATING */}
          <div className="flex gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((s) => (
              <FaStar
                key={s}
                size={32}
                className={`cursor-pointer transition ${
                  (hover || rating) >= s
                    ? "text-yellow-400"
                    : "text-gray-500"
                }`}
                onMouseEnter={() => setHover(s)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(s)}
              />
            ))}
          </div>

          {/* MESAJ */}
          <textarea
            className="w-full bg-slate-800 p-4 rounded-xl outline-none text-white"
            placeholder="Scrie aici feedback-ul tău..."
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            onClick={submitFeedback}
            className="mt-4 px-6 py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400"
          >
            Trimite recenzia
          </button>
        </>
      ) : (
        <div className="bg-green-700/30 p-6 rounded-xl border border-green-500 text-center">
          <h2 className="text-2xl font-bold text-green-300">Mulțumim!</h2>
          <p className="text-gray-300 mt-2">
            Recenzia ta a fost trimisă și ne ajută să devenim mai buni.
          </p>
        </div>
      )}

      <FloatingButtons />
    </div>
  );
};

export default RecenziiPage;
