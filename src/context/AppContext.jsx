import React, { createContext, useContext, useState, useEffect, useRef } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("boat_theme");
    return saved ? saved === "dark" : true;
  });

  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("boat_cart") || "[]");
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("boat_wishlist") || "[]");
    } catch {
      return [];
    }
  });

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("boat_user") || "null");
    } catch {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const loaderTimeout = useRef(null);

  useEffect(() => () => clearTimeout(loaderTimeout.current), []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("boat_theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("boat_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("boat_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (message, type = "success") => {
    setToast({ id: Date.now(), message, type });
  };

  const clearToast = () => setToast(null);

  const addToCart = (product, quantity = 1, selectedColor = null) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity, selectedColor: selectedColor || product.colors?.[0] }];
    });
    showToast(`Added "${product.name}" to boAt cart!`);
  };

  const updateCartQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast("Item removed from boAt cart", "info");
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToast(`Removed from wishlist`, "info");
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Saved "${product.name}" to wishlist!`);
    }
  };

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem("boat_user", JSON.stringify(userData));
    showToast(`Welcome boAthead, ${userData.name || 'User'}!`);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("boat_user");
    showToast("Signed out successfully", "info");
  };

  const triggerLoader = (duration = 600) => {
    clearTimeout(loaderTimeout.current);
    setIsLoading(true);
    loaderTimeout.current = setTimeout(() => setIsLoading(false), duration);
  };

  return (
    <AppContext.Provider
      value={{
        darkMode,
        setDarkMode,
        cart,
        wishlist,
        user,
        loginUser,
        logoutUser,
        addToCart,
        updateCartQty,
        removeFromCart,
        toggleWishlist,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        toast,
        showToast,
        clearToast,
        isLoading,
        triggerLoader
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
