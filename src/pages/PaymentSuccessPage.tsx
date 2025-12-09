// src/pages/PaymentSuccessPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrderById } from "../utils/orders";
import type { Order } from "../types/order";
import { generateInvoice } from "../utils/invoice";
import { sendOrderEmails } from "../utils/email";
import { useCart } from "../context/CartContext";

const PaymentSuccessPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [sendingEmail, setSendingEmail] = useState(false);
  const { clearCart } = useCart();

  useEffect(() => {
    async function load() {
      if (!orderId) return;
      const data = await getOrderById(orderId);
      setOrder(data);
      // golim coșul după plată
      clearCart();
    }
    load();
  }, [orderId, clearCart]);

  const handleInvoice = () => {
    if (!order) return;
    generateInvoice(order);
  };

  const handleEmail = async () => {
    if (!order) return;
    setSendingEmail(true);
    await sendOrderEmails(order);
    setSendingEmail(false);
    alert("Email-ul a fost trimis (dacă totul e configurat corect în EmailJS).");
  };

  if (!order) {
    return (
      <div className="pt-32 px-6 text-center text-white">
        <p>Se încarcă detaliile comenzii...</p>
      </div>
    );
  }

  return (
    <div className="pt-32 px-6 max-w-3xl mx-auto text-white text-center">
      <h1 className="text-4xl font-bold mb-4">Plată reușită!</h1>
      <p className="mb-2">
        Comanda ta a fost înregistrată cu succes. ID comandă:{" "}
        <span className="text-yellow-400 font-mono">{order.id}</span>
      </p>

      <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
        <button
          onClick={handleInvoice}
          className="bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-2 rounded-xl font-bold"
        >
          Descarcă factura PDF
        </button>

        <button
          onClick={handleEmail}
          disabled={sendingEmail}
          className="bg-blue-500 hover:bg-blue-400 text-white px-5 py-2 rounded-xl font-bold disabled:opacity-60"
        >
          {sendingEmail ? "Se trimite email..." : "Trimite detalii pe email"}
        </button>
      </div>

      <div className="mt-8">
        <Link to="/produse" className="text-yellow-400 underline">
          ← Înapoi la produse
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
