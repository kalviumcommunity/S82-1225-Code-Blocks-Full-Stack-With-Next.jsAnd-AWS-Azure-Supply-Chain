import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // MongoDB: use a simple findFirst to verify connectivity
    await prisma.user.findFirst();
    return NextResponse.json({
      status: "ok",
      db: "MongoDB",
      time: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Database connection failed" },
      { status: 500 }
    );
  }
}
