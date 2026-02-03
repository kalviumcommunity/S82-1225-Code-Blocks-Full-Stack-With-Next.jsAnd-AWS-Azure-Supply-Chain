import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sanitizeInput } from "@/lib/sanitize";
import { userSchema } from "@/lib/validators/user";

export async function POST(req: Request) {
  try {
    // 1️⃣ Parse request body
    const body = await req.json();

    // 2️⃣ Validate structure with Zod
    const parsed = userSchema.parse(body);

    // 3️⃣ Sanitize user-controlled fields
    const email = sanitizeInput(parsed.email);
    const role = parsed.role;

    // 4️⃣ Create user safely
    const user = await prisma.user.create({
      data: {
        email,
        role,
      },
    });

    // 5️⃣ Return created user
    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    console.error("[USER_CREATE_ERROR]", error);

    return NextResponse.json(
      {
        error: error?.message || "Invalid or unsafe input",
      },
      { status: 400 }
    );
  }
}
