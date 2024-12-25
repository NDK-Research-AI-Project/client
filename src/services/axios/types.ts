export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message: string;
}

export interface ApiError {
  code: string;
  message: string;
  status: number;
}

export interface RequestConfig
  extends Partial<import('axios').AxiosRequestConfig> {
  retry?: boolean;
  retryAttempts?: number;
  retryDelay?: number;
}
