import axios from "axios";
import { API_BASE_URL, TOKEN } from "../Constants";
import { handleLogout } from "./logout";
import { store } from "../../redux/store";
import {
  backendDown,
  backendUp,
} from "../../redux/backendStatusSlice";

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

// Flag to prevent multiple refresh calls
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Backend is reachable
    store.dispatch(backendUp());

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Backend unreachable (server down, timeout, network error)
    if (!error.response) {
      store.dispatch(backendDown());
      return Promise.reject(error);
    }

    if (error.response?.status === 503) {
      store.dispatch(backendMaintenance());
      return Promise.reject(error);
    }

    // Backend responded
    store.dispatch(backendUp());

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] =
              `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const response = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );
        const newToken =
          response.data.data.tokens.accessToken;
        localStorage.setItem(TOKEN, newToken);
        apiClient.defaults.headers["Authorization"] =
          `Bearer ${newToken}`;

        processQueue(null, newToken);

        originalRequest.headers["Authorization"] =
          `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        handleLogout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
