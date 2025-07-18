// API utility functions
const API_BASE_URL =
  import.meta.env.PUBLIC_API_URL || "http://localhost:4321/api";

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

function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    const localToken = localStorage.getItem("auth_token");
    if (localToken) {
      return localToken;
    }

    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
    return tokenCookie ? decodeURIComponent(tokenCookie.split("=")[1]) : null;
  }

  return null;
}

function getAuthHeaders(): Record<string, string> {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
interface ApiResponseRaw {
  message?: string;
  error?: string;
}

export async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  const authHeaders = getAuthHeaders();

  const defaultHeaders = {
    "Content-Type": "application/json",
    ...authHeaders,
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
      let errorMsg = "Request failed";
      if (response.body) {
        try {
          const responseText = await response.text();
          const raw: ApiResponseRaw = JSON.parse(responseText);
          errorMsg = raw.error || raw.message || errorMsg;
        } catch {
          errorMsg = "Request failed";
        }
      }
      throw new ApiError(errorMsg, response.status, response);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
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

  patch: <T>(
    endpoint: string,
    data?: unknown,
    options?: RequestInit
  ): Promise<ApiResponse<T>> =>
    apiRequest<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    }),
};
