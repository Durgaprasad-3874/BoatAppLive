import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useApp } from "../context/AppContext";

export const Contact = () => {
  const { showToast } = useApp();
  const [form, setForm] = useState({ name: "", email: "", queryType: "Order Support", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      showToast("Please fill all required fields", "error");
      return;
    }
    showToast("Support ticket created! A boAt executive will contact you shortly.");
    setForm({ name: "", email: "", queryType: "Order Support", message: "" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-4xl font-black text-black dark:text-white uppercase tracking-tight">boAt Support Hub</h1>
        <p className="text-neutral-500 text-xs sm:text-sm mt-2">Need help with warranty claim, tracking, or pairing? We are here for you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="space-y-4">
          <div className="p-6 bg-neutral-50 dark:bg-[#14161a] border border-neutral-200 dark:border-[#252932] rounded-3xl flex items-start gap-4">
            <Mail className="w-6 h-6 text-[#ff0000] shrink-0 mt-1" />
            <div>
              <h4 className="font-black text-black dark:text-white text-sm uppercase">Customer Care</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">support@boat-lifestyle.com</p>
            </div>
          </div>

          <div className="p-6 bg-neutral-50 dark:bg-[#14161a] border border-neutral-200 dark:border-[#252932] rounded-3xl flex items-start gap-4">
            <Phone className="w-6 h-6 text-[#ff0000] shrink-0 mt-1" />
            <div>
              <h4 className="font-black text-black dark:text-white text-sm uppercase">Helpline Support</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">+91-22-6918-1920 (Mon - Sat, 9AM to 7PM)</p>
            </div>
          </div>

          <div className="p-6 bg-neutral-50 dark:bg-[#14161a] border border-neutral-200 dark:border-[#252932] rounded-3xl flex items-start gap-4">
            <MapPin className="w-6 h-6 text-[#ff0000] shrink-0 mt-1" />
            <div>
              <h4 className="font-black text-black dark:text-white text-sm uppercase">Corporate Headquarters</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Imagine Marketing Ltd, Unit 201, Andheri (E), Mumbai, Maharashtra - 400093
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-neutral-50 dark:bg-[#14161a] border border-neutral-200 dark:border-[#252932] p-8 rounded-3xl shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-neutral-500 uppercase tracking-wider block mb-1">Your Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Aman Sharma"
                  className="w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#ff0000] dark:text-white font-medium"
                />
              </div>
              <div>
                <label className="text-xs font-black text-neutral-500 uppercase tracking-wider block mb-1">Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="aman@example.com"
                  className="w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#ff0000] dark:text-white font-medium"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-black text-neutral-500 uppercase tracking-wider block mb-1">Issue Category</label>
              <select
                value={form.queryType}
                onChange={(e) => setForm({ ...form, queryType: e.target.value })}
                className="w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#ff0000] dark:text-white font-bold cursor-pointer"
              >
                <option value="Order Support">Order & Delivery Tracking</option>
                <option value="Warranty Claim">Warranty Replacement / Claim</option>
                <option value="Technical">Bluetooth / Sound Quality Issue</option>
                <option value="Bulk Order">Corporate & Bulk Inquiries</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-black text-neutral-500 uppercase tracking-wider block mb-1">Message</label>
              <textarea
                rows="4"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Share your invoice number or issue description..."
                className="w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#ff0000] dark:text-white font-medium"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-[#ff0000] hover:bg-[#d90429] text-white font-black px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 transition text-xs uppercase tracking-wider"
            >
              <Send className="w-4 h-4" /> Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
