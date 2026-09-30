import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { ProductCard } from "../components/product/ProductCard";
import { SkeletonCard } from "../components/common/SkeletonLoader";
import { useApp } from "../context/AppContext";
import { Flame, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export const Home = () => {
  const { triggerLoader } = useApp();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const flashDeals = PRODUCTS.filter((p) => p.isFlashDeal);

  return (
    <div className="space-y-16 pb-20">
      {/* boAt HERO BANNER */}
      <section className="relative overflow-hidden bg-black text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#252932]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#ff0000]/10 border border-[#ff0000]/40 text-[#ff0000] text-xs font-black uppercase tracking-widest">
              <Flame className="w-3.5 h-3.5 fill-[#ff0000]" />
              <span>India's No.1 Earwear Brand</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              DO WHAT FLOATS <br />
              <span className="text-[#ff0000]">YOUR boAt.</span>
            </h1>

            <p className="text-neutral-300 text-sm sm:text-base max-w-lg leading-relaxed">
              Experience the boAt Signature Sound with monstrous bass, BEAST™ Mode gaming low latency, and ASAP™ fast charging.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/products"
                onClick={() => triggerLoader(300)}
                className="px-8 py-3.5 rounded-xl bg-[#ff0000] hover:bg-[#d90429] text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 transition shadow-xl shadow-red-600/30"
              >
                Shop All boAt Products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products/1"
                onClick={() => triggerLoader(300)}
                className="px-8 py-3.5 rounded-xl border border-neutral-700 hover:border-neutral-500 font-bold text-xs uppercase tracking-wider transition"
              >
                Airdopes 131 Pro
              </Link>
            </div>

            {/* boAt Community Numbers */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-800 text-left">
              <div>
                <span className="text-2xl font-black text-[#ff0000]">30M+</span>
                <p className="text-xs text-neutral-400">boAtheads Strong</p>
              </div>
              <div>
                <span className="text-2xl font-black text-white">4.8 ★</span>
                <p className="text-xs text-neutral-400">Rated Audio Gear</p>
              </div>
              <div>
                <span className="text-2xl font-black text-[#ff0000]">No.1</span>
                <p className="text-xs text-neutral-400">Audio Brand in India</p>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-neutral-800">
              <img
                src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1000&auto=format&fit=crop&q=80"
                alt="boAt Airdopes"
                className="w-full h-[420px] object-cover"
              />
            </div>
            <div className="absolute -inset-4 bg-red-600/20 blur-3xl rounded-full -z-0"></div>
          </div>
        </div>
      </section>

      {/* FLASH DEALS / BESTSELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-[#ff0000] font-black text-xs uppercase tracking-wider mb-1">
              <Flame className="w-4 h-4 fill-[#ff0000]" />
              <span>Heavy Discount</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-black dark:text-white uppercase tracking-tight">
              Best Of boAt Bestsellers
            </h2>
          </div>
          <Link to="/products" onClick={() => triggerLoader(300)} className="text-[#ff0000] hover:underline text-xs font-black uppercase flex items-center gap-1">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array(3).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : flashDeals.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-black text-black dark:text-white uppercase mb-8 text-center tracking-tight">
          Explore By Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "True Wireless", count: "Airdopes Series", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=80" },
            { name: "Smartwatches", count: "Wave Series", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80" },
            { name: "Wireless Neckbands", count: "Rockerz Pro", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80" },
            { name: "Home Audio", count: "Aavante Soundbars", image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop&q=80" },
          ].map((cat, idx) => (
            <Link
              key={idx}
              to="/products"
              onClick={() => triggerLoader(300)}
              className="group relative rounded-3xl overflow-hidden aspect-square border border-neutral-200 dark:border-[#252932]"
            >
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-5 flex flex-col justify-end">
                <h4 className="text-white font-black text-sm uppercase">{cat.name}</h4>
                <p className="text-xs text-[#ff0000] font-bold">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
