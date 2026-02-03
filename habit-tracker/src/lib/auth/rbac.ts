// lib/auth/rbac.ts

export type Role = "ADMIN" | "EDITOR" | "USER";

export type Permission =
  | "read"
  | "create"
  | "update"
  | "delete";

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  ADMIN: ["read", "create", "update", "delete"],
  EDITOR: ["read", "update"],
  USER: ["read"],
};

export function hasPermission(
  role: Role,
  permission: Permission
): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}
