import { type ApiResponse, api } from "@/lib/api";
import { getAuthHeaders, getAuthToken } from "@/lib/auth";
import type { Group } from "@/types/common";

/**
 * Fetches group data from the backend.
 * @param authToken - Optional authentication token for server-side use.
 * @returns ApiResponse from the backend.
 */
export async function getGroupData(
  authToken?: string
): Promise<ApiResponse<{ data: Group }>> {
  const token = authToken || getAuthToken();
  if (!token) {
    return {
      success: false,
      error: "กรุณาเข้าสู่ระบบก่อนลงทะเบียน",
    };
  }

  const response = await api.get<{ data: Group }>("/group", {
    headers: getAuthHeaders(token),
  });
  if (!response.success) {
    console.error("Failed to fetch group data:", response.error);
  }
  return response;
}

/**
 * Fetches group data by invite code from the backend.
 * @param inviteCode - The invite code to search for.
 * @param authToken - Optional authentication token for server-side use.
 * @returns ApiResponse from the backend.
 */
export async function getGroupByInviteCode(
  inviteCode: string,
  authToken?: string
): Promise<ApiResponse<{ data: Group }>> {
  const token = authToken || getAuthToken();
  if (!token) {
    return {
      success: false,
      error: "กรุณาเข้าสู่ระบบก่อนลงทะเบียน",
    };
  }

  const response = await api.post<{ data: Group }>(
    "/group/groupByInviteCode",
    { inviteCode },
    {
      headers: getAuthHeaders(token),
    }
  );

  if (!response.success) {
    console.error("Failed to fetch group by invite code:", response.error);
  }
  return response;
}

/**
 * Join group data by invite code from the backend.
 * @param inviteCode - The invite code to search for.
 * @param authToken - Optional authentication token for server-side use.
 * @returns ApiResponse from the backend.
 */
export async function joinGroup(
  inviteCode: string,
  authToken?: string
): Promise<ApiResponse<unknown>> {
  const token = authToken || getAuthToken();
  if (!token) {
    return {
      success: false,
      error: "กรุณาเข้าสู่ระบบก่อนลงทะเบียน",
    };
  }

  const response = await api.post<{ message: string }>(
    "/group/join",
    { inviteCode },
    {
      headers: getAuthHeaders(token),
    }
  );

  if (!response.success) {
    console.error("Failed to join group:", response.error);
  }
  return response;
}

/**
 * Leave the current group.
 * @param authToken - Optional authentication token for server-side use.
 * @returns ApiResponse from the backend.
 */
export async function leaveGroup(
  authToken?: string
): Promise<ApiResponse<{ message: string }>> {
  const token = authToken || getAuthToken();
  if (!token) {
    return {
      success: false,
      error: "กรุณาเข้าสู่ระบบก่อนลงทะเบียน",
    };
  }

  const response = await api.delete<{ message: string }>("/group/leave", {
    headers: getAuthHeaders(token),
  });

  if (!response.success) {
    console.error("Failed to leave group:", response.error);
  }
  return response;
}
