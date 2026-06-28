"use client";

import { Loader2 } from "lucide-react";

export default function Loader({ label = "Loading" }) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center gap-3 text-slate-500 dark:text-slate-300">
      <Loader2 className="h-8 w-8 animate-spin text-gold-500" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}

export function TableSkeleton({ rows = 8, cols = 8 }) {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: rows }).map((_, row) => (
        <div key={row} className="grid gap-3" style={{ gridTemplateColumns: `repeat(${cols}, minmax(90px, 1fr))` }}>
          {Array.from({ length: cols }).map((__, col) => (
            <div key={col} className="skeleton h-10 rounded-xl" />
          ))}
        </div>
      ))}
    </div>
  );
}
