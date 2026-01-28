export type Role = "USER" | "ADMIN";

export type AuthUser = {
  id: string;
  email: string;
  role: Role;
};
