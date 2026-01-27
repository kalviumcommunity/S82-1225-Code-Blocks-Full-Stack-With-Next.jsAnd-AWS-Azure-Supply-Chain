import { successResponse, handleApiError } from "@/lib/api-response";
import { NotFoundError } from "@/lib/api-error";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      throw new NotFoundError("Habit ID not provided");
    }

    const habit = null;

    if (!habit) {
      throw new NotFoundError("Habit not found");
    }

    return successResponse({ habit });
  } catch (error) {
    return handleApiError(error);
  }
}
