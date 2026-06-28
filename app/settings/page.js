"use client";

import { Settings } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <section className="glass max-w-3xl rounded-2xl p-6 shadow-soft">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-500/12 text-gold-500">
            <Settings className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Settings</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Application preferences and admin controls</p>
          </div>
        </div>
        <div className="grid gap-4">
          <label className="flex items-center justify-between rounded-2xl border border-slate-200/70 p-4 dark:border-white/10">
            <span>
              <span className="block font-semibold">Email approval credentials</span>
              <span className="text-sm text-slate-500 dark:text-slate-400">Prepared in services/astrologer.js for backend integration.</span>
            </span>
            <input type="checkbox" disabled className="h-5 w-5 accent-gold-500" />
          </label>
          <label className="flex items-center justify-between rounded-2xl border border-slate-200/70 p-4 dark:border-white/10">
            <span>
              <span className="block font-semibold">Luxury dark interface</span>
              <span className="text-sm text-slate-500 dark:text-slate-400">Use the navbar theme toggle to switch modes.</span>
            </span>
            <input type="checkbox" checked readOnly className="h-5 w-5 accent-gold-500" />
          </label>
        </div>
      </section>
    </ProtectedRoute>
  );
}
