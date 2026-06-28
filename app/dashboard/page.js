"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { CheckCircle2, Clock3, FileText, XCircle } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import StatusBadge from "@/components/StatusBadge/StatusBadge";
import Loader from "@/components/Loader/Loader";
import { fetchAstrologers } from "@/redux/astrologers/astrologerSlice";
import { getStatus, valueOrDash } from "@/utils/format";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { astrologers, loading } = useSelector((state) => state.astrologers);

  useEffect(() => {
    if (!astrologers.length) dispatch(fetchAstrologers());
  }, [astrologers.length, dispatch]);

  const stats = useMemo(() => {
    const pending = astrologers.filter((item) => getStatus(item) === "PENDING").length;
    const approved = astrologers.filter((item) => getStatus(item) === "APPROVED").length;
    const rejected = astrologers.filter((item) => ["REJECTED", "UNAPPROVED"].includes(getStatus(item))).length;
    return [
      { label: "Total Applications", value: astrologers.length, icon: FileText, color: "text-gold-500" },
      { label: "Pending", value: pending, icon: Clock3, color: "text-orange-500" },
      { label: "Approved", value: approved, icon: CheckCircle2, color: "text-emerald-500" },
      { label: "Rejected", value: rejected, icon: XCircle, color: "text-rose-500" }
    ];
  }, [astrologers]);

  const max = Math.max(...stats.map((item) => item.value), 1);

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="glass rounded-2xl p-5 shadow-soft">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{item.label}</p>
                    <p className="mt-2 text-3xl font-black">{item.value}</p>
                  </div>
                  <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-white/70 dark:bg-white/10 ${item.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="glass rounded-2xl shadow-soft">
            <div className="border-b border-slate-200/70 p-5 dark:border-white/10">
              <h2 className="text-lg font-bold">Recent Applications</h2>
            </div>
            {loading ? (
              <Loader label="Loading applications" />
            ) : (
              <div className="divide-y divide-slate-200/70 dark:divide-white/10">
                {astrologers.slice(0, 6).map((item) => (
                  <div key={item.publicId || item.email} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-bold">{valueOrDash(item.displayName || item.fullName)}</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{valueOrDash(item.email)}</p>
                    </div>
                    <StatusBadge status={getStatus(item)} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="glass rounded-2xl p-5 shadow-soft">
            <h2 className="text-lg font-bold">Application Mix</h2>
            <div className="mt-6 space-y-5">
              {stats.slice(1).map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-semibold">{item.label}</span>
                    <span className="text-slate-500 dark:text-slate-400">{item.value}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(item.value / max) * 100}%` }} className="h-full rounded-full bg-gold-gradient" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-gold-500/20 bg-gold-500/10 p-4">
              <p className="text-sm font-semibold text-gold-700 dark:text-gold-100">Quick Action</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Review pending astrologer applications and keep document approvals current.</p>
            </div>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
