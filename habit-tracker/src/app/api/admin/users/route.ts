import { successResponse, handleApiError } from "@/lib/api-response";
import { requireAuth, requireRole } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const user = await requireAuth(req);

    requireRole(user.role, ["ADMIN"]);

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return successResponse(users);
  } catch (error) {
    return handleApiError(error);
  }
}
