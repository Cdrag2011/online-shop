// src/pages/PaymentPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getOrderById, updateOrderStatus } from "../utils/orders";
import type { Order } from "../types/order";

const PaymentPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    async function load() {
      if (!orderId) return;
      const data = await getOrderById(orderId);
      setOrder(data);
      setLoading(false);
    }
    load();
  }, [orderId]);

  const handlePay = async () => {
    if (!orderId) return;
    setProcessing(true);

    // Aici ai integrarea reală cu Stripe / MobilPay / PlatiOnline
    // Deocamdată simulăm o plată reușită.
    await updateOrderStatus(orderId, "paid");
    navigate(`/payment-success/${orderId}`);
  };

  if (loading) {
    return (
      <div className="pt-32 text-center text-white">
        Se încarcă detaliile plății...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="pt-32 text-center text-white">
        <p>Comanda nu a fost găsită.</p>
        <Link to="/produse" className="text-yellow-400 underline">
          ← Înapoi la produse
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 px-6 max-w-3xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">Plată comandă #{order.id}</h1>

      <div className="bg-white/10 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold mb-3">Rezumat comandă</h2>
        {order.items.map((item) => (
          <div
            key={item.productId}
            className="flex justify-between mb-2 text-sm"
          >
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>{item.price * item.quantity} lei</span>
          </div>
        ))}

        <div className="text-right mt-4 text-lg">
          Total:{" "}
          <span className="text-yellow-400 font-bold">
            {order.total.toFixed(2)} lei
          </span>
        </div>
      </div>

      <div className="bg-white/10 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold mb-3">Metodă de plată</h2>
        <p className="text-gray-300 mb-4">
          (Aici vei integra Stripe / PlatiOnline / MobilPay. Momentan
          simulăm o plată online cu card.)
        </p>

        <button
          onClick={handlePay}
          disabled={processing}
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-3 rounded-xl font-bold disabled:opacity-60"
        >
          {processing ? "Se procesează plata..." : "Plătește online"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
