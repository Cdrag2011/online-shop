// src/pages/WishlistPage.tsx
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="pt-32 px-6 max-w-5xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-6">Produse Favorite</h1>

      {/* Dacă nu sunt produse */}
      {wishlist.length === 0 ? (
        <div className="text-center text-gray-300">
          <p className="mb-4">Nu ai produse adăugate la favorite.</p>
          <Link
            to="/products"
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold"
          >
            Înapoi la Gama de Produse
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white/10 p-4 rounded-xl flex flex-col"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain bg-white/5 rounded-lg mb-4"
              />

              <h3 className="text-xl font-bold">{product.name}</h3>
              <p className="text-yellow-400 text-lg font-semibold mb-4">
                {product.price} lei
              </p>

              <div className="mt-auto flex gap-3">
                {/* Adaugă în coș */}
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black py-2 rounded-xl font-bold"
                >
                  Adaugă în coș
                </button>

                {/* Elimină din favorite */}
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="flex-1 bg-red-600 hover:bg-red-500 py-2 rounded-xl text-white font-bold"
                >
                  Șterge
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Buton de întoarcere */}
      <div className="mt-10 text-center">
        <Link
          to="/products"
          className="text-yellow-400 hover:text-yellow-300 underline text-lg"
        >
          ← Înapoi la Gama de Produse
        </Link>
      </div>
    </div>
  );
};

export default WishlistPage;
