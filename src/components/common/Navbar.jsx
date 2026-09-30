import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { ShoppingBag, Heart, Sun, Moon, Search, Menu, X, User, LogOut, Flame } from "lucide-react";
import { PRODUCTS } from "../../data/products";

export const Navbar = () => {
  const { darkMode, setDarkMode, cart, wishlist, user, logoutUser, setIsCartOpen, setIsWishlistOpen, triggerLoader } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDropdown, setSearchDropdown] = useState(false);
  const navigate = useNavigate();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    triggerLoader(400);
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/95 dark:bg-[#0b0c0e]/95 border-b border-neutral-200 dark:border-[#252932] transition-colors">
      {/* Top Banner */}
      <div className="bg-[#14161a] text-white py-1.5 px-4 text-[11px] font-bold text-center tracking-wider flex items-center justify-center gap-2 border-b border-[#252932]">
        <Flame className="w-3.5 h-3.5 text-[#ff0000] fill-[#ff0000]" />
        <span>FESTIVE SALE LIVE: GET EXTRA 15% OFF WITH CODE: <span className="text-[#ff0000] font-black">BOAT15</span> | FREE DELIVERY</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* boAt Signature Logo */}
        <Link to="/" onClick={() => triggerLoader(300)} className="flex items-center gap-1 shrink-0">
          <div className="flex items-center">
            <span className="text-3xl font-black tracking-tighter text-black dark:text-white uppercase font-sans">
              bo<span className="text-[#ff0000]">A</span>t
            </span>
            <div className="w-2 h-2 rounded-full bg-[#ff0000] ml-0.5 mt-2"></div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-extrabold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
          <Link to="/" onClick={() => triggerLoader(300)} className="hover:text-[#ff0000] transition-colors">Home</Link>
          <Link to="/products" onClick={() => triggerLoader(300)} className="hover:text-[#ff0000] transition-colors">Categories</Link>
          <Link to="/products" onClick={() => triggerLoader(300)} className="hover:text-[#ff0000] transition-colors">Daily Deals</Link>
          <Link to="/about" onClick={() => triggerLoader(300)} className="hover:text-[#ff0000] transition-colors">About Us</Link>
          <Link to="/contact" onClick={() => triggerLoader(300)} className="hover:text-[#ff0000] transition-colors">Support</Link>
        </nav>

        {/* Product Search Bar */}
        <div className="relative hidden md:block flex-1 max-w-sm">
          <div className="relative">
            <input
              type="text"
              placeholder="Search 'Airdopes', 'Wave Call'..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchDropdown(true);
              }}
              onFocus={() => setSearchDropdown(true)}
              className="w-full bg-neutral-100 dark:bg-[#14161a] text-neutral-900 dark:text-neutral-100 pl-10 pr-4 py-2.5 rounded-full border border-neutral-300 dark:border-[#252932] text-xs font-semibold focus:outline-none focus:border-[#ff0000] transition"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
          </div>

          {searchDropdown && searchResults.length > 0 && (
            <div className="absolute top-12 left-0 right-0 bg-white dark:bg-[#14161a] border border-neutral-200 dark:border-[#252932] rounded-2xl shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto">
              {searchResults.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    navigate(`/products/${item.id}`);
                    setSearchDropdown(false);
                    setSearchQuery("");
                  }}
                  className="flex items-center gap-3 p-3 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 cursor-pointer border-b border-neutral-100 dark:border-neutral-800/50 last:border-none"
                >
                  <img src={item.images[0]} alt={item.name} className="w-10 h-10 object-cover rounded-lg" />
                  <div className="flex-1">
                    <p className="text-[10px] uppercase font-bold text-[#ff0000]">{item.category}</p>
                    <p className="text-xs font-bold dark:text-white truncate">{item.name}</p>
                  </div>
                  <span className="text-xs font-black text-black dark:text-white">₹{item.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Dark / Light Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-[#14161a] text-neutral-700 dark:text-neutral-300 hover:text-[#ff0000] transition"
            title="Toggle Light / Dark"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* User Auth */}
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-[#ff0000] hidden sm:inline">Hi, {user.name.split(' ')[0]}</span>
              <button
                onClick={logoutUser}
                title="Log Out"
                className="p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-[#14161a] text-neutral-700 dark:text-neutral-300 hover:text-rose-500 transition"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-[#14161a] text-neutral-700 dark:text-neutral-300 hover:text-[#ff0000] transition"
              title="boAt Account"
            >
              <User className="w-5 h-5" />
            </Link>
          )}

          {/* Wishlist */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-[#14161a] text-neutral-700 dark:text-neutral-300 hover:text-[#ff0000] transition"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 bg-[#ff0000] text-white font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-full bg-[#ff0000] hover:bg-[#d90429] text-white transition shadow-lg shadow-red-600/30"
            title="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-700 dark:text-neutral-200"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-enter lg:hidden bg-white dark:bg-[#14161a] border-b border-neutral-200 dark:border-[#252932] px-6 py-5 space-y-4">
          <input
            type="text"
            placeholder="Search boAt audio, watches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white px-4 py-2.5 rounded-xl text-xs outline-none"
          />
          <div className="flex flex-col gap-3 font-bold text-xs uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
            <button onClick={() => handleNavClick("/")} className="text-left py-1 hover:text-[#ff0000]">Home</button>
            <button onClick={() => handleNavClick("/products")} className="text-left py-1 hover:text-[#ff0000]">All Products</button>
            <button onClick={() => handleNavClick("/about")} className="text-left py-1 hover:text-[#ff0000]">About Us</button>
            <button onClick={() => handleNavClick("/contact")} className="text-left py-1 hover:text-[#ff0000]">Contact Support</button>
            {user ? (
              <button onClick={() => { logoutUser(); setMobileMenuOpen(false); }} className="text-left py-1 text-rose-500">Sign Out</button>
            ) : (
              <button onClick={() => handleNavClick("/login")} className="text-left py-1 text-[#ff0000]">Login / Register</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
