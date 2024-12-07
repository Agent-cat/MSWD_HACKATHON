import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "https://mswd-hackathon.onrender.com/api/v1",
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
