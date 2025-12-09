import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt?: string;
}

const UserDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    async function load() {
      setLoading(true);
      const qRef = query(
        collection(db, "orders"),
        where("userId", "==", user?.uid || "")
      );
      const snap = await getDocs(qRef);
      setOrders(
        snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as any),
        }))
      );
      setLoading(false);
    }
    load();
  }, [user]);

  if (!user) {
    return (
      <div className="pt-32 text-center text-white">
        Trebuie să fii autentificat.{" "}
        <Link to="/login" className="text-yellow-400 underline">
          Mergi la login
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 px-6 max-w-5xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">
        Contul meu – {user.email}
      </h1>

      {loading ? (
        <p>Se încarcă comenzile...</p>
      ) : orders.length === 0 ? (
        <p>Nu ai comenzi înregistrate încă.</p>
      ) : (
        <div className="space-y-4 text-sm md:text-base">
          {orders.map((o) => (
            <div
              key={o.id}
              className="bg-slate-800/70 rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">Comandă #{o.id}</p>
                <p>Status: {o.status}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-yellow-400">
                  {o.total} lei
                </p>
                {/* aici poți pune link spre factură PDF dacă o salvezi în orders */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboardPage;
