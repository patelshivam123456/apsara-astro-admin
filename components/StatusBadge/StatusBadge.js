"use client";

import { getStatus } from "@/utils/format";

export default function StatusBadge({ status }) {
  const normalized = getStatus(status);
  const classes = {
    PENDING: "border-orange-300/40 bg-orange-500/12 text-orange-600 dark:text-orange-300",
    APPROVED: "border-emerald-300/40 bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
    UNAPPROVED: "border-rose-300/40 bg-rose-500/12 text-rose-700 dark:text-rose-300",
    REJECTED: "border-rose-300/40 bg-rose-500/12 text-rose-700 dark:text-rose-300"
  };

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${classes[normalized] || classes.PENDING}`}>
      {normalized}
    </span>
  );
}
