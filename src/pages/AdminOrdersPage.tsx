// src/pages/AdminOrdersPage.tsx
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

type OrderStatus = "noua" | "in_procesare" | "expediata" | "finalizata" | "anulata";

interface CheckoutCartItem {
  product: {
    id: string;
    name: string;
    price: number;
  };
  quantity: number;
}

interface Order {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  county?: string;
  city?: string;
  street?: string;
  postalCode?: string;
  deliveryMethod?: string;
  paymentMethod?: string;
  wantInvoice?: boolean;
  companyName?: string;
  cui?: string;
  regCom?: string;
  companyAddress?: string;
  cart: CheckoutCartItem[];
  total: number;
  createdAt?: any;
  status?: OrderStatus;
}

const statusLabels: Record<OrderStatus, string> = {
  noua: "Nouă",
  in_procesare: "În procesare",
  expediata: "Expediată",
  finalizata: "Finalizată",
  anulata: "Anulată",
};

const statusColors: Record<OrderStatus, string> = {
  noua: "bg-blue-500/20 text-blue-300",
  in_procesare: "bg-yellow-500/20 text-yellow-300",
  expediata: "bg-indigo-500/20 text-indigo-300",
  finalizata: "bg-emerald-500/20 text-emerald-300",
  anulata: "bg-red-500/20 text-red-300",
};

const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<"" | OrderStatus>("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const data: Order[] = snap.docs.map((d) => {
          const raw = d.data() as any;
          return {
            id: d.id,
            ...raw,
            status: raw.status || "noua",
          };
        });
        setOrders(data);
      } catch (err) {
        console.error("Eroare la încărcarea comenzilor:", err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const filtered = orders.filter((o) => {
    const matchesStatus = statusFilter ? o.status === statusFilter : true;
    const term = search.toLowerCase();
    const matchesSearch =
      !term ||
      o.firstName?.toLowerCase().includes(term) ||
      o.lastName?.toLowerCase().includes(term) ||
      o.email?.toLowerCase().includes(term) ||
      o.id.toLowerCase().includes(term);

    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (order: Order, newStatus: OrderStatus) => {
    try {
      await updateDoc(doc(db, "orders", order.id), { status: newStatus });
      setOrders((prev) =>
        prev.map((o) => (o.id === order.id ? { ...o, status: newStatus } : o))
      );
      if (selectedOrder && selectedOrder.id === order.id) {
        setSelectedOrder({ ...order, status: newStatus });
      }
    } catch (err) {
      console.error("Eroare la actualizarea statusului:", err);
      alert("Nu am putut actualiza statusul. Vezi consola.");
    }
  };

  return (
    <div className="pt-28 pb-10 px-4 md:px-6 max-w-7xl mx-auto text-white">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        Panou Admin — Comenzi
      </h1>
      <p className="text-gray-300 mb-6">
        Vezi comenzile plasate, filtrează după status și actualizează starea
        lor. Datele vin direct din <span className="font-semibold">Firestore</span>.
      </p>

      {/* Filtre */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Caută după nume, email sau ID comandă..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 rounded-xl bg-slate-800 text-white outline-none"
        />
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as "" | OrderStatus)
          }
          className="p-3 rounded-xl bg-slate-800 text-white outline-none"
        >
          <option value="">Toate statusurile</option>
          <option value="noua">Nouă</option>
          <option value="in_procesare">În procesare</option>
          <option value="expediata">Expediată</option>
          <option value="finalizata">Finalizată</option>
          <option value="anulata">Anulată</option>
        </select>
      </div>

      {/* LISTĂ COMENZI */}
      <div className="grid md:grid-cols-2 gap-4">
        {loading ? (
          <p className="text-gray-300">Se încarcă comenzile...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-300">Nu există comenzi pentru filtrul curent.</p>
        ) : (
          filtered.map((order) => (
            <button
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className="text-left bg-slate-800/70 hover:bg-slate-700 transition border border-slate-700/60 rounded-2xl p-4 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-gray-400">
                  #{order.id.slice(0, 8)}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    statusColors[order.status || "noua"]
                  }`}
                >
                  {statusLabels[order.status || "noua"]}
                </span>
              </div>
              <div>
                <p className="font-semibold">
                  {order.firstName} {order.lastName}
                </p>
                <p className="text-xs text-gray-400">{order.email}</p>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-300">
                  {order.city}, {order.county}
                </span>
                <span className="font-bold text-yellow-400">
                  {order.total.toFixed(2)} lei
                </span>
              </div>
            </button>
          ))
        )}
      </div>

      {/* PANEL DETALII COMANDĂ */}
      {selectedOrder && (
        <div className="mt-8 bg-slate-900/80 border border-slate-700 rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">
                Comanda #{selectedOrder.id.slice(0, 8)}
              </h2>
              <p className="text-sm text-gray-400">
                Client: {selectedOrder.firstName} {selectedOrder.lastName} ·{" "}
                {selectedOrder.email} · {selectedOrder.phone}
              </p>
            </div>
            <button
              onClick={() => setSelectedOrder(null)}
              className="text-sm text-gray-400 hover:text-yellow-300"
            >
              Închide ✖
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-4 text-sm">
            <div className="space-y-1">
              <h3 className="font-semibold text-gray-200">Adresă livrare</h3>
              <p className="text-gray-300">
                {selectedOrder.street} <br />
                {selectedOrder.city}, {selectedOrder.county}{" "}
                {selectedOrder.postalCode && `(${selectedOrder.postalCode})`}
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-gray-200">Livrare & plată</h3>
              <p className="text-gray-300">
                Livrare:{" "}
                {selectedOrder.deliveryMethod === "ridicare"
                  ? "Ridicare din depozit"
                  : "Curier rapid"}
                <br />
                Plată:{" "}
                {selectedOrder.paymentMethod === "transfer"
                  ? "Transfer bancar"
                  : "Ramburs"}
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-gray-200">Status comandă</h3>
              <select
                value={selectedOrder.status || "noua"}
                onChange={(e) =>
                  handleStatusChange(
                    selectedOrder,
                    e.target.value as OrderStatus
                  )
                }
                className="w-full p-2 rounded-xl bg-slate-800 text-white text-sm"
              >
                <option value="noua">Nouă</option>
                <option value="in_procesare">În procesare</option>
                <option value="expediata">Expediată</option>
                <option value="finalizata">Finalizată</option>
                <option value="anulata">Anulată</option>
              </select>
            </div>
          </div>

          {/* Produse */}
          <h3 className="font-semibold mb-2">Produse comandate</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-slate-700 rounded-xl overflow-hidden">
              <thead className="bg-slate-800/80">
                <tr>
                  <th className="px-3 py-2 text-left">Produs</th>
                  <th className="px-3 py-2 text-center">Cant.</th>
                  <th className="px-3 py-2 text-right">Preț</th>
                  <th className="px-3 py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.cart.map((item) => (
                  <tr key={item.product.id} className="border-t border-slate-700">
                    <td className="px-3 py-2">{item.product.name}</td>
                    <td className="px-3 py-2 text-center">
                      {item.quantity}
                    </td>
                    <td className="px-3 py-2 text-right">
                      {item.product.price.toFixed(2)} lei
                    </td>
                    <td className="px-3 py-2 text-right">
                      {(item.product.price * item.quantity).toFixed(2)} lei
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-end items-center gap-4">
            <span className="text-sm text-gray-400">
              Total comandă:
            </span>
            <span className="text-2xl font-bold text-yellow-400">
              {selectedOrder.total.toFixed(2)} lei
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
