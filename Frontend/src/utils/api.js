import axios from "axios";
import { getToken } from "./auth";
const url = import.meta.env.BACKEND_URL || "http://localhost:3000";
const api = axios.create({
  baseURL: `${url}/api/v1`,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
