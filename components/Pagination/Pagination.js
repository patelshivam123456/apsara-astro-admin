"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, pageSize, total, onPageChange, onPageSizeChange }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const start = total ? (page - 1) * pageSize + 1 : 0;
  const end = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-col gap-3 border-t border-slate-200/70 px-4 py-4 text-sm dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-slate-500 dark:text-slate-400">
        Showing {start}-{end} of {total}
      </p>
      <div className="flex items-center gap-2">
        <select
          value={pageSize}
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
          className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 dark:border-white/10 dark:bg-[#24232d] dark:text-white"
        >
          {[10, 20, 50].map((size) => (
            <option key={size} value={size} className="bg-white text-slate-900 dark:bg-[#24232d] dark:text-white">
              {size}
            </option>
          ))}
        </select>
        <button
          aria-label="Previous page"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white disabled:opacity-40 dark:border-white/10 dark:bg-white/10"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="min-w-20 text-center font-semibold">
          {page} / {pages}
        </span>
        <button
          aria-label="Next page"
          onClick={() => onPageChange(Math.min(pages, page + 1))}
          disabled={page === pages}
          className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white disabled:opacity-40 dark:border-white/10 dark:bg-white/10"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
