// src/pages/WishlistPage.tsx
import { Link, useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { img } from "../utils/img";

const WishlistPage = () => {
  const navigate = useNavigate();

  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const addAllToCartAndGoCheckout = () => {
    wishlist.forEach((p) => addToCart(p));
    navigate("/checkout"); // dacă la tine ruta e alta, zi-mi și o schimb
  };

  const addAllToCart = () => {
    wishlist.forEach((p) => addToCart(p));
  };

  return (
    <div className="pt-32 px-6 max-w-5xl mx-auto text-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-4xl font-bold">Produse Favorite</h1>

        {wishlist.length > 0 && (
          <div className="flex flex-wrap gap-3">
            <button
              onClick={addAllToCart}
              className="bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-2 rounded-xl font-semibold transition"
            >
              Adaugă toate în coș
            </button>

            <button
              onClick={addAllToCartAndGoCheckout}
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-2 rounded-xl font-bold transition"
            >
              Trimite la checkout
            </button>
          </div>
        )}
      </div>

      {/* Dacă nu sunt produse */}
      {wishlist.length === 0 ? (
        <div className="text-center text-gray-300 bg-white/5 border border-white/10 rounded-2xl p-8">
          <p className="mb-4">Nu ai produse adăugate la favorite.</p>
          <Link
            to="/produse"
            className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold"
          >
            Înapoi la Gama de Produse
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col"
            >
              <img
                src={img(product.image)}
                alt={product.name}
                className="w-full h-48 object-contain bg-white/5 rounded-xl mb-4"
              />

              <h3 className="text-xl font-bold">{product.name}</h3>
              <p className="text-yellow-400 text-lg font-semibold mb-4">
                {product.price} lei
              </p>

              <div className="mt-auto flex flex-wrap gap-3">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black py-2 rounded-xl font-bold transition"
                >
                  Adaugă în coș
                </button>

                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="flex-1 bg-red-600 hover:bg-red-500 py-2 rounded-xl text-white font-bold transition"
                >
                  Șterge
                </button>

                <Link
                  to={`/product/${product.id}`}
                  className="w-full text-center bg-white/10 hover:bg-white/20 border border-white/10 py-2 rounded-xl font-semibold transition"
                >
                  Vezi produsul
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Navigare jos */}
      <div className="mt-10 text-center space-x-4">
        <Link
          to="/produse"
          className="text-yellow-400 hover:text-yellow-300 underline text-lg"
        >
          ← Înapoi la Gama de Produse
        </Link>

        <Link
          to="/cart"
          className="text-yellow-400 hover:text-yellow-300 underline text-lg"
        >
          Mergi la coș →
        </Link>
      </div>
    </div>
  );
};

export default WishlistPage;
