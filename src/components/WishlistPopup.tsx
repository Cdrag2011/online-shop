import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";

const WishlistPopup = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { items } = useWishlist();

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="w-80 bg-slate-900 h-full p-5 shadow-xl animate-slideLeft">
        <h2 className="text-xl font-bold text-white mb-4">Favorite</h2>

        <button onClick={onClose} className="text-yellow-400 text-lg">✖</button>

        {items.length === 0 ? (
          <p className="text-gray-400 mt-6">Nu ai produse favorite.</p>
        ) : (
          <ul className="flex flex-col gap-4 mt-4">
            {items.map((p) => (
              <li key={p.id} className="bg-white/10 rounded-lg p-3 flex items-center gap-3">
                <img src={p.image} className="w-14 h-14 object-contain" />
                <div>
                  <p className="text-white text-sm">{p.name}</p>
                  <p className="text-yellow-400 text-sm">{p.price} lei</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        <Link
          to="/wishlist"
          onClick={onClose}
          className="block mt-6 bg-yellow-500 hover:bg-yellow-400 text-black text-center py-2 rounded-lg"
        >
          Vezi toate
        </Link>
      </div>
    </div>
  );
};

export default WishlistPopup;
