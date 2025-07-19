import { type ApiResponse, api } from "@/lib/api";
import type { WorkshopType } from "@/types/rpkm-workshop/schema";

export interface SubmitWorkshopResponse {
  id: string;
  userId: string;
  workshopType: WorkshopType;
  workshopTime: number;
}

export interface workshopParticipantCountType {
  workshopType: WorkshopType;
  count: number;
}

export interface RPKMworkshop {
  id: string;
  workshopType: WorkshopType;
  userId: string;
  workshopTime: number;
}

/**
 * Submits workshop registration data to the backend.
 * @param workshopId - The ID of the workshop.
 * @param formData - The registration form data (location, time).
 * @returns ApiResponse from the backend.
 */
export async function submitWorkshopRegistration(
  workshopType: WorkshopType,
  timeSlot: number
): Promise<ApiResponse<SubmitWorkshopResponse>> {
  const response = await api.post("/workshop", {
    workshopType,
    workshopTime: timeSlot,
  });
  if (!response.success) {
    console.error("Failed to submit workshop registration:", response.error);
    return { success: false, error: response.error };
  }
  return { success: true, data: response.data as SubmitWorkshopResponse };
}

/**
 * Retrieves all RPKM workshops registered by the current user.
 * @returns ApiResponse containing an array of registered workshops.
 */
export async function getWorkshopsOfUserId(): Promise<
  ApiResponse<RPKMworkshop[]>
> {
  const response = await api.get<{ data: RPKMworkshop[] }>("/workshop/me");
  if (!response.success) {
    console.error(
      "Failed to fetch user's registered workshops:",
      response.error
    );
    return { success: false, error: response.error };
  }
  return { success: true, data: response.data?.data as RPKMworkshop[] };
}

/**
 * Retrieves participant counts for all RPKM workshops.
 * @returns ApiResponse containing an array of participant count objects.
 */
export async function getWorkshopsParticipantCounts(
  token?: string
): Promise<ApiResponse<workshopParticipantCountType[]>> {
  const response = await api.get<{ data: workshopParticipantCountType[] }>(
    "/workshop/counts",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.success) {
    console.error(
      "Failed to fetch workshop participant counts:",
      response.error
    );
    return { success: false, error: response.error };
  }
  return {
    success: true,
    data: response.data?.data as workshopParticipantCountType[],
  };
}
