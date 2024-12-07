import axios from "axios";
import { getToken } from "./auth";
const url =
  import.meta.env.BACKEND_URL || "https://mswd-hackathon.onrender.com";
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
