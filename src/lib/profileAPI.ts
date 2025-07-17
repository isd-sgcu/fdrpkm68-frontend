import { type ApiResponse, api } from "@/lib/api";
import { getAuthHeaders, getAuthToken } from "@/lib/auth";
import type { User } from "@/types/common";

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
