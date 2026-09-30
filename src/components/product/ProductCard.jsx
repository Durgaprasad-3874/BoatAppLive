import React from "react";
import { Link } from "react-router-dom";
import { Star, Heart, ShoppingBag, Flame } from "lucide-react";
import { useApp } from "../../context/AppContext";

export const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist, triggerLoader } = useApp();
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="group relative bg-neutral-50 dark:bg-[#14161a] border border-neutral-200 dark:border-[#252932] rounded-3xl p-4 transition-all duration-300 hover:shadow-2xl hover:border-[#ff0000]/60 hover:-translate-y-1 flex flex-col justify-between">
      {/* Badges */}
      <div className="absolute top-5 left-5 z-10 flex flex-col gap-1.5">
        {product.isFlashDeal && (
          <span className="bg-[#ff0000] text-white text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1 shadow-md">
            <Flame className="w-3 h-3 fill-white" /> Bestseller
          </span>
        )}
        <span className="bg-black text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase w-fit">
          {discountPercent}% OFF
        </span>
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-5 right-5 z-10 p-2 rounded-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm text-neutral-400 hover:text-[#ff0000] transition shadow"
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? "fill-[#ff0000] text-[#ff0000]" : ""}`} />
      </button>

      {/* Product Image */}
      <Link
        to={`/products/${product.id}`}
        onClick={() => triggerLoader(300)}
        className="block overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 aspect-square mb-4"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[#ff0000] font-black text-[10px] uppercase tracking-wider">{product.category}</span>
            <div className="flex items-center text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
              {product.rating}
            </div>
          </div>

          <Link to={`/products/${product.id}`} onClick={() => triggerLoader(300)}>
            <h3 className="font-extrabold text-sm text-neutral-900 dark:text-white hover:text-[#ff0000] transition truncate">
              {product.name}
            </h3>
          </Link>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-1">{product.tagline}</p>
        </div>

        {/* Pricing & Add to Cart Button */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-200 dark:border-[#252932]">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-black dark:text-white">₹{product.price}</span>
              <span className="text-xs text-neutral-400 line-through">₹{product.originalPrice}</span>
            </div>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="px-3.5 py-2 bg-[#ff0000] hover:bg-[#d90429] text-white rounded-xl font-black text-xs flex items-center gap-1.5 transition shadow hover:shadow-red-500/30"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> ADD
          </button>
        </div>
      </div>
    </div>
  );
};
