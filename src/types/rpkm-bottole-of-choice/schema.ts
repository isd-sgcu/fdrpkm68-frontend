import { z } from "zod";

export const bottleOfChoiceSchema = z.object({
  choice: z.enum(["A", "B", "C"], "กรุณาเลือกตัวเลือก").refine((val) => !!val, {
    message: "กรุณาเลือกตัวเลือก",
  }),
});

export type BottleOfChoiceFormData = z.infer<typeof bottleOfChoiceSchema>;
