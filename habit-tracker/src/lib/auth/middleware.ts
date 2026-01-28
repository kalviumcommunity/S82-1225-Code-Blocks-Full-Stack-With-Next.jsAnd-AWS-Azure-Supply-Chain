import { verifyToken } from "@/lib/auth/jwt";
import { UnauthorizedError, BadRequestError } from "@/lib/api-error";
import { prisma } from "@/lib/prisma";
import type { Role } from "@/lib/auth/types";

export async function requireAuth(request: Request) {
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
      createdAt: true,
    },
  });

  if (!user) {
    throw new UnauthorizedError("User not found");
  }

  return user;
}

export function requireRole(userRole: Role, allowedRoles: Role[]) {
  if (!allowedRoles.includes(userRole)) {
    throw new BadRequestError("Insufficient permissions");
  }
}
