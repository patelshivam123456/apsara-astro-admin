"use client";

import { Search as SearchIcon } from "lucide-react";

export default function Search({ value, onChange, placeholder = "Search" }) {
  return (
    <label className="relative block">
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white/80 pl-10 pr-3 text-sm outline-none ring-gold-500/30 transition focus:ring-4 dark:border-white/10 dark:bg-white/10 dark:text-white"
      />
    </label>
  );
}
