import { z } from "zod";

export const createHabitSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export type CreateHabitInput = z.infer<typeof createHabitSchema>;
