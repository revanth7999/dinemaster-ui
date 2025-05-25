import axios from "axios";
import { API_BASE_URL, TOKEN } from "../Constants";

export const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/refresh`,
      {},
      {
        withCredentials: true, // Important: send cookies
      },
    );
    const newAccessToken = response.data.accessToken;
    if (newAccessToken) {
      localStorage.setItem(TOKEN, newAccessToken);

      // Dispatch a custom event to notify token update
      window.dispatchEvent(new Event("token-set"));
    }
    return newAccessToken;
  } catch (error) {
    console.error("Token refresh failed", error);
    return null;
  }
};
