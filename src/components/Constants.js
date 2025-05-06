// AWS API URLs
export const API_BASE_URL =
  "https://szqd9lxru4.execute-api.ap-south-1.amazonaws.com/dev";
export const AUTH_REGISTER_URL = `${API_BASE_URL}/auth/register`;
export const AUTH_LOGIN_URL = `${API_BASE_URL}/auth/login`;
// export const ALL_REST = `${API_BASE_URL}/restaurant/allRestaurants`;
export const SAVE_CART = `${API_BASE_URL}/cart/save`;

//My Backend URLs
export const MB_API_BASE_URL = "http://localhost:8080";
export const MB_AUTH_REGISTER_URL = `${MB_API_BASE_URL}/dev/register`;
export const MB_AUTH_LOGIN_URL = `${MB_API_BASE_URL}/dev/login`;
export const MB_AUTH_SHOW_USERS = `${MB_API_BASE_URL}/dev/allUsers`;
export const ALL_REST = `${MB_API_BASE_URL}/restaurant/allRestaurants`;

// Roles
export const ROLES = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  GUEST: "GUEST",
};

// Other constants
export const APP_NAME = "Dine Master";
export const MAX_LOGIN_ATTEMPTS = 5;

// Title contants
export const CREATE_USER = "Create User";
export const LOGIN = "Login";
export const LANDING = "Dashboard";
export const ADMIN_LANDING = "Admin Dashboard";

// https://szqd9lxru4.execute-api.ap-south-1.amazonaws.com/dev
// export const API_BASE_URL = 'https://l31nxgup2m.execute-api.ap-south-1.amazonaws.com/dev';
