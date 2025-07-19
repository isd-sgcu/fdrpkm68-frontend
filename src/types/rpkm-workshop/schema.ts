import { z } from "zod";

export const registerSchema = z.object({
  location: z.string().min(1, "กรุณาเลือกสถานที่ให้ถูกต้อง"),
  time: z.string().min(1, "กรุณาเลือกเวลาให้ถูกต้อง"),
});
export type RegisterFormData = z.infer<typeof registerSchema>;

export enum WorkshopType {
  KEYCHAIN = "KEYCHAIN",
  DIFFUSER = "DIFFUSER",
}
