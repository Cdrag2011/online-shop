// src/pages/CartPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import FloatingButtons from "../components/FloatingButtons";

const CartPage: React.FC = () => {
  const { cart, total, removeFromCart, updateQuantity, clearCart } = useCart();

  return (
    <div className="pt-32 px-6 text-white max-w-4xl mx-auto">

      <h1 className="text-4xl font-bold mb-6">Coșul tău</h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-300">
          <p className="mb-4">Coșul este gol.</p>

          <Link
            to="/produse"
            className="bg-yellow-500 hover:bg-yellow-400 
            text-black px-6 py-3 rounded-xl font-bold inline-block"
          >
            Înapoi la Gama de Produse
          </Link>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="bg-white/10 p-4 rounded-xl mb-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{item.product.name}</h3>
                <p className="text-yellow-400">{item.product.price} lei</p>
              </div>

              <div className="flex gap-4 items-center">
                {/* Scade cantitatea */}
                <button
                  onClick={() =>
                    updateQuantity(item.product.id, item.quantity - 1)
                  }
                  className="px-3 py-1 bg-gray-700 rounded-xl"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                {/* Crește cantitatea */}
                <button
                  onClick={() =>
                    updateQuantity(item.product.id, item.quantity + 1)
                  }
                  className="px-3 py-1 bg-gray-700 rounded-xl"
                >
                  +
                </button>

                {/* Șterge produs */}
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  Șterge
                </button>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">
              Total: <span className="text-yellow-400">{total} lei</span>
            </h2>

            <Link
              to="/checkout"
              className="inline-block bg-yellow-500 hover:bg-yellow-400 
              text-black py-3 px-6 rounded-xl font-bold"
            >
              Finalizează Comanda
            </Link>

            {/* BUTON de Golire totală */}
            <button
              onClick={clearCart}
              className="ml-4 bg-red-600 hover:bg-red-500 py-3 px-6 rounded-xl font-bold"
            >
              Golește Coșul
            </button>
          </div>
        </>
      )}

      {/* Butoane flotante */}
      <FloatingButtons />
    </div>
  );
};

export default CartPage;
