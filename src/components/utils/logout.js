import {
  AUTH_LOGOUT_URL,
  LOGIN_PAGE,
  TOKEN,
  USER_NAME,
} from "../Constants";
import apiClient from "./axiosUtil";

/**
 * Handles user logout by calling the logout endpoint, clearing local storage and cookies,
 * and redirecting to the login page.
 */
export async function handleLogout() {
  try {
    await apiClient.post(AUTH_LOGOUT_URL, {
      username: localStorage.getItem(USER_NAME),
    });

    // Clear storage
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER_NAME);

  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    window.location.href = LOGIN_PAGE;
  }
}
