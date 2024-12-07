import axios from "axios";
import { getToken } from "../utils/auth";

const API_URL =
  import.meta.env.VITE_API_URL || "https://mswd-hackathon.onrender.com/api/v1";

const axiosInstance = axios.create({
  baseURL: `${API_URL}/templates`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const templateService = {
  getAllTemplates: async () => {
    const response = await axiosInstance.get("/");
    return response.data;
  },

  getTemplateById: async (id) => {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  },

  createProjectFromTemplate: async (templateId, projectName) => {
    const response = await axiosInstance.post(`/${templateId}/create`, {
      name: projectName,
    });
    return response.data;
  },
};

export default templateService;
