"use client";

import { Inbox } from "lucide-react";

export default function EmptyState({ title = "No records found", message = "Try adjusting your filters." }) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-3 px-6 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gold-500/12 text-gold-500">
        <Inbox className="h-7 w-7" />
      </div>
      <div>
        <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{message}</p>
      </div>
    </div>
  );
}
