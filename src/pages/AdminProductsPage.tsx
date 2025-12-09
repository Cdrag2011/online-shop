// src/pages/AdminProductsPage.tsx
import React, { useEffect, useState } from "react";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../utils/firestoreProducts";
import type { Product } from "../types/products";

const emptyProduct: Product = {
  id: "",
  name: "",
  brand: "",
  category: "",
  description: "",
  image: "",
  price: 0,
};

const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>({ ...emptyProduct });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Încarcă produsele din Firestore
  async function loadProducts() {
    setLoading(true);
    const data = await getAllProducts();
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  // Handler pentru trimiterea formularului
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.brand || !form.category) {
      alert("Completează toate câmpurile obligatorii!");
      return;
    }

    try {
      if (editingId) {
        await updateProduct(editingId, form);
        alert("✔ Produs actualizat!");
      } else {
        await addProduct(form);
        alert("✔ Produs adăugat!");
      }

      setForm({ ...emptyProduct });
      setEditingId(null);
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("❌ Eroare la salvare!");
    }
  };

  // Preia datele unui produs pentru editare
  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setForm(product);
  };

  // Șterge produs
  const handleDelete = async (id: string) => {
    if (!confirm("Sigur vrei să ștergi acest produs?")) return;

    try {
      await deleteProduct(id);
      alert("✔ Produs șters!");
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("❌ Eroare la ștergere!");
    }
  };

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto text-white">
      <h1 className="text-4xl md:text-5xl font-bold mb-10">
        🛠 Admin – Gestionare Produse
      </h1>

      {/* FORMULAR PRODUS */}
      <div className="bg-gray-800 p-6 rounded-xl mb-10">
        <h2 className="text-2xl font-bold mb-4">
          {editingId ? "✏️ Editează produs" : "➕ Adaugă produs"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="p-3 rounded bg-gray-700"
            placeholder="Nume produs"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="p-3 rounded bg-gray-700"
            placeholder="Brand"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
          />

          <input
            className="p-3 rounded bg-gray-700"
            placeholder="Categorie"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <input
            type="number"
            className="p-3 rounded bg-gray-700"
            placeholder="Preț"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          />

          <input
            className="p-3 rounded bg-gray-700 col-span-1 md:col-span-2"
            placeholder="URL imagine (ex: /products/ulei1.png)"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />

          <textarea
            className="p-3 rounded bg-gray-700 col-span-1 md:col-span-2"
            placeholder="Descriere"
            rows={3}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          {/* PREVIEW IMAGINE */}
          {form.image && (
            <img
              src={form.image}
              alt="preview"
              className="h-40 object-contain bg-gray-900 p-3 rounded col-span-1 md:col-span-2"
            />
          )}

          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-400 text-black py-3 rounded-xl font-bold col-span-1 md:col-span-2"
          >
            {editingId ? "Salvează modificările" : "Adaugă produs"}
          </button>
        </form>
      </div>

      {/* LISTA DE PRODUSE */}
      <h2 className="text-3xl font-bold mb-4">📦 Lista produse</h2>

      {loading ? (
        <p className="text-gray-400">Se încarcă...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-400">Nu există produse.</p>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-gray-800 p-4 rounded-xl text-center shadow-lg"
            >
              <img
                src={p.image}
                className="h-32 w-full object-contain mb-3 bg-gray-900 rounded p-2"
              />

              <h3 className="text-lg font-bold">{p.name}</h3>
              <p className="text-gray-400 text-sm mb-2">
                {p.brand} – {p.category}
              </p>

              <p className="text-yellow-400 font-bold text-xl mb-4">
                {p.price} lei
              </p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => handleEdit(p)}
                  className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-400"
                >
                  Editare
                </button>

                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-4 py-2 rounded bg-red-600 hover:bg-red-500"
                >
                  Ștergere
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
