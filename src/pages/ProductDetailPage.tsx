// src/pages/ProductDetailPage.tsx
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import { getAllProducts } from "../utils/firestoreProducts";
import type { Product } from "../types/products";
import { img } from "../utils/img";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    async function load() {
      const all = await getAllProducts();
      const found = all.find((p) => p.id === id);
      setProduct(found || null);
    }
    load();
  }, [id]);

  const inWish = useMemo(() => (product ? isInWishlist(product.id) : false), [product, isInWishlist]);

  if (!product) {
    return <div className="pt-32 text-center text-gray-300">Produs inexistent</div>;
  }

  return (
    <div className="pt-28 max-w-6xl mx-auto px-6 text-white">
      <Breadcrumbs />

      <div className="grid md:grid-cols-2 gap-10 mt-6">
        <img
          src={img(product.image)}
          className="w-full max-h-[400px] object-contain bg-white/10 p-6 rounded-2xl"
          alt={product.name}
        />

        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-300 mb-4">{product.description}</p>
          <p className="text-yellow-400 text-3xl font-bold mb-6">{product.price} lei</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => addToCart(product)}
              className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-500 transition"
            >
              Adaugă în coș
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className={`px-6 py-3 rounded-xl font-semibold transition ${
                inWish ? "bg-red-600 hover:bg-red-500" : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {inWish ? "❤️ În wishlist" : "🤍 Adaugă în wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
