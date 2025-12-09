import { collection, setDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { products } from "../data/products";

export async function migrateProductsToFirestore() {
  try {
    const ref = collection(db, "products");
    const snap = await getDocs(ref);

    if (!snap.empty) {
      console.log("✔ Produsele există deja. Migrarea a fost omisă.");
      return;
    }

    for (const p of products) {
      await setDoc(doc(ref, p.id), p);
    }

    console.log("✔ Produsele au fost migrate!");
    alert("✔ Produsele au fost migrate în Firestore!");
  } catch (err) {
    console.error("❌ MIGRATION ERROR:", err);
    alert("❌ Eroare migrare. Verifică consola.");
  }
}
