import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  role: z.enum(["USER", "ADMIN"]).default("USER"),
});

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type User = z.infer<typeof userSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;