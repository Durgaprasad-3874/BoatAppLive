import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";
import { Toast } from "./components/common/Toast";
import { CartWishlistDrawers } from "./components/common/CartWishlistDrawers";
import { GlobalPageLoader } from "./components/common/SkeletonLoader";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductDetails } from "./pages/ProductDetails";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";

function AppContent() {
  const { isLoading } = useApp();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0c0e] text-neutral-900 dark:text-neutral-100 flex flex-col font-sans selection:bg-[#ff0000] selection:text-white">
      {isLoading && <GlobalPageLoader />}
      <Navbar />
      <main className="flex-1">
        <div key={location.pathname} className="page-transition">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </main>
      <Footer />
      <CartWishlistDrawers />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}
