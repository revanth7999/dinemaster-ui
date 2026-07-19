const DEV_URL = "https://localhost:8443/api";
// const PROD_URL = "https://mybackend-mn6p.onrender.com/api";
const PROD_URL = "https://100.104.75.116:8443/api";
// de

export const API_BASE_URL = import.meta.env.DEV
  ? DEV_URL
  : PROD_URL;

// My Backend URLs
export const AUTH_REGISTER_URL = "/auth/register";
export const AUTH_LOGIN_URL = "/auth/login";
export const AUTH_LOGOUT_URL = "/auth/logout";
export const AUTH_SHOW_USERS = "/users";
export const ALL_REST = "/restaurants";
export const AUTH_GET_ROLES = "/admin/roles";
export const AUTH_UPDATE = "/admin/update/";
export const CART_SAVE = "/cart/add";
export const GET_USER_CART = "/cart/getUserCart/";

// Roles
export const ROLES = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  GUEST: "GUEST",
};

// Other constants
export const APP_NAME = "Dine Master";
export const MAX_LOGIN_ATTEMPTS = 5;
export const TOKEN = "authToken";
export const USER_NAME = "user";

// Title contants
export const CREATE_USER = "Create User";
export const LOGIN = "Login";
export const LANDING = "Dashboard";
export const ADMIN_LANDING = "Admin Dashboard";

// Route Constants
export const APP_BASE = "/dinemaster-ui";
export const BASE_PAGE_PATH = "/";
export const LOGIN_PAGE = "/login";
export const LANDING_PAGE = "/landing";
export const RES_PAGE = "/restaurants";
export const ADMIN_LANDING_PAGE = "/adminlanding";
export const CREATE_USER_PAGE = "/create-user";
export const OAUTH_PAGE = "/oauth-success";

// Success Messages
export const SUCCESS = "Success";
export const CREATED = "Resource Created Successfully";
export const UPDATED = "Resource Updated Successfully";
export const DELETED = "Resource Deleted Successfully";

// Client Errors
export const BAD_REQUEST = "Bad Request";
export const UNAUTHORIZED = "Unauthorized Access";
export const FORBIDDEN = "Access Forbidden";
export const NOT_FOUND = "Resource Not Found";

// Server Errors
export const INTERNAL_SERVER_ERROR =
  "Internal Server Error";
export const SERVICE_UNAVAILABLE = "Service Unavailable";
export const GATEWAY_TIMEOUT = "Gateway Timeout";

// Custom App-Level Errors
export const VALIDATION_ERROR = "Validation Failed";
export const NETWORK_ERROR =
  "Network Error. Please check your connection.";
export const UNKNOWN_ERROR = "An unknown error occurred";

// HTTP Status Codes (optional, if needed)
export const STATUS_OK = 200;
export const STATUS_CREATED = 201;
export const STATUS_BAD_REQUEST = 400;
export const STATUS_UNAUTHORIZED = 401;
export const STATUS_FORBIDDEN = 403;
export const STATUS_NOT_FOUND = 404;
export const STATUS_SERVER_ERROR = 500;

export const BACKEND_STATUS = {
  UP: "UP",
  DOWN: "DOWN",
  MAINTENANCE: "MAINTENANCE",
};
