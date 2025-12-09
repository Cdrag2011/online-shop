import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";

const PHONE = "+40723730664";
const WHATSAPP_PHONE = "40723730664";

const ContactPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [cui, setCui] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState("");
  const [sending, setSending] = useState(false);

  const validate = () => {
    const errs: string[] = [];
    if (!name.trim()) errs.push("Numele este obligatoriu.");
    if (!email.trim()) errs.push("Emailul este obligatoriu.");
    if (!message.trim()) errs.push("Mesajul este obligatoriu.");

    const emailRegex = /\S+@\S+\.\S+/;
    if (email && !emailRegex.test(email)) {
      errs.push("Email invalid.");
    }

    setErrors(errs);
    return errs.length === 0;
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setCompany("");
    setCui("");
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setErrors([]);

    if (!validate()) return;

    try {
      setSending(true);
      const res = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          cui,
          message,
          subject: "Mesaj nou de pe pagina de contact",
        }),
      });

      if (!res.ok) {
        throw new Error("Răspuns invalid de la server");
      }

      setSuccess("Mesajul a fost trimis cu succes! Îți vom răspunde în cel mai scurt timp.");
      clearForm();
    } catch (err) {
      setErrors(["A apărut o eroare la trimiterea mesajului. Încearcă din nou sau folosește WhatsApp/telefon."]);
    } finally {
      setSending(false);
    }
  };

  const handleWhatsApp = () => {
    const text = `
Mesaj de pe site - Contact

Nume: ${name || "-"}
Email: ${email || "-"}
Firmă: ${company || "-"}
CUI: ${cui || "-"}
Mesaj:
${message || "-"}
    `.trim();

    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="w-full pt-28 pb-20 px-4 max-w-7xl mx-auto text-white relative">
      {/* TITLU */}
      <h1 className="text-4xl md:text-5xl font-bold drop-shadow mb-4 text-center">
        Contactează-ne
      </h1>

      <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
        Suntem aici pentru orice întrebare legată de gama noastră de produse,
        colaborări sau comenzi. Răspundem rapid telefonic, WhatsApp sau prin email.
      </p>

      {/* GRID CONTACT */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* INFO CONTACT */}
        <div className="space-y-6 text-lg">
          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-yellow-400 text-2xl" />
            <a href={`tel:${PHONE}`} className="hover:text-yellow-400">
              (+40) 723 730 664
            </a>
          </div>

          <div className="flex items-center gap-4">
            <FaWhatsapp className="text-green-500 text-2xl" />
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-400"
            >
              WhatsApp Chat
            </a>
          </div>

          <div className="flex items-center gap-4">
            <FaEnvelope className="text-yellow-300 text-2xl" />
            <a
              href="mailto:office@baiadeulei.ro"
              className="hover:text-yellow-300"
            >
              office@baiadeulei.ro
            </a>
          </div>

          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-red-400 text-2xl" />
            <span>
              Baia Mare, Maramureș, Str. Codrului, Nr. 124, România
            </span>
          </div>

          {/* CALL TO ACTION */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={`tel:${PHONE}`}
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-full transition shadow-lg"
            >
              Sună acum
            </a>
            <button
              type="button"
              onClick={handleWhatsApp}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black px-6 py-3 rounded-full transition shadow-lg"
            >
              <FaWhatsapp />
              Trimite pe WhatsApp
            </button>
          </div>
        </div>

        {/* FORMULAR CONTACT */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-xl space-y-4"
        >
          <h2 className="text-2xl font-semibold mb-2">Trimite un mesaj</h2>

          {/* ERORI */}
          {errors.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/60 text-red-200 p-3 rounded-lg text-sm space-y-1 mb-2 animate-pulse">
              {errors.map((err, idx) => (
                <p key={idx}>• {err}</p>
              ))}
            </div>
          )}

          {/* SUCCES */}
          {success && (
            <div className="bg-green-500/10 border border-green-500/60 text-green-200 p-3 rounded-lg text-sm mb-2 animate-[pulse_1.5s_ease-in-out]">
              {success}
            </div>
          )}

          <input
            type="text"
            placeholder="Nume complet *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="email"
            placeholder="Adresă email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          {/* FIRMA */}
          <input
            type="text"
            placeholder="Denumire firmă (opțional)"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="text"
            placeholder="Cod fiscal (CUI) (opțional)"
            value={cui}
            onChange={(e) => setCui(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <textarea
            placeholder="Mesajul tău *"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          ></textarea>

          {/* BUTON EMAIL */}
          <button
            type="submit"
            disabled={sending}
            className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:opacity-60 disabled:cursor-not-allowed text-black font-semibold py-3 rounded-full transition shadow-lg"
          >
            {sending ? "Trimit..." : "Trimite mesajul"}
          </button>

          {/* BUTON WHATSAPP */}
          <button
            type="button"
            onClick={handleWhatsApp}
            className="w-full flex justify-center items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold py-3 rounded-full transition shadow-lg"
          >
            <FaWhatsapp />
            Trimite pe WhatsApp
          </button>
        </form>
      </div>

      {/* GOOGLE MAP */}
      <div className="w-full h-[350px] mt-8 rounded-2xl overflow-hidden shadow-xl">
        <iframe
          title="map"
          width="100%"
          height="100%"
          loading="lazy"
          style={{ border: 0 }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2719.267347792988!2d23.5816!3d47.6614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47377c03a68a8e89%3A0x0000000000000000!2sBaia%20Mare!5e0!3m2!1sro!2sro!4v000000000"
          allowFullScreen
        ></iframe>
      </div>

      {/* ICON WHATSAPP PLUTITOR */}
      <button
        type="button"
        onClick={handleWhatsApp}
        className="
          fixed bottom-6 right-6 
          flex items-center justify-center
          w-14 h-14 rounded-full
          bg-green-500 hover:bg-green-400
          shadow-2xl
          animate-bounce
          z-50
        "
      >
        <FaWhatsapp className="text-3xl text-black" />
      </button>
    </div>
  );
};

export default ContactPage;
