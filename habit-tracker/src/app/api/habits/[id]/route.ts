import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    return errorResponse("Habit ID is required", 400);
  }

  return successResponse({
    habitId: params.id,
  });
}
