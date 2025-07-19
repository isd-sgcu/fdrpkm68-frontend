import { type ApiResponse, api } from "@/lib/api";
import { getAuthHeaders, getAuthToken } from "@/lib/auth";

export type HouseResponse = {
  id: string;
  nameThai: string;
  nameEnglish: string;
  descriptionThai: string;
  descriptionEnglish: string;
  sizeLetter: string;
  chosenCount: number;
  capacity: number;
  instagram: string;
  facebook: string;
  tiktok: string;
};

export async function getAllHouses(
  authToken?: string
): Promise<ApiResponse<{ data: HouseResponse[] }>> {
  const token = authToken || getAuthToken();
  if (!token) {
    return {
      success: false,
      error: "กรุณาเข้าสู่ระบบก่อนลงทะเบียน",
    };
  }

  const response = await api.get<{ data: HouseResponse[] }>("/houses", {
    headers: getAuthHeaders(token),
  });

  if (!response.success && !response.data) {
    console.error("Failed to fetch house data:", response.error);
  }
  return response;
}
