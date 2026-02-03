import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const result = await prisma.$queryRaw`SELECT NOW()`;
    return NextResponse.json({
      status: "ok",
      dbTime: result,
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Database connection failed" },
      { status: 500 }
    );
  }
}
