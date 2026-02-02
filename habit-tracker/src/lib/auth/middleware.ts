import { verifyToken } from "@/lib/auth/jwt";
import { UnauthorizedError, ForbiddenError } from "@/lib/api-error";
import { prisma } from "@/lib/prisma";

/* =========================
   Types
========================= */
export type AuthUser = {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
};

/* =========================
   Require Authentication
========================= */
export async function requireAuth(request: Request): Promise<AuthUser> {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    throw new UnauthorizedError("Authorization header missing");
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    throw new UnauthorizedError("Invalid authorization format");
  }

  const decoded = verifyToken(token);

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });

  if (!user) {
    throw new UnauthorizedError("User not found");
  }

  return user;
}

/* =========================
   Require Role
========================= */
export function requireRole(
  role: AuthUser["role"],
  allowedRoles: AuthUser["role"][]
) {
  if (!allowedRoles.includes(role)) {
    throw new ForbiddenError("You do not have permission to access this resource");
  }
}
