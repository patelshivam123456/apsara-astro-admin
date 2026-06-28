"use client";

import { Users } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import EmptyState from "@/components/EmptyState/EmptyState";

export default function UsersPage() {
  return (
    <ProtectedRoute>
      <section className="glass rounded-2xl p-6 shadow-soft">
        <div className="mb-4 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-500/12 text-gold-500">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Users</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">User management workspace</p>
          </div>
        </div>
        <EmptyState title="No user API connected" message="Connect the user service when the backend endpoint is available." />
      </section>
    </ProtectedRoute>
  );
}
