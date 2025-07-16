import { type ApiResponse, api } from "@/lib/api";

function getAuthToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const localToken = localStorage.getItem("auth_token");
  if (localToken) {
    return localToken;
  }

  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
  return tokenCookie ? decodeURIComponent(tokenCookie.split("=")[1]) : null;
}

function getAuthHeaders(token?: string): Record<string, string> {
  const authToken = token || getAuthToken();
  return authToken ? { Authorization: `Bearer ${authToken}` } : {};
}

/**
 * Fetches user data from the backend.
 * @param authToken - Optional authentication token for server-side use.
 * @returns ApiResponse from the backend.
 */
export async function getProfile(
  authToken?: string
): Promise<ApiResponse<{ user: User }>> {
  const token = authToken || getAuthToken();
  if (!token) {
    return {
      success: false,
      error: "กรุณาเข้าสู่ระบบก่อนลงทะเบียน",
    };
  }

  const response = await api.get<{ user: User }>("/user", {
    headers: getAuthHeaders(token),
  });
  if (!response.success) {
    console.error("Failed to fetch user data:", response.error);
  }
  return response;
}
