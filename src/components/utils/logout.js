import { LOGIN_PAGE, TOKEN, USER_NAME } from "../Constants";

export function handleLogout() {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(USER_NAME);
  // Optionally show a logout message or modal
  window.location.href = LOGIN_PAGE;
}
