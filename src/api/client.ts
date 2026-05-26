import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

const apiBaseUrl ="https://dashboard-i552.onrender.com/api";
console.log(apiBaseUrl)
export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: { "Accept": "application/json" },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
