import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Lock, Mail, Eye, EyeOff, Flame } from "lucide-react";

export const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser } = useApp();
  const navigate = useNavigate();

  const validate = () => {
    const err = {};
    if (!formData.email) err.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) err.email = "Enter a valid email address";
    if (!formData.password) err.password = "Password is required";
    else if (formData.password.length < 6) err.password = "Password must be at least 6 characters";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      loginUser({ email: formData.email, name: formData.email.split("@")[0] });
      navigate("/");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white dark:bg-[#14161a] border border-neutral-200 dark:border-[#252932] rounded-3xl p-8 sm:p-10 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-red-600/10 text-[#ff0000] rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Flame className="w-6 h-6 fill-[#ff0000]" />
          </div>
          <h2 className="text-2xl font-black text-black dark:text-white uppercase">boAt Login</h2>
          <p className="text-neutral-500 text-xs mt-1">Log in to track orders & claim warranties</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-black text-neutral-500 uppercase tracking-wider block mb-1">Email</label>
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 pl-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-xs focus:border-[#ff0000] outline-none dark:text-white font-medium"
                placeholder="boAthead@gmail.com"
              />
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
            </div>
            {errors.email && <span className="text-rose-500 text-xs mt-1 block font-bold">{errors.email}</span>}
          </div>

          <div>
            <label className="text-xs font-black text-neutral-500 uppercase tracking-wider block mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 pl-10 pr-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-xs focus:border-[#ff0000] outline-none dark:text-white font-medium"
                placeholder="••••••••"
              />
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-neutral-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <span className="text-rose-500 text-xs mt-1 block font-bold">{errors.password}</span>}
          </div>

          <button
            type="submit"
            className="w-full bg-[#ff0000] hover:bg-[#d90429] text-white font-black py-3.5 rounded-xl transition shadow-lg shadow-red-600/30 text-xs uppercase tracking-wider mt-2"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-xs text-neutral-500 mt-6 font-semibold">
          New to boAt?{" "}
          <Link to="/signup" className="text-[#ff0000] font-black hover:underline">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
};
