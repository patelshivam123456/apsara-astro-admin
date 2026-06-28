import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    sidebarOpen: false,
    sidebarCollapsed: false,
    darkMode: true
  },
  reducers: {
    applyStoredTheme(state) {
      if (typeof window === "undefined") return;
      const stored = window.localStorage.getItem("apsra_theme");
      state.darkMode = stored ? stored === "dark" : true;
      document.documentElement.classList.toggle("dark", state.darkMode);
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      if (typeof window !== "undefined") {
        document.documentElement.classList.toggle("dark", state.darkMode);
        window.localStorage.setItem("apsra_theme", state.darkMode ? "dark" : "light");
      }
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    closeSidebar(state) {
      state.sidebarOpen = false;
    },
    toggleSidebarCollapsed(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    }
  }
});

export const { applyStoredTheme, toggleDarkMode, toggleSidebar, closeSidebar, toggleSidebarCollapsed } = uiSlice.actions;
export default uiSlice.reducer;
