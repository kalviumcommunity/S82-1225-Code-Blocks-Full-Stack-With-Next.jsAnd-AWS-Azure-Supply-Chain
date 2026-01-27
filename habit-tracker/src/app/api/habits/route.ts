import { successResponse, handleApiError } from "@/lib/api-response";
import { BadRequestError } from "@/lib/api-error";
import { createHabitSchema } from "@/lib/validators/habit";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = createHabitSchema.safeParse(body);

    if (!parsed.success) {
      throw new BadRequestError(
        parsed.error.issues[0].message
      );
    }

    const habit = {
      id: "temp-id",
      ...parsed.data,
    };

    return successResponse(habit, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
