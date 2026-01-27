import { NextResponse } from "next/server";

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export function successResponse<T>(
  data: T,
  status: number = 200
) {
  const response: ApiResponse<T> = {
    success: true,
    data,
  };

  return NextResponse.json(response, { status });
}

export function errorResponse(
  error: string,
  status: number = 500
) {
  const response: ApiResponse<null> = {
    success: false,
    error,
  };

  return NextResponse.json(response, { status });
}
