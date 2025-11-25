// My Backend URLs
export const API_BASE_URL = "http://localhost:8080/dev";
export const AUTH_REGISTER_URL = "/register";
export const AUTH_LOGIN_URL = "/login";
export const AUTH_LOGOUT_URL = "/logout";
export const AUTH_SHOW_USERS = "/allUsers";
export const ALL_REST = "/restaurant/allRestaurants";
export const ALL_REST_PAG = "/restaurant/restaurants";
export const ALL_REST_PAG_SEA = "/restaurant/restaurantssearch";
export const AUTH_GET_ROLES = "/admin/roles";

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
export const BASE_PAGE_PATH = "/dinemaster-ui";
export const LOGIN_PAGE = "/dinemaster-ui/login";
export const LANDING_PAGE = "/dinemaster-ui/landing";
export const RES_PAGE = "/dinemaster-ui/restaurants";
export const ADMIN_LANDING_PAGE = "/dinemaster-ui/adminlanding";
export const CREATE_USER_PAGE = "/dinemaster-ui/create-user";
export const OAUTH_PAGE = "/dinemaster-ui/oauth-success";

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
export const INTERNAL_SERVER_ERROR = "Internal Server Error";
export const SERVICE_UNAVAILABLE = "Service Unavailable";
export const GATEWAY_TIMEOUT = "Gateway Timeout";

// Custom App-Level Errors
export const VALIDATION_ERROR = "Validation Failed";
export const NETWORK_ERROR = "Network Error. Please check your connection.";
export const UNKNOWN_ERROR = "An unknown error occurred";

// HTTP Status Codes (optional, if needed)
export const STATUS_OK = 200;
export const STATUS_CREATED = 201;
export const STATUS_BAD_REQUEST = 400;
export const STATUS_UNAUTHORIZED = 401;
export const STATUS_FORBIDDEN = 403;
export const STATUS_NOT_FOUND = 404;
export const STATUS_SERVER_ERROR = 500;
