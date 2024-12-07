import axios from "axios";
import { getToken } from "../utils/auth";

const API_URL =
  import.meta.env.BACKEND_URL || "https://mswd-hackathon.onrender.com/api/v1";

const axiosInstance = axios.create({
  baseURL: `${API_URL}/projects`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Request config:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response:", {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error("Response error:", {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      config: error.config,
    });
    return Promise.reject(error);
  }
);

export const projectService = {
  getAllProjects: async () => {
    try {
      const response = await axiosInstance.get("/");
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        console.error("Unauthorized access. Please log in again.");
      }
      throw error;
    }
  },

  getCurrentProject: async (id) => {
    try {
      const response = await axiosInstance.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching project:", error);
      throw error;
    }
  },

  createProject: async (projectData) => {
    try {
      const response = await axiosInstance.post("/", projectData);
      return response.data;
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  },

  updateProject: async (id, projectData) => {
    try {
      const response = await axiosInstance.put(`/${id}`, projectData);
      return response.data;
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  },

  deleteProject: async (id) => {
    try {
      const response = await axiosInstance.delete(`/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  },
};

export default projectService;
