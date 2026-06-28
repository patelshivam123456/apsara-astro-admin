const TOKEN_KEY = "apsra_access_token";
const SESSION_COOKIE = "apsra_session";

export function persistToken(token, remember = false) {
  if (typeof window === "undefined") return;
  const storage = remember ? window.localStorage : window.sessionStorage;
  const otherStorage = remember ? window.sessionStorage : window.localStorage;
  storage.setItem(TOKEN_KEY, token);
  otherStorage.removeItem(TOKEN_KEY);
  document.cookie = `${SESSION_COOKIE}=1; path=/; SameSite=Lax`;
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(TOKEN_KEY) || window.localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(TOKEN_KEY);
  document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}
