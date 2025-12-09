// src/components/Nav.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import WishlistPopup from "./WishlistPopup";

const logo = "/logos/neo-tech-logo6.png";

const Nav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const { cart } = useCart();
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const { wishlist } = useWishlist();

  const { user, logout, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-gray-900/90 shadow-lg backdrop-blur-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} className="h-16" />
            <span className="text-white font-bold text-xl">Neo Tech Shop</span>
          </Link>

          {/* MENIU DESKTOP */}
          <ul className="hidden md:flex space-x-8 text-white text-lg items-center">
            <li><Link to="/">Acasă</Link></li>
            <li><Link to="/produse">Produse</Link></li>
            <li><Link to="/contact">Contact</Link></li>

            {/* ADMIN */}
            {isAdmin && (
              <li>
                <Link to="/admin/orders" className="text-yellow-400 font-bold">
                  Admin
                </Link>
              </li>
            )}

            {/* USER AUTH */}
            {!user ? (
              <li>
                <Link
                  to="/login"
                  className="bg-yellow-500 text-black px-4 py-1 rounded-xl font-bold"
                >
                  Login
                </Link>
              </li>
            ) : (
              <li className="flex items-center gap-3">
                <span className="text-gray-300 text-sm">{user.email}</span>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-xl"
                >
                  Logout
                </button>
              </li>
            )}

            {/* FAVORITE */}
            <li>
              <button
                onClick={() => setWishlistOpen(true)}
                className="relative text-white text-3xl"
              >
                ❤️
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-pink-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </button>
            </li>

            {/* COȘ */}
            <li>
              <Link to="/cart" className="relative text-white text-3xl">
                🛒
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>

          {/* MENIU MOBILE */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-yellow-400 text-3xl"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* MOBILE MENU SIDEBAR */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setMobileOpen(false)}
          />

          <div className="fixed top-0 right-0 w-64 h-full bg-gray-900 z-50 p-6 space-y-6 text-white shadow-xl animate-slideLeft">

            <button
              onClick={() => setMobileOpen(false)}
              className="text-2xl text-yellow-400 mb-4"
            >
              ✖
            </button>

            <Link to="/" onClick={() => setMobileOpen(false)}>Acasă</Link>
            <Link to="/produse" onClick={() => setMobileOpen(false)}>Produse</Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>

            {isAdmin && (
              <Link
                to="/admin/orders"
                className="text-yellow-400 font-bold"
                onClick={() => setMobileOpen(false)}
              >
                Admin
              </Link>
            )}

            {!user ? (
              <Link
                to="/login"
                className="bg-yellow-500 text-black px-4 py-2 rounded-xl font-bold inline-block"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="bg-red-600 px-4 py-2 rounded-xl"
              >
                Logout
              </button>
            )}

            <Link to="/cart" onClick={() => setMobileOpen(false)}>
              Coș ({cartCount})
            </Link>
            <Link to="/wishlist" onClick={() => setMobileOpen(false)}>
              Favorite ({wishlist.length})
            </Link>
          </div>
        </>
      )}

      {/* POPUP FAVORITE */}
      <WishlistPopup open={wishlistOpen} onClose={() => setWishlistOpen(false)} />
    </>
  );
};

export default Nav;
