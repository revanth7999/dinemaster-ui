import axios from "axios";
import { API_BASE_URL, TOKEN } from "../Constants";

// Create an axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor to add auth token dynamically
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN); // or sessionStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Optional: Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle global errors here (e.g., show toast, logout on 401, etc.)
    return Promise.reject(error);
  },
);

export default apiClient;
