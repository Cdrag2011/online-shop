import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../utils/firestoreProducts";
import type { Product } from "../types/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function load() {
      if (id) {
        const p = await getProductById(id);
        setProduct(p);
      }
    }
    load();
  }, [id]);

  if (!product)
    return (
      <p className="pt-32 text-center text-gray-400">Se încarcă produsul...</p>
    );

  return (
    <div className="pt-32 px-6 max-w-5xl mx-auto text-white">
      <div className="grid md:grid-cols-2 gap-10">
        <img
          src={product.image}
          className="w-full object-contain bg-white/5 p-4 rounded-xl"
        />

        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

          <p className="text-yellow-400 text-2xl font-bold mb-4">
            {product.price} lei
          </p>

          <p className="text-gray-300 mb-6">{product.description}</p>

          <button
            onClick={() => addToCart(product)}
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold text-lg"
          >
            Adaugă în coș
          </button>
          
          <button
            onClick={() => toggleWishlist(product)}
            className="px-6 py-3 rounded-full bg-pink-600 hover:bg-pink-500 text-white font-semibold shadow-lg"
          >
            {isInWishlist(product.id)
              ? "Elimină din favorite"
              : "Adaugă la favorite"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
