"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Eye, Lock, Mail, Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import { login } from "@/redux/auth/authSlice";
import { getToken } from "@/utils/token";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, isLoggedIn } = useSelector((state) => state.auth);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: "",
      password: "",
      remember: false
    }
  });

  useEffect(() => {
    if (isLoggedIn || getToken()) router.replace("/dashboard");
  }, [isLoggedIn, router]);

  const onSubmit = async (values) => {
    const action = await dispatch(login(values));
    if (login.fulfilled.match(action)) {
      router.replace("/dashboard");
    }
  };

  return (
    <main className="relative grid min-h-screen overflow-hidden bg-ink px-4 py-8 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(211,154,42,0.22),transparent_34%),radial-gradient(circle_at_80%_12%,rgba(16,185,129,0.12),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(239,68,68,0.12),transparent_35%)]" />
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-500/10"
      />
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass relative z-10 m-auto w-full max-w-md rounded-3xl p-6 shadow-glow sm:p-8"
      >
        <div className="mb-8 text-center">
          <Image src="/logo.png" alt="APSRA Astro logo" width={112} height={112} className="mx-auto h-28 w-28 rounded-3xl object-cover shadow-glow ring-1 ring-gold-500/40" priority />
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-gold-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-gold-100">
            <Sparkles className="h-3.5 w-3.5" />
            Admin Portal
          </div>
          <h1 className="mt-4 text-3xl font-black gold-text">APSRA Astro</h1>
          <p className="mt-2 text-sm text-slate-300">Manage applications, approvals, and documents from one premium workspace.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-200">Email</span>
            <span className="relative block">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                {...register("username", { required: "Email is required" })}
                className="h-12 w-full rounded-xl border border-white/10 bg-white/10 pl-10 pr-3 text-white outline-none ring-gold-500/30 transition placeholder:text-slate-500 focus:ring-4"
                placeholder="Enter Username"
              />
            </span>
            {errors.username ? <span className="mt-1 block text-xs text-rose-300">{errors.username.message}</span> : null}
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-200">Password</span>
            <span className="relative block">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                className="h-12 w-full rounded-xl border border-white/10 bg-white/10 pl-10 pr-10 text-white outline-none ring-gold-500/30 transition placeholder:text-slate-500 focus:ring-4"
                placeholder="Password"
              />
              <Eye className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            </span>
            {errors.password ? <span className="mt-1 block text-xs text-rose-300">{errors.password.message}</span> : null}
          </label>

          <div className="flex items-center justify-between text-sm">
            <label className="inline-flex items-center gap-2 text-slate-300">
              <input {...register("remember")} type="checkbox" className="h-4 w-4 rounded border-white/20 accent-gold-500" />
              Remember me
            </label>
            <button type="button" className="font-semibold text-gold-100 hover:text-gold-300">Forgot Password</button>
          </div>

          <Button type="submit" loading={loading} className="h-12 w-full text-base">
            Login
          </Button>
        </form>
      </motion.section>
    </main>
  );
}
