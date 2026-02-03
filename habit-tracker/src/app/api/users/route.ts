import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sanitizeInput } from "@/lib/sanitize";
import { userSchema } from "@/lib/validators/user";
import { logger } from "@/lib/logger";

const ALLOWED_ORIGIN = "http://localhost:3000"; // change in prod

export async function POST(req: Request) {
  try {
    const origin = req.headers.get("origin");

    if (origin !== ALLOWED_ORIGIN) {
      return NextResponse.json(
        { error: "CORS: Origin not allowed" },
        { status: 403 }
      );
    }

    const body = await req.json();

    // ✅ Validate structure
    const parsed = userSchema.parse(body);

    // ✅ Sanitize input
    const email = sanitizeInput(parsed.email);
    const role = parsed.role;

    const user = await prisma.user.create({
      data: {
        email,
        role,
      },
    });

    return NextResponse.json(user, {
      status: 201,
      headers: {
        "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? "Invalid input" },
      { status: 400 }
    );
  }
}


export async function GET() {
  try {
    logger.info("GET /api/users - request received");

    // Example data (replace with DB later)
    const users = [
      { id: "1", email: "admin@test.com", role: "ADMIN" },
      { id: "2", email: "user@test.com", role: "USER" },
    ];

    logger.info("GET /api/users - success", {
      userCount: users.length,
    });

    return NextResponse.json(users);
  } catch (error) {
    logger.error("GET /api/users - failed", {
      error: String(error),
    });

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
