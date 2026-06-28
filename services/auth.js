import api from "./api";

export async function loginAdmin({ username, password }) {
  const response = await api.post("/authorization/auth/login", { username, password });
  return response.data;
}
