import { NextResponse } from "next/server";

export const sendSuccess = (
  data: any,
  message: string = "Success",
  status: number = 200
) => {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
};

export const sendError = (
  message: string = "Something went wrong",
  code: string = "INTERNAL_ERROR",
  status: number = 500,
  details?: any
) => {
  return NextResponse.json(
    {
      success: false,
      message,
      error: {
        code,
        details,
      },
      timestamp: new Date().toISOString(),
    },
    { status }
  );
};
