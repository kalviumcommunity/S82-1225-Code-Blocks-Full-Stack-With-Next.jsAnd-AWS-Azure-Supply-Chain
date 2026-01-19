import { taskSchema } from "@/lib/schemas/taskSchema";
import { sendSuccess, sendError } from "@/lib/responseHandler";
import { ERROR_CODES } from "@/lib/errorCodes";
import { ZodError } from "zod";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const validatedData = taskSchema.parse(body);

    return sendSuccess(validatedData, "Task updated successfully", 200);

  } catch (error) {
    if (error instanceof ZodError) {
      return sendError(
        "Validation Error",
        ERROR_CODES.VALIDATION_ERROR,
        400,
        error.issues.map((e) => ({
          field: e.path[0],
          message: e.message,
        }))
      );
    }

    return sendError("Internal Error", ERROR_CODES.INTERNAL_ERROR, 500);
  }
}
