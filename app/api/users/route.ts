import { sendSuccess, sendError } from "@/lib/responseHandler";
import { ERROR_CODES } from "@/lib/errorCodes";

export async function GET() {
  try {
    const users = [{ id: 1, name: "Alice" }];
    return sendSuccess(users, "Users fetched successfully", 200);
  } catch (err) {
    return sendError(
      "Failed to fetch users",
      ERROR_CODES.INTERNAL_ERROR,
      500,
      err
    );
  }
}
