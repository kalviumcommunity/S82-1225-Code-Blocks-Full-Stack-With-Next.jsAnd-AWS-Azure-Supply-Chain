import { successResponse, handleApiError } from "@/lib/api-response";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { createHabitSchema } from "@/lib/validators/habit";
import { BadRequestError } from "@/lib/api-error";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const user = await requireAuth(req);

    const habits = await prisma.habit.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return successResponse(habits);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireAuth(req);
    const body = await req.json();

    const parsed = createHabitSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestError(parsed.error.issues[0].message);
    }

    const habit = await prisma.habit.create({
      data: {
        ...parsed.data,
        userId: user.id, // 🔐 ownership enforced
      },
    });

    return successResponse(habit, 201);
  } catch (error) {
    return handleApiError(error);
  }
}

