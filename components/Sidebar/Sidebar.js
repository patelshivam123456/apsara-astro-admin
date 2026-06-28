"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { BarChart3, ChevronLeft, LogOut, Menu, Settings, Sparkles, Users, UserRoundCheck, X } from "lucide-react";
import { closeSidebar, toggleSidebar, toggleSidebarCollapsed } from "@/redux/ui/uiSlice";
import { logout } from "@/redux/auth/authSlice";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/astrologers", label: "Astrologers", icon: Sparkles },
  { href: "/users", label: "Users", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings }
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { sidebarOpen, sidebarCollapsed } = useSelector((state) => state.ui);

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/login");
  };

  return (
    <>
      <button
        aria-label="Open menu"
        onClick={() => dispatch(toggleSidebar())}
        className="fixed left-4 top-4 z-40 grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-ink text-white shadow-xl lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>
      {sidebarOpen ? <button aria-label="Close overlay" className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => dispatch(closeSidebar())} /> : null}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/10 bg-ink text-white transition-all duration-300 lg:sticky lg:top-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${sidebarCollapsed ? "w-24" : "w-72"}`}
      >
        <div className="flex h-20 items-center gap-3 border-b border-white/10 px-5">
          <Image src="/logo.png" alt="APSRA Astro logo" width={48} height={48} className="h-12 w-12 rounded-xl object-cover ring-1 ring-gold-500/40" priority />
          {!sidebarCollapsed ? (
            <div className="min-w-0">
              <p className="truncate text-base font-bold gold-text">APSRA Astro</p>
              <p className="truncate text-xs text-slate-400">Admin Panel</p>
            </div>
          ) : null}
          <button aria-label="Close menu" onClick={() => dispatch(closeSidebar())} className="ml-auto grid h-9 w-9 place-items-center rounded-xl hover:bg-white/10 lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-2 px-3 py-5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => dispatch(closeSidebar())}
                className={`flex h-12 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition ${
                  active ? "bg-gold-gradient text-ink shadow-glow" : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
                title={item.label}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!sidebarCollapsed ? <span>{item.label}</span> : null}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-2 border-t border-white/10 p-3">
          <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold-500/15 text-gold-300">
              <UserRoundCheck className="h-5 w-5" />
            </div>
            {!sidebarCollapsed ? (
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">Admin</p>
                <p className="truncate text-xs text-slate-400">admin@apsra.com</p>
              </div>
            ) : null}
          </div>
          <button onClick={handleLogout} className="flex h-12 w-full items-center gap-3 rounded-xl px-3 text-sm font-semibold text-slate-300 hover:bg-rose-500/12 hover:text-rose-200">
            <LogOut className="h-5 w-5 shrink-0" />
            {!sidebarCollapsed ? <span>Logout</span> : null}
          </button>
          <button onClick={() => dispatch(toggleSidebarCollapsed())} className="hidden h-10 w-full items-center justify-center rounded-xl text-slate-400 hover:bg-white/10 lg:flex">
            <ChevronLeft className={`h-5 w-5 transition ${sidebarCollapsed ? "rotate-180" : ""}`} />
          </button>
        </div>
      </aside>
    </>
  );
}
