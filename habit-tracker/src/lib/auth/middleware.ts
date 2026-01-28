import { verifyToken } from "@/lib/auth/jwt";
import { UnauthorizedError } from "@/lib/api-error";
import { prisma } from "@/lib/prisma";

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
      createdAt: true,
    },
  });

  if (!user) {
    throw new UnauthorizedError("User not found");
  }

  return user;
}
