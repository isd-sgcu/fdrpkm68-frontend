import { type ApiResponse, api } from "@/lib/api";
import type { BottleOfChoiceFormData } from "@/types/rpkm-bottole-of-choice/schema";

/**
 * Submits the bottle of choice selection to the backend.
 * @param formData - The bottle of choice form data.
 * @returns ApiResponse from the backend.
 */
export async function submitBottleOfChoice(
  formData: BottleOfChoiceFormData
): Promise<ApiResponse<unknown>> {
  const response = await api.patch("/user/water-bottle", {
    bottleChoice: formData.choice,
  });
  if (!response.success) {
    console.error("Failed to submit bottle of choice:", response.error);
    return response;
  }
  return { success: true };
}
