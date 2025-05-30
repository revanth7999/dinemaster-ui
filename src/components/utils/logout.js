import { AUTH_LOGOUT_URL, LOGIN_PAGE, TOKEN, USER_NAME } from "../Constants";
import apiClient from "./axiosUtil";

export async function handleLogout() {
  try {
    // Call logout endpoint via your Axios instance
    await apiClient.post(AUTH_LOGOUT_URL);

    // Clear storage
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER_NAME);

    // Delete cookies
    document.cookie.split(";").forEach((cookie) => {
      const name = cookie.trim().split("=")[0];
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    // Redirect to login page regardless of error
    window.location.href = LOGIN_PAGE;
  }
}
