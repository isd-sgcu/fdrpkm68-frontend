import { type ApiResponse, api } from "@/lib/api";
import type { WorkshopType } from "@/types/rpkm-workshop/schema";

export type SubmitWorkshopResponse = {
  id: string;
  userId: string;
  workshopType: WorkshopType;
  workshopTime: number;
};

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
