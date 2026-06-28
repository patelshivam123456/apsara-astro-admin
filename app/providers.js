"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { hydrateAuthFromStorage } from "@/redux/auth/authSlice";
import { applyStoredTheme } from "@/redux/ui/uiSlice";

export default function Providers({ children }) {
  useEffect(() => {
    store.dispatch(hydrateAuthFromStorage());
    store.dispatch(applyStoredTheme());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
