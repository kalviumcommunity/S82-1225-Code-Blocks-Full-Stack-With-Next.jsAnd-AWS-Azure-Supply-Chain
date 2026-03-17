import { successResponse, handleApiError } from "@/lib/api-response";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { NotFoundError, UnauthorizedError } from "@/lib/api-error";
import { updateHabitSchema } from "@/lib/validators/habit";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(req);

    const habit = await prisma.habit.findUnique({
      where: { id: params.id },
      include: { logs: { orderBy: { date: "desc" }, take: 30 } },
    });

    if (!habit) throw new NotFoundError("Habit not found");
    if (habit.userId !== user.id) throw new UnauthorizedError("Access denied");

    return successResponse(habit);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(req);
    const body = await req.json();

    const habit = await prisma.habit.findUnique({ where: { id: params.id } });

    if (!habit) throw new NotFoundError("Habit not found");
    if (habit.userId !== user.id) throw new UnauthorizedError("Access denied");

    const parsed = updateHabitSchema.safeParse(body);
    if (!parsed.success) {
      return successResponse({ error: parsed.error.issues[0].message }, 400);
    }

    const updated = await prisma.habit.update({
      where: { id: params.id },
      data: parsed.data,
    });

    return successResponse(updated);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(req);

    const habit = await prisma.habit.findUnique({ where: { id: params.id } });

    if (!habit) throw new NotFoundError("Habit not found");
    if (habit.userId !== user.id) throw new UnauthorizedError("Access denied");

    await prisma.habit.delete({ where: { id: params.id } });

    return successResponse({ message: "Habit deleted" });
  } catch (error) {
    return handleApiError(error);
  }
}
