import axios, { AxiosError, AxiosInstance } from 'axios';
import { API_CONFIG } from '../../configs/apiConfigs';
import { ApiError, RequestConfig } from './types';

// Pure utility functions
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const getAuthToken = (): string | null =>
  typeof window !== 'undefined' ? localStorage.getItem('token') : null;

const createApiError = (error: AxiosError): ApiError => ({
  code: error.code || 'UNKNOWN_ERROR',
  message: error.message || 'An unexpected error occurred',
  status: error.response?.status || 500,
});

const shouldRetry = (error: AxiosError, config: RequestConfig): boolean => {
  console.log('error', error); // TODO : this line needs to be removed
  if (!config.retry) return false;
  if (!config.retryAttempts) config.retryAttempts = 0;
  return (
    config.retryAttempts < (config.retryDelay || API_CONFIG.RETRY_ATTEMPTS)
  );
};

const handleUnauthorized = (): void => {
  localStorage.removeItem('token');
  // Add your logout or redirect logic here
};

// Request interceptor
const createRequestInterceptor = (axiosInstance: AxiosInstance) => {
  return axiosInstance.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(createApiError(error))
  );
};

// Response interceptor
const createResponseInterceptor = (axiosInstance: AxiosInstance) => {
  return axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RequestConfig;

      if (shouldRetry(error, originalRequest)) {
        originalRequest.retryAttempts =
          (originalRequest.retryAttempts || 0) + 1;
        await delay(originalRequest.retryDelay || API_CONFIG.RETRY_DELAY);
        return axiosInstance(originalRequest);
      }

      if (error.response?.status === API_CONFIG.STATUS_CODES.UNAUTHORIZED) {
        handleUnauthorized();
      }

      return Promise.reject(error);
    }
  );
};

// Create API instance with interceptors
const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    // timeout: API_CONFIG.TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  createRequestInterceptor(instance);
  createResponseInterceptor(instance);

  return instance;
};

// Create and export a singleton instance
export const api = createApiInstance();
