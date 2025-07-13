import { type ApiResponse, api } from "@/lib/api";
import type { RegisterFormData } from "@/types/rpkm-workshop/schema";

/**
 * Submits workshop registration data to the backend.
 * @param workshopId - The ID of the workshop.
 * @param formData - The registration form data (location, time).
 * @returns ApiResponse from the backend.
 */
export async function submitWorkshopRegistration(
  workshopId: string,
  formData: RegisterFormData
): Promise<ApiResponse<unknown>> {
  const response = await api.post("/workshop", {
    ...formData,
    workshopId,
  });
  if (!response.success) {
    console.error("Failed to submit workshop registration:", response.error);
    return response;
  }
  return { success: true };
}
