// API URLs
export const API_BASE_URL = 'http://localhost:8081';
export const AUTH_REGISTER_URL = `${API_BASE_URL}/auth/register`;
export const AUTH_LOGIN_URL = `${API_BASE_URL}/auth/login`;

// Roles
export const ROLES = {
  ADMIN: 'ADMIN',
  CUSTOMER: 'CUSTOMER',
  GUEST: 'GUEST',
};

// Other constants
export const APP_NAME = 'Dine Master';
export const MAX_LOGIN_ATTEMPTS = 5;
