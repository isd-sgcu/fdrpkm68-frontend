import { type ApiResponse, api } from "@/lib/api";
import { getAuthHeaders, getAuthToken } from "@/lib/auth";

export interface SetHousePreferencesRequest {
  houseRank1: string;
  houseRank2: string;
  houseRank3: string;
  houseRank4: string;
  houseRank5: string;
  houseRankSub?: string;
}

/**
 * Updates house preferences for the current user's group.
 * @param preferences - The house ranking preferences to set.
 * @param authToken - Optional authentication token for server-side use.
 * @returns ApiResponse containing the updated group and preferences.
 */
export async function setHousePreferences(
  preferences: SetHousePreferencesRequest,
  authToken?: string
): Promise<
  ApiResponse<{
    groupId: string;
    updatedPreferences: SetHousePreferencesRequest;
    message: string;
  }>
> {
  const token = authToken || getAuthToken();
  if (!token) {
    return {
      success: false,
      error: "กรุณาเข้าสู่ระบบก่อนลงทะเบียน",
    };
  }

  const response = await api.post<{
    groupId: string;
    updatedPreferences: SetHousePreferencesRequest;
    message: string;
  }>("/group/house-preferences", preferences, {
    headers: getAuthHeaders(token),
  });

  if (!response.success) {
    console.error("Failed to set house preferences:", response.error);
  }
  return response;
}

/**
 * Fetches house preferences for the current user's group.
 * @param authToken - Optional authentication token for server-side use.
 * @returns ApiResponse containing the house preferences.
 */
export async function getHousePreferences(
  authToken?: string
): Promise<ApiResponse<{ data: SetHousePreferencesRequest }>> {
  const token = authToken || getAuthToken();
  if (!token) {
    return {
      success: false,
      error: "กรุณาเข้าสู่ระบบก่อนลงทะเบียน",
    };
  }

  const response = await api.get<{ data: SetHousePreferencesRequest }>(
    "/group/house-preferences",
    {
      headers: getAuthHeaders(token),
    }
  );

  if (!response.success) {
    console.error("Failed to fetch house preferences:", response.error);
  }
  return response;
}
