import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import Breadcrumbs from "../components/BreadCrumbs";

const UserOrdersPage: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      const q = query(
        collection(db, "orders"),
        where("userEmail", "==", user.email),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setOrders(list);
    };

    load();
  }, [user]);

  if (!user) {
    return (
      <div className="pt-40 text-center text-white">
        Trebuie să fii autentificat pentru a vedea comenzile.
      </div>
    );
  }

  return (
    <div className="pt-28 px-6 max-w-5xl mx-auto text-white">
      <Breadcrumbs />

      <h1 className="text-3xl font-bold mb-6">Comenzile mele</h1>

      {orders.length === 0 ? (
        <p className="text-gray-300">
          Nu ai încă nicio comandă înregistrată.
        </p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white/10 p-4 rounded-2xl mb-4 border border-white/10"
          >
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="text-sm text-gray-300">
                  ID comandă:{" "}
                  <span className="font-mono text-yellow-400">
                    {order.id}
                  </span>
                </p>
                <p className="text-sm text-gray-400">
                  Status: {order.status}
                </p>
              </div>
              <div className="text-right">
                <p className="text-yellow-400 font-bold text-lg">
                  {order.grandTotal} lei
                </p>
              </div>
            </div>

            <div className="text-sm text-gray-300 mb-2">
              {order.items?.map((item: any) => (
                <div key={item.id}>
                  {item.name} x {item.quantity} ={" "}
                  {item.price * item.quantity} lei
                </div>
              ))}
            </div>

            <a
              href={`http://localhost:4000/invoices/invoice-${order.id}.pdf`}
              target="_blank"
              className="text-sm text-blue-400 hover:underline"
            >
              Descarcă factura
            </a>
          </div>
        ))
      )}
    </div>
  );
};

export default UserOrdersPage;
