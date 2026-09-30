import React, { useState } from "react";
import { PRODUCTS } from "../data/products";
import { ProductCard } from "../components/product/ProductCard";
import { SlidersHorizontal, ChevronDown, RotateCcw } from "lucide-react";

export const Products = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All products");
  const [sortBy, setSortBy] = useState("featured");
  const categories = ["All products", ...new Set(PRODUCTS.map((product) => product.category))];

  const visibleProducts = PRODUCTS.filter(
    (product) => activeCategory === "All products" || product.category === activeCategory
  );

  if (sortBy === "price-low") visibleProducts.sort((a, b) => a.price - b.price);
  if (sortBy === "price-high") visibleProducts.sort((a, b) => b.price - a.price);
  if (sortBy === "rating") visibleProducts.sort((a, b) => b.rating - a.rating);

  const clearFilters = () => {
    setActiveCategory("All products");
    setSortBy("featured");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0c0e] text-neutral-900 dark:text-neutral-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[#ff0000] text-[10px] font-black uppercase tracking-[0.3em] mb-2">Premium Audio</p>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Shop All boAt Products</h1>
          </div>
          <div className="text-sm text-neutral-500 dark:text-neutral-400 font-semibold">
            {visibleProducts.length} {visibleProducts.length === 1 ? "Product" : "Products"} Available
          </div>
        </div>

        <section className="mb-8 border-y border-neutral-200 dark:border-[#252932] py-4" aria-label="Product filters">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              aria-expanded={filtersOpen}
              aria-controls="product-filter-panel"
              onClick={() => setFiltersOpen((open) => !open)}
              className={`inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-lg border px-4 text-sm font-bold transition-colors ${
                filtersOpen || activeCategory !== "All products"
                  ? "border-[#ff0000] bg-[#ff0000]/10 text-[#ff0000]"
                  : "border-neutral-300 text-neutral-800 hover:border-neutral-500 dark:border-[#383d46] dark:text-neutral-100 dark:hover:border-neutral-500"
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeCategory !== "All products" && (
                <span className="ml-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#ff0000] px-1 text-[10px] text-white">
                  1
                </span>
              )}
              <ChevronDown className={`h-4 w-4 transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
            </button>

            <label className="flex min-h-11 items-center gap-3 text-sm font-semibold text-neutral-600 dark:text-neutral-300">
              <span className="shrink-0">Sort by</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="min-h-11 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm font-bold text-neutral-900 outline-none transition-colors hover:border-neutral-500 focus:border-[#ff0000] dark:border-[#383d46] dark:bg-[#14161a] dark:text-white sm:w-52"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to high</option>
                <option value="price-high">Price: High to low</option>
                <option value="rating">Top rated</option>
              </select>
            </label>
          </div>

          {filtersOpen && (
            <div id="product-filter-panel" className="mt-4 border-t border-neutral-200 pt-4 dark:border-[#252932]">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xs font-black uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Category
                </h2>
                {(activeCategory !== "All products" || sortBy !== "featured") && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff0000] transition-colors hover:text-[#d90429]"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Clear filters
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const isActive = activeCategory === category;
                  const count = category === "All products"
                    ? PRODUCTS.length
                    : PRODUCTS.filter((product) => product.category === category).length;

                  return (
                    <button
                      key={category}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveCategory(category)}
                      className={`rounded-lg border px-3 py-2 text-xs font-bold transition-colors ${
                        isActive
                          ? "border-[#ff0000] bg-[#ff0000] text-white shadow-sm shadow-red-600/20"
                          : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-500 dark:border-[#383d46] dark:bg-[#14161a] dark:text-neutral-200 dark:hover:border-neutral-500"
                      }`}
                    >
                      {category}
                      <span className={`ml-2 ${isActive ? "text-white/75" : "text-neutral-400"}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg font-bold">No products match these filters.</p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 rounded-lg bg-[#ff0000] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#d90429]"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};