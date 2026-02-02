import { successResponse, handleApiError } from "@/lib/api-response";
import { requireAuth, requireRole } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    // 1. Ensure user is authenticated
    const user = await requireAuth(req);

    // 2. Ensure user has ADMIN role
    requireRole(user.role, ["ADMIN"]);

    // 3. Fetch users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    // 4. Return success response
    return successResponse(users);
  } catch (error) {
    return handleApiError(error);
  }
}
