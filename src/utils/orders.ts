// src/utils/orders.ts
import { addDoc, collection, doc, getDoc, getDocs, query, where, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import type { Order, OrderStatus } from "../types/order";

const ordersCol = collection(db, "orders");

// Creează o comandă nouă
export async function createOrder(data: Omit<Order, "id" | "createdAt" | "status">): Promise<string> {
  const docRef = await addDoc(ordersCol, {
    ...data,
    createdAt: new Date().toISOString(),
    status: "pending" as OrderStatus,
  });

  return docRef.id;
}

// Ia o comandă după ID
export async function getOrderById(id: string): Promise<Order | null> {
  const ref = doc(db, "orders", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;

  return { id: snap.id, ...(snap.data() as Omit<Order, "id">) };
}

// Comenzi pentru un user
export async function getOrdersForUser(userId: string) {
  const q = query(ordersCol, where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map(
    (d) => ({ id: d.id, ...(d.data() as Omit<Order, "id">) }) as Order
  );
}

// Update status (ex: la plată reușită)
export async function updateOrderStatus(id: string, status: OrderStatus) {
  const ref = doc(db, "orders", id);
  await updateDoc(ref, { status });
}
