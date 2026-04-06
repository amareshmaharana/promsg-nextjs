import { z } from "zod";

export const msgSchema = z.object({
  content: z
    .string()
    .min(10, "Content must be at least 10 characters long")
    .max(400, "Content must be at most 400 characters long"),
});
