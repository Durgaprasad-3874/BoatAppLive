import React, { useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export const Toast = () => {
  const { toast, clearToast } = useApp();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(clearToast, 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-[#ff0000] shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />,
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#14161a] border border-[#252932] text-white px-5 py-3.5 rounded-2xl shadow-2xl transition-all duration-300 transform translate-y-0 opacity-100">
      {icons[toast.type] || icons.info}
      <span className="text-xs sm:text-sm font-bold tracking-wide">{toast.message}</span>
      <button onClick={clearToast} className="text-neutral-400 hover:text-white ml-2 p-1">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
