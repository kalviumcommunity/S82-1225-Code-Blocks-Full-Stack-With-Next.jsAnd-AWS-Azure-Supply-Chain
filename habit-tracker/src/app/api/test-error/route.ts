import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export async function GET() {
  try {
    logger.info("Test error route hit");

    throw new Error("Intentional test error for logging");

  } catch (error) {
    logger.error("Test error occurred", {
      error: String(error),
    });

    return NextResponse.json(
      { message: "Error logged successfully" },
      { status: 500 }
    );
  }
}
