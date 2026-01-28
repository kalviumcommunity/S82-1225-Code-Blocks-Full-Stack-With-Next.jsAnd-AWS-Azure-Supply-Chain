import { NextResponse } from "next/server";
import { ApiError } from "./api-error";

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export function successResponse<T>(
  data: T,
  status = 200
) {
  return NextResponse.json(
    { success: true, data } as ApiResponse<T>,
    { status }
  );
}

export function handleApiError(error: unknown) {
  if (error instanceof ApiError) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.statusCode }
    );
  }

  console.error("Unhandled API error:", error);

  return NextResponse.json(
    { success: false, error: "Internal Server Error" },
    { status: 500 }
  );
}
