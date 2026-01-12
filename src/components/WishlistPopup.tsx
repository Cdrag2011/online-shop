import { useEffect } from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

type Props = {
  open: boolean;
  onClose: () => void;
};

const WishlistPopup = ({ open, onClose }: Props) => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist() as any;
  const { addToCart } = useCart();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const addAllToCart = () => {
    if (!wishlist?.length) return;
    wishlist.forEach((p: any) => addToCart(p));
    // opțional: golește wishlist după ce le-ai pus în coș
    // clearWishlist?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[999]">
      {/* overlay click-to-close */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* panel */}
      <div className="absolute right-4 top-24 w-[92vw] max-w-md bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white text-xl font-bold">Favorite</h3>
          <button
            onClick={onClose}
            className="text-yellow-400 text-xl hover:scale-110 transition"
            aria-label="Închide"
          >
            ✖
          </button>
        </div>

        {!wishlist?.length ? (
          <p className="text-gray-300">Nu ai produse în wishlist.</p>
        ) : (
          <>
            <div className="max-h-[60vh] overflow-auto space-y-3 pr-1">
              {wishlist.map((p: any) => (
                <div
                  key={p.id}
                  className="bg-white/5 border border-white/10 rounded-xl p-3"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-14 h-14 object-contain bg-white/10 rounded-lg"
                    />

                    <div className="flex-1">
                      <Link
                        to={`/product/${p.id}`}
                        onClick={onClose}
                        className="text-white font-semibold hover:text-yellow-300"
                      >
                        {p.name}
                      </Link>
                      <div className="text-yellow-400 font-bold">{p.price} lei</div>

                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => addToCart(p)}
                          className="px-3 py-1 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
                        >
                          Adaugă în coș
                        </button>

                        <button
                          onClick={() => removeFromWishlist?.(p.id)}
                          className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold"
                        >
                          Șterge
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-2">
              <button
                onClick={addAllToCart}
                className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-2 rounded-xl"
              >
                Adaugă toate în coș
              </button>

              <button
                onClick={() => clearWishlist?.()}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 rounded-xl"
              >
                Golește wishlist
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistPopup;
