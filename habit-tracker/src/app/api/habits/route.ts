import { successResponse, handleApiError } from "@/lib/api-response";
import { requireAuth } from "@/lib/auth/middleware";

export async function GET(req: Request) {
  try {
    const user = requireAuth(req);

    return successResponse({
      message: "Protected habits list",
      user,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
