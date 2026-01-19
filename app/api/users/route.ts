import { userSchema } from "@/lib/schemas/userSchema";
import { sendSuccess, sendError } from "@/lib/responseHandler";
import { ERROR_CODES } from "@/lib/errorCodes";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = userSchema.parse(body);

    // pretend DB save here
    return sendSuccess(validatedData, "User created successfully", 201);

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

    return sendError(
      "Internal Server Error",
      ERROR_CODES.INTERNAL_ERROR,
      500
    );
  }
}
