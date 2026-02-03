import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  role: z.enum(["user", "admin"]).default("user"),
});

export type User = z.infer<typeof userSchema>;