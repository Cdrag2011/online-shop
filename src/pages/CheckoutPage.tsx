// src/pages/CheckoutPage.tsx
import { useMemo, useState } from "react";
import { useCart } from "../context/CartContext";

const API =
  (import.meta.env.VITE_API_URL as string) || "http://127.0.0.1:4000";

const isValidEmail = (v: string) => /\S+@\S+\.\S+/.test(v.trim());
const isValidPhone = (v: string) => {
  const cleaned = v.replace(/[^\d+]/g, "");
  return cleaned.length >= 10 && cleaned.length <= 15;
};

const CheckoutPage = () => {
  const { cart, clearCart, total } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const totalNumber = useMemo(() => Number(total) || 0, [total]);

  // ✅ cart compatibil cu backend-ul (fără product nesting)
  const cartForApi = useMemo(
    () =>
      cart.map((i) => ({
        id: i.product.id,
        name: i.product.name,
        price: Number(i.product.price) || 0,
        quantity: Number(i.quantity) || 0,
        image: i.product.image || "",
      })),
    [cart]
  );

  // ✅ mesaj complet pentru WhatsApp/SMS (admin)
  const messageText = useMemo(() => {
    const lines = [
      "Comandă nouă - Neo Tech Shop",
      `Nume: ${name || "-"}`,
      `Email: ${email || "-"}`,
      `Telefon: ${phone || "-"}`,
      "",
      "Produse:",
      ...cartForApi.map((it) => `- ${it.name} x ${it.quantity} = ${it.price * it.quantity} RON`),
      "",
      `TOTAL: ${totalNumber} RON`,
    ];
    return lines.join("\n");
  }, [name, email, phone, cartForApi, totalNumber]);

  const adminPhoneWa = "40723730664";     // fără +
  const adminPhoneSms = "+40739847577";   // cu +

  const openWhatsAppToAdmin = () => {
    const url = `https://wa.me/${adminPhoneWa}?text=${encodeURIComponent(
      messageText
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const openSmsToAdmin = () => {
    const body = encodeURIComponent(messageText);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    const url = isIOS
      ? `sms:${adminPhoneSms}&body=${body}`
      : `sms:${adminPhoneSms}?body=${body}`;

    window.location.href = url;
  };

  const submitOrder = async () => {
    setError("");
    setSuccess("");

    const n = name.trim();
    const e = email.trim();
    const p = phone.trim();

    if (!n || !e || !p) return setError("Completează toate câmpurile (nume, email, telefon).");
    if (!isValidEmail(e)) return setError("Email invalid (ex: nume@domeniu.ro).");
    if (!isValidPhone(p)) return setError("Telefon invalid (ex: 07xx... sau +40...).");
    if (!Array.isArray(cartForApi) || cartForApi.length === 0) return setError("Coșul este gol.");
    if (!Number.isFinite(totalNumber) || totalNumber <= 0) return setError("Total invalid.");

    setLoading(true);

    try {
      console.log("API URL:", API);
      console.log("POST:", `${API}/api/order`);

      const res = await fetch(`${API}/api/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { name: n, email: e, phone: p },
          cart: cartForApi,
          total: totalNumber,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        console.error("❌ ORDER FAIL:", data);
        throw new Error(data?.error || "Eroare server la trimiterea comenzii.");
      }

      setSuccess("Comanda a fost trimisă cu succes! Vei primi confirmare pe email.");
      clearCart();
    } catch (err: any) {
      console.error("❌ Checkout error:", err);
      setError(err?.message || "Failed to fetch / eroare trimitere comandă.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 px-4 max-w-xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">Finalizează comanda</h1>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
        <p className="text-gray-300">
          Total: <span className="text-yellow-400 font-bold">{totalNumber} RON</span>
        </p>
        <p className="text-gray-400 text-sm mt-1">
          Produse în coș: <span className="text-white font-semibold">{cart.length}</span>
        </p>
      </div>

      <input
        className="w-full p-3 mb-3 rounded bg-slate-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        placeholder="Nume complet"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full p-3 mb-3 rounded bg-slate-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full p-3 mb-4 rounded bg-slate-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        placeholder="Telefon"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button
        onClick={submitOrder}
        disabled={loading || cartForApi.length === 0}
        className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold py-3 rounded-xl transition"
      >
        {loading ? "Se trimite..." : "Trimite comanda"}
      </button>

      <button
        type="button"
        onClick={openWhatsAppToAdmin}
        disabled={loading || cartForApi.length === 0}
        className="w-full mt-3 bg-green-600 hover:bg-green-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition"
      >
        Trimite comanda pe WhatsApp (admin)
      </button>

      <button
        type="button"
        onClick={openSmsToAdmin}
        disabled={loading || cartForApi.length === 0}
        className="w-full mt-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition"
      >
        Trimite comanda prin SMS (admin)
      </button>

      {error && (
        <p className="mt-4 text-red-300 bg-red-500/10 border border-red-500/30 rounded-xl p-3">
          ❌ {error}
        </p>
      )}
      {success && (
        <p className="mt-4 text-green-300 bg-green-500/10 border border-green-500/30 rounded-xl p-3">
          ✅ {success}
        </p>
      )}
    </div>
  );
};

export default CheckoutPage;
