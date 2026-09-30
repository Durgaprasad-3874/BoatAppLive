import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Truck, RotateCcw, Headphones, Flame } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#14161a] text-neutral-300 border-t border-[#252932] pt-16 pb-8">
      {/* Brand value pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#252932] grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-600/10 text-[#ff0000] rounded-2xl">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-white text-sm">Free Express Shipping</h4>
            <p className="text-xs text-neutral-400">All India Doorstep Delivery</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-600/10 text-[#ff0000] rounded-2xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-white text-sm">1 Year Warranty</h4>
            <p className="text-xs text-neutral-400">Official boAt Assured Care</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-600/10 text-[#ff0000] rounded-2xl">
            <RotateCcw className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-white text-sm">7-Day Replacement</h4>
            <p className="text-xs text-neutral-400">No questions asked return</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-600/10 text-[#ff0000] rounded-2xl">
            <Headphones className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-white text-sm">boAt Support 24x7</h4>
            <p className="text-xs text-neutral-400">Chat with boAt specialists</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="text-3xl font-black tracking-tighter text-white uppercase font-sans">
              bo<span className="text-[#ff0000]">A</span>t
            </span>
            <div className="w-2 h-2 rounded-full bg-[#ff0000] ml-0.5 mt-2"></div>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            India's fastest growing audio & wearable lifestyle brand. Join over 30 Million+ boAtheads living the bass-heavy life.
          </p>
          <div className="text-xs font-black text-[#ff0000] tracking-wider uppercase flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 fill-[#ff0000]" /> #DoWhatFloatsYourboAt
          </div>
        </div>

        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">Shop boAt</h4>
          <ul className="space-y-2 text-xs font-semibold text-neutral-400">
            <li><Link to="/products" className="hover:text-[#ff0000] transition">True Wireless Earbuds</Link></li>
            <li><Link to="/products" className="hover:text-[#ff0000] transition">Bluetooth Smartwatches</Link></li>
            <li><Link to="/products" className="hover:text-[#ff0000] transition">Wireless Neckbands</Link></li>
            <li><Link to="/products" className="hover:text-[#ff0000] transition">Aavante Soundbars</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">Help & Support</h4>
          <ul className="space-y-2 text-xs font-semibold text-neutral-400">
            <li><Link to="/contact" className="hover:text-[#ff0000] transition">Track Shipment</Link></li>
            <li><Link to="/contact" className="hover:text-[#ff0000] transition">Warranty Registration</Link></li>
            <li><Link to="/about" className="hover:text-[#ff0000] transition">About Imagine Marketing</Link></li>
            <li><Link to="/contact" className="hover:text-[#ff0000] transition">Service Centers Near Me</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">Join boAt Tribe</h4>
          <p className="text-xs text-neutral-400 mb-3">Subscribe to get insider drop alerts & secret coupons.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-neutral-900 text-white text-xs px-3 py-2.5 rounded-xl flex-1 border border-neutral-700 outline-none focus:border-[#ff0000]"
            />
            <button className="bg-[#ff0000] hover:bg-[#d90429] text-white font-black text-xs px-4 py-2.5 rounded-xl transition">
              JOIN
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 text-center text-xs text-neutral-500 border-t border-[#252932] pt-6">
        © {new Date().getFullYear()} Imagine Marketing Limited (boAt Lifestyle). All rights reserved.
      </div>
    </footer>
  );
};
