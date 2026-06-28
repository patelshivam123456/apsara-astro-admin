import axios from "axios";
import toast from "react-hot-toast";
import { clearToken, getToken } from "@/utils/token";

const api = axios.create({
  baseURL: "/api/proxy",
  timeout: 20000
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearToken();
      toast.error("Session expired. Please login again.");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    } else if (error?.response?.status === 403) {
      toast.error("You do not have permission for this action.");
    } else if (error?.response?.status === 404) {
      toast.error("Requested resource was not found.");
    } else if (error?.response?.status >= 500) {
      toast.error("Server error. Please try again shortly.");
    } else if (error?.code === "ERR_NETWORK") {
      toast.error("Network error. Check your connection.");
    }

    return Promise.reject(error);
  }
);

export default api;
