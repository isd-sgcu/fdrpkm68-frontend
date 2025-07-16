// API utility functions
const API_BASE_URL =
  import.meta.env.PUBLIC_API_URL || "http://localhost:8080/api";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: Response
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const requestOptions: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new ApiError(
        `API request failed: ${response.status} ${response.statusText}`,
        response.status,
        response
      );
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("API request error:", error);

    if (error instanceof ApiError) {
      return { success: false, error: error.message };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

// Convenience methods
export const api = {
  get: <T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> =>
    apiRequest<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(
    endpoint: string,
    data?: unknown,
    options?: RequestInit
  ): Promise<ApiResponse<T>> =>
    apiRequest<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T>(
    endpoint: string,
    data?: unknown,
    options?: RequestInit
  ): Promise<ApiResponse<T>> =>
    apiRequest<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> =>
    apiRequest<T>(endpoint, { ...options, method: "DELETE" }),
};
