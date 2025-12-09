import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/BreadCrumbs";
import { getAllProducts } from "../utils/firestoreProducts";
import type { Product } from "../types/products";

const ProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtre
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const result = await getAllProducts();
        setProducts(result);
      } catch (err) {
        console.error("❌ Firestore error:", err);
      }
      setLoading(false);
    }
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="pt-32 text-center text-gray-300 text-xl">
        Se încarcă produsele...
      </div>
    );
  }

  // Extragem branduri + categorii
  const brands = [...new Set(products.map((p) => p.brand))];
  const categories = [...new Set(products.map((p) => p.category))];

  // Aplicăm filtre
  let filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchBrand = brand ? p.brand === brand : true;
    const matchCategory = category ? p.category === category : true;
    return matchSearch && matchBrand && matchCategory;
  });

  // Sortări
  if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
  if (sort === "alpha-asc") filtered.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "alpha-desc") filtered.sort((a, b) => b.name.localeCompare(a.name));

  return (
    <div className="w-full pt-28 px-6 max-w-7xl mx-auto text-white">
      <Breadcrumbs />

      <h1 className="text-4xl md:text-5xl font-bold mb-6">Gama de produse</h1>

      {/* FILTRE */}
      <div className="grid md:grid-cols-4 gap-4 mb-10">
        <input
          type="text"
          className="p-3 rounded-xl bg-slate-800 text-white"
          placeholder="Caută..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-3 rounded-xl bg-slate-800 text-white"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          <option value="">Brand</option>
          {brands.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>

        <select
          className="p-3 rounded-xl bg-slate-800 text-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Categorie</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          className="p-3 rounded-xl bg-slate-800 text-white"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sortează...</option>
          <option value="price-asc">Preț ↑</option>
          <option value="price-desc">Preț ↓</option>
          <option value="alpha-asc">A-Z</option>
          <option value="alpha-desc">Z-A</option>
        </select>
      </div>

      {/* LISTĂ PRODUSE */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((p) => (
          <Link
            key={p.id}
            to={`/product/${p.id}`}
            className="bg-white/10 p-4 rounded-2xl backdrop-blur hover:scale-[1.03] transition"
          >
            <img
              src={p.image}
              className="h-44 w-full object-contain mb-4"
              alt={p.name}
            />
            <h3 className="text-xl font-bold">{p.name}</h3>
            <p className="text-yellow-400 font-semibold">{p.price} lei</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
