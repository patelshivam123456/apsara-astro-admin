"use client";

import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";

export default function ProtectedRoute({ children }) {
  useProtectedRoute();

  return (
    <div className="min-h-screen bg-[#f7f5ee] text-slate-950 dark:bg-ink dark:text-white">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <Navbar />
          <main className="px-4 py-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
