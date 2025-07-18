import { type ApiResponse, api } from "@/lib/api";
import { getAuthHeaders, getAuthToken } from "@/lib/auth";
import type { Group } from "@/types/common";

export async function getGroupByGroupId(
  groupId?: string,
  authToken?: string
): Promise<ApiResponse<{ data: Group }>> {
  const token = authToken || getAuthToken();
  if (!token) {
    return {
      success: false,
      error: "กรุณาเข้าสู่ระบบก่อนลงทะเบียน",
    };
  }

  if (!groupId) {
    return {
      success: false,
      error: "กรุณาใส่รหัสกลุ่ม",
    };
  }

  const response = await api.post<{ data: Group }>(
    "/group/getGroupByGroupId",
    { groupId },
    {
      headers: getAuthHeaders(token),
    }
  );

  if (!response.success) {
    console.error("Failed to fetch group by group ID:", response.error);
  }
  return response;
}

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
