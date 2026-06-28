"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { getToken } from "@/utils/token";

export function useProtectedRoute() {
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!getToken() && !isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);
}
