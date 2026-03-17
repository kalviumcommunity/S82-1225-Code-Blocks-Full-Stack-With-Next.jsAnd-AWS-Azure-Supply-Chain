import { successResponse, handleApiError } from "@/lib/api-response";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { NotFoundError, UnauthorizedError } from "@/lib/api-error";

// POST /api/habits/[id]/log  — mark habit as done today
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(req);

    const habit = await prisma.habit.findUnique({
      where: { id: params.id },
    });

    if (!habit) throw new NotFoundError("Habit not found");
    if (habit.userId !== user.id) throw new UnauthorizedError("Access denied");

    // Normalize to midnight so one log per day
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await prisma.habitLog.findUnique({
      where: { habitId_date: { habitId: params.id, date: today } },
    });

    if (existing) {
      // Toggling: delete the log (un-mark)
      await prisma.habitLog.delete({ where: { id: existing.id } });
      return successResponse({ logged: false });
    }

    const log = await prisma.habitLog.create({
      data: { habitId: params.id, date: today, completed: true },
    });

    return successResponse({ logged: true, log }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}

// GET /api/habits/[id]/log  — get all logs for this habit
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(req);

    const habit = await prisma.habit.findUnique({
      where: { id: params.id },
    });

    if (!habit) throw new NotFoundError("Habit not found");
    if (habit.userId !== user.id) throw new UnauthorizedError("Access denied");

    const logs = await prisma.habitLog.findMany({
      where: { habitId: params.id },
      orderBy: { date: "desc" },
    });

    // Calculate current streak
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const found = logs.find(
        (l: { date: Date }) => new Date(l.date).toDateString() === d.toDateString()
      );
      if (found) {
        streak++;
      } else {
        break;
      }
    }

    return successResponse({ logs, streak });
  } catch (error) {
    return handleApiError(error);
  }
}
