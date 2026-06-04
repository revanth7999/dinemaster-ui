import {
  APP_BASE,
  AUTH_LOGOUT_URL,
  LOGIN_PAGE,
  TOKEN,
  USER_NAME,
} from "../Constants";
import apiClient from "./axiosUtil";
import { persistor } from "../../redux/store";
import { logout as logoutAction } from "../../redux/authSlice";

export async function handleLogout(dispatch) {
  try {
    await apiClient.post(AUTH_LOGOUT_URL, {
      username: localStorage.getItem(USER_NAME),
    });
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER_NAME);

    dispatch(logoutAction());
    await persistor.purge();

    window.location.href = APP_BASE + "#" + LOGIN_PAGE;
  }
}
