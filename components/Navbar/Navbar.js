"use client";

import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Bell, LogOut, Moon, Search, Sun } from "lucide-react";
import { logout } from "@/redux/auth/authSlice";
import { toggleDarkMode } from "@/redux/ui/uiSlice";

const titles = {
  "/dashboard": "Dashboard",
  "/astrologers": "Astrologers",
  "/users": "Users",
  "/settings": "Settings"
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.ui.darkMode);
  const title = titles[pathname] || "APSRA Astro";

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/75 backdrop-blur-2xl dark:border-white/10 dark:bg-ink/75">
      <div className="flex min-h-20 flex-col gap-3 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="pl-14 lg:pl-0">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-500">APSRA Admin</p>
          <h1 className="text-2xl font-bold text-slate-950 dark:text-white">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <label className="relative hidden min-w-72 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input className="h-11 w-full rounded-xl border border-slate-200 bg-white/70 pl-10 pr-3 text-sm outline-none focus:ring-4 focus:ring-gold-500/20 dark:border-white/10 dark:bg-white/10" placeholder="Search workspace" />
          </label>
          <button aria-label="Notifications" className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white/70 dark:border-white/10 dark:bg-white/10">
            <Bell className="h-5 w-5" />
          </button>
          <button aria-label="Toggle theme" onClick={() => dispatch(toggleDarkMode())} className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white/70 dark:border-white/10 dark:bg-white/10">
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button aria-label="Logout" onClick={handleLogout} className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white/70 text-rose-500 dark:border-white/10 dark:bg-white/10">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
