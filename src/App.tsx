// src/App.tsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

// layout
import Nav from "./components/Nav";
import Footer from "./components/Footer";

// pages
import HeroSection from "./components/HeroSection";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PaymentPage from "./pages/PaymentPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import CategoryPage from "./pages/CategoryPage";
import BrandPage from "./pages/BrandPage";
import CookiesPage from "./pages/CookiesPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsConditionsPage from "./pages/TermsConditionsPage";
import DespreNoiPage from "./pages/DespreNoiPage";
import RecenziiPage from "./pages/RecenziiPage";
import LivrareReturPage from "./pages/LivrareReturPage";
import GuaranteePage from "./pages/GuaranteePage";

// wishlist (IMPORT CORECT!)
import WishlistPage from "./pages/WishlistPage";

// cookies
import CookieBanner from "./components/CookieBanner";
import CookieSettings from "./components/CookieSettings";
import CookieFloatingButton from "./components/CookieFloatingButton";

const App: React.FC = () => {
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white">
      <Nav />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HeroSection />} />

          {/* auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* admin */}
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute>
                <AdminOrdersPage />
              </ProtectedRoute>
            }
          />

          {/* shop */}
          <Route path="/produse" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/categorie/:categoryName" element={<CategoryPage />} />
          <Route path="/brand/:slug" element={<BrandPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />

          {/* info */}
          <Route path="/despre" element={<DespreNoiPage />} />
          <Route path="/livrare-retur" element={<LivrareReturPage />} />
          <Route path="/recenzii" element={<RecenziiPage />} />
          <Route path="/garantie" element={<GuaranteePage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* legal */}
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/confidentialitate" element={<PrivacyPolicyPage />} />
          <Route path="/termeni-conditii" element={<TermsConditionsPage />} />

          {/* cart + checkout */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* payments */}
          <Route
            path="/payment/:orderId"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payment-success/:orderId"
            element={
              <ProtectedRoute>
                <PaymentSuccessPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <CookieBanner />
      <Footer />

      <CookieFloatingButton onClick={() => setOpenSettings(true)} />

      <CookieSettings
        open={openSettings}
        onClose={() => setOpenSettings(false)}
      />
    </div>
  );
};

export default App;
