import { successResponse } from "@/lib/api-response";

export async function GET() {
  return successResponse({
    message: "List habits",
  });
}

export async function POST() {
  return successResponse(
    { message: "Create habit" },
    201
  );
}
