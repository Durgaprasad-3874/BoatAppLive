import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { X, Trash2, ArrowRight, ShoppingBag, Heart } from "lucide-react";

export const CartWishlistDrawers = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    isWishlistOpen,
    setIsWishlistOpen,
    cart,
    wishlist,
    updateCartQty,
    removeFromCart,
    toggleWishlist,
    addToCart,
    showToast,
  } = useApp();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = Math.max(0, subtotal - discount);

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === "BOAT15") {
      const disc = Math.round(subtotal * 0.15);
      setDiscount(disc);
      showToast(`Coupon applied! Saved ₹${disc}`);
    } else {
      showToast("Invalid code! Use 'BOAT15'", "error");
    }
  };

  return (
    <>
      {/* CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            onClick={() => setIsCartOpen(false)}
            className="drawer-backdrop-enter absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          />
          <div className="drawer-panel-enter fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white dark:bg-[#14161a] border-l border-neutral-200 dark:border-[#252932] p-6 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-[#252932]">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#ff0000]" />
                    <h3 className="text-lg font-black text-black dark:text-white uppercase tracking-tight">Your boAt Cart ({cart.length})</h3>
                  </div>
                  <button onClick={() => setIsCartOpen(false)} className="text-neutral-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Items */}
                <div className="mt-4 space-y-4 max-h-[55vh] overflow-y-auto pr-1">
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingBag className="w-12 h-12 text-neutral-500 mx-auto mb-3" />
                      <p className="text-neutral-400 text-sm font-semibold">Your boAt bag is empty!</p>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="mt-4 bg-[#ff0000] text-white px-5 py-2.5 rounded-xl text-xs font-bold"
                      >
                        Start Shopping
                      </button>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-3 bg-neutral-100 dark:bg-[#191c21] rounded-2xl border border-neutral-200 dark:border-[#252932]"
                      >
                        <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-black dark:text-white truncate">{item.name}</h4>
                          <p className="text-xs text-[#ff0000] font-black mt-0.5">₹{item.price}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs bg-white dark:bg-neutral-800">
                              <button onClick={() => updateCartQty(item.id, -1)} className="px-2.5 py-0.5 font-bold dark:text-white">-</button>
                              <span className="px-2 font-bold dark:text-white">{item.quantity}</span>
                              <button onClick={() => updateCartQty(item.id, 1)} className="px-2.5 py-0.5 font-bold dark:text-white">+</button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-neutral-400 hover:text-rose-500 text-xs"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Checkout details */}
              {cart.length > 0 && (
                <div className="pt-4 border-t border-neutral-200 dark:border-[#252932] space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon: BOAT15"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="bg-neutral-100 dark:bg-[#191c21] text-xs px-3 py-2.5 rounded-xl flex-1 border border-neutral-300 dark:border-neutral-700 outline-none uppercase font-bold dark:text-white"
                    />
                    <button
                      onClick={applyPromo}
                      className="bg-neutral-800 hover:bg-[#ff0000] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition"
                    >
                      Apply
                    </button>
                  </div>

                  <div className="space-y-1.5 text-xs text-neutral-400">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-black dark:text-white font-bold">₹{subtotal}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-400 font-bold">
                        <span>boAt Discount (15%)</span>
                        <span>-₹{discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-emerald-400 font-bold">FREE</span>
                    </div>
                    <div className="flex justify-between text-sm font-black text-black dark:text-white pt-2 border-t border-neutral-200 dark:border-[#252932]">
                      <span>Total Amount</span>
                      <span className="text-[#ff0000]">₹{total}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      showToast("boAt Order Placed! Thank you for rocking with us 🔥");
                      setIsCartOpen(false);
                    }}
                    className="w-full bg-[#ff0000] hover:bg-[#d90429] text-white font-black py-3.5 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-red-600/30 text-xs uppercase tracking-wider"
                  >
                    Confirm Order ₹{total} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* WISHLIST DRAWER */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            onClick={() => setIsWishlistOpen(false)}
            className="drawer-backdrop-enter absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          />
          <div className="drawer-panel-enter fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white dark:bg-[#14161a] border-l border-neutral-200 dark:border-[#252932] p-6 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-[#252932]">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-[#ff0000] fill-[#ff0000]" />
                    <h3 className="text-lg font-black text-black dark:text-white uppercase">boAt Wishlist ({wishlist.length})</h3>
                  </div>
                  <button onClick={() => setIsWishlistOpen(false)} className="text-neutral-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-4 space-y-4 max-h-[75vh] overflow-y-auto pr-1">
                  {wishlist.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="w-12 h-12 text-neutral-500 mx-auto mb-3" />
                      <p className="text-neutral-400 text-sm font-semibold">Your wishlist is empty!</p>
                    </div>
                  ) : (
                    wishlist.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-3 bg-neutral-100 dark:bg-[#191c21] rounded-2xl border border-neutral-200 dark:border-[#252932]"
                      >
                        <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-black dark:text-white truncate">{item.name}</h4>
                          <p className="text-xs text-[#ff0000] font-black mt-0.5">₹{item.price}</p>
                          <div className="flex items-center gap-2 mt-3">
                            <button
                              onClick={() => {
                                addToCart(item, 1);
                                toggleWishlist(item);
                              }}
                              className="bg-[#ff0000] hover:bg-[#d90429] text-white text-xs font-black px-3 py-1.5 rounded-lg"
                            >
                              Move To Bag
                            </button>
                            <button
                              onClick={() => toggleWishlist(item)}
                              className="text-neutral-400 hover:text-rose-500 text-xs"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
