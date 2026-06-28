"use client";

import { Loader2 } from "lucide-react";

export default function Button({ children, loading, variant = "primary", className = "", disabled, ...props }) {
  const variants = {
    primary: "bg-gold-gradient text-ink shadow-glow hover:brightness-110",
    secondary: "border border-slate-300/50 bg-white/70 text-slate-800 hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white",
    danger: "bg-rose-600 text-white hover:bg-rose-500",
    success: "bg-emerald-600 text-white hover:bg-emerald-500",
    ghost: "text-slate-700 hover:bg-slate-900/5 dark:text-slate-200 dark:hover:bg-white/10"
  };

  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
}
