import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { useApp } from "../context/AppContext";
import { Star, ShieldCheck, Truck, RotateCcw, Heart, ShoppingBag, Check, Zap, ChevronLeft, ChevronRight, RotateCw } from "lucide-react";
import { ProductCard } from "../components/product/ProductCard";

export const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const product = PRODUCTS.find((p) => p.id === Number(id)) || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [is360Mode, setIs360Mode] = useState(false);

  const isFavorited = wishlist.some((item) => item.id === product.id);
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  useEffect(() => {
    if (!is360Mode || product.images.length <= 1) return;

    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % product.images.length);
    }, 700);

    return () => clearInterval(interval);
  }, [is360Mode, product.images.length]);

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % product.images.length);
    setIs360Mode(false);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    setIs360Mode(false);
  };

  return (
    <div className="min-h-screen py-10 px-4 max-w-7xl mx-auto space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Gallery Slider / Carousel with Prev/Next buttons */}
        <div className="space-y-4">
          <div className="relative h-96 sm:h-[460px] rounded-3xl overflow-hidden bg-neutral-900 border border-[#252932] shadow-2xl group">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className={`w-full h-full object-cover transition-all duration-300 ${is360Mode ? "scale-105" : ""}`}
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#ff0000] text-white p-2.5 rounded-full backdrop-blur-md transition shadow"
                  title="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#ff0000] text-white p-2.5 rounded-full backdrop-blur-md transition shadow"
                  title="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIs360Mode((prev) => !prev)}
                  className="absolute left-4 top-4 bg-black/60 hover:bg-[#ff0000] text-white px-3 py-2 rounded-full backdrop-blur-md transition shadow text-[10px] font-black uppercase tracking-wider flex items-center gap-2"
                  title="Toggle 360 degree view"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  {is360Mode ? "Stop 360°" : "360° View"}
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx ? "border-[#ff0000] scale-105 shadow-md shadow-red-500/30" : "border-neutral-700 opacity-60"
                }`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="bg-[#ff0000]/10 text-[#ff0000] text-[10px] px-3 py-1 rounded-md font-black uppercase tracking-wider border border-[#ff0000]/30">
              {product.category}
            </span>
            <div className="flex items-center text-amber-400 text-sm font-bold">
              <Star className="w-4 h-4 fill-amber-400 mr-1" />
              {product.rating} ({product.reviewsCount} reviews)
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-black dark:text-white uppercase tracking-tight">
            {product.name}
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">{product.description}</p>

          <div className="flex items-baseline gap-4 pt-2">
            <span className="text-4xl font-black text-[#ff0000]">₹{product.price}</span>
            <span className="text-neutral-400 line-through text-lg">₹{product.originalPrice}</span>
            <span className="text-emerald-500 text-xs font-black bg-emerald-500/10 px-2 py-1 rounded-md">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          </div>

          {/* Color Selection */}
          <div>
            <span className="text-xs font-black text-neutral-400 uppercase tracking-wider mb-2 block">
              Choose Color Variant
            </span>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                  className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${
                    selectedColor === color ? "border-[#ff0000] ring-2 ring-red-500/40 scale-110" : "border-neutral-600"
                  }`}
                >
                  {selectedColor === color && <Check className="w-4 h-4 text-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* Key Feature Bullets */}
          <div className="space-y-2 pt-2">
            {product.features?.map((feat, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-bold text-neutral-800 dark:text-neutral-300">
                <Zap className="w-4 h-4 text-[#ff0000] shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* Quantity and Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-neutral-200 dark:border-[#252932]">
            <div className="flex items-center border border-neutral-300 dark:border-neutral-700 rounded-2xl px-4 py-2.5 bg-neutral-100 dark:bg-[#14161a]">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-2 font-black dark:text-white">-</button>
              <span className="px-4 text-sm font-black dark:text-white">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-2 font-black dark:text-white">+</button>
            </div>

            <button
              onClick={() => addToCart(product, qty, selectedColor)}
              className="flex-1 bg-[#ff0000] hover:bg-[#d90429] text-white font-black py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 transition shadow-lg shadow-red-600/30 text-xs uppercase tracking-wide"
            >
              <ShoppingBag className="w-4 h-4" /> Add To boAt Bag
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className={`p-3.5 rounded-2xl border transition ${
                isFavorited
                  ? "bg-red-500/10 border-[#ff0000] text-[#ff0000]"
                  : "border-neutral-300 dark:border-neutral-700 text-neutral-400 hover:text-white"
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorited ? "fill-[#ff0000]" : ""}`} />
            </button>
          </div>

          {/* Assurance */}
          <div className="grid grid-cols-3 gap-3 pt-4 text-center text-xs text-neutral-500 dark:text-neutral-400">
            <div className="p-3 bg-neutral-100 dark:bg-[#14161a] rounded-2xl">
              <ShieldCheck className="w-5 h-5 mx-auto mb-1 text-[#ff0000]" />
              1 Year boAt Warranty
            </div>
            <div className="p-3 bg-neutral-100 dark:bg-[#14161a] rounded-2xl">
              <Truck className="w-5 h-5 mx-auto mb-1 text-[#ff0000]" />
              Free Express Shipping
            </div>
            <div className="p-3 bg-neutral-100 dark:bg-[#14161a] rounded-2xl">
              <RotateCcw className="w-5 h-5 mx-auto mb-1 text-[#ff0000]" />
              7 Days Replacement
            </div>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="bg-neutral-50 dark:bg-[#14161a] border border-neutral-200 dark:border-[#252932] rounded-3xl p-8">
        <h3 className="text-lg font-black text-black dark:text-white uppercase mb-6">Technical Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(product.specs || {}).map(([key, value]) => (
            <div key={key} className="flex justify-between py-2.5 border-b border-neutral-200 dark:border-neutral-800/80 text-xs">
              <span className="text-neutral-400 font-bold uppercase">{key}</span>
              <span className="text-black dark:text-white font-black">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h3 className="text-xl font-black text-black dark:text-white uppercase mb-6">You Might Also Dig</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};
