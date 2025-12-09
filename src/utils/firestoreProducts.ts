// src/utils/firestoreProducts.ts
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import type { Product } from "../types/products";

const COLLECTION_NAME = "products";

// 🔹 Ia toate produsele
export async function getAllProducts(): Promise<Product[]> {
  const snap = await getDocs(collection(db, COLLECTION_NAME));
  return snap.docs.map((d) => d.data() as Product);
}

// 🔹 Ia un singur produs după ID
export async function getProductById(id: string): Promise<Product | null> {
  const ref = doc(db, COLLECTION_NAME, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data() as Product;
}

// 🔹 Adaugă (sau suprascrie) un produs
export async function addProduct(product: Product): Promise<void> {
  const ref = doc(db, COLLECTION_NAME, product.id);
  await setDoc(ref, product);
}

// 🔹 Actualizează câmpuri la un produs
export async function updateProduct(id: string, data: Partial<Product>) {
  const ref = doc(db, "products", id);
  await updateDoc(ref, data as any);
}
// 🔹 ȘTERGE produsul (FUNCȚIA CARE LIPSEA!)
export async function deleteProduct(id: string): Promise<void> {
  const ref = doc(db, COLLECTION_NAME, id);
  await deleteDoc(ref);
}
