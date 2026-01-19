import { sendSuccess, sendError } from "@/lib/responseHandler";
import { ERROR_CODES } from "@/lib/errorCodes";

export async function POST() {
  try {
    const task = { id: 101, title: "Learn Next.js API Handlers" };
    return sendSuccess(task, "Task created successfully", 201);
  } catch (err) {
    return sendError(
      "Task creation failed",
      ERROR_CODES.DATABASE_FAILURE,
      500,
      err
    );
  }
}
