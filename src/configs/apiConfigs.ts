const apiUrl = import.meta.env.VITE_API_URL;

export const API_CONFIG = {
  BASE_URL: apiUrl || 'http://localhost:3000/api',
  // TIMEOUT: 100000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  STATUS_CODES: {
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
  },
} as const;
