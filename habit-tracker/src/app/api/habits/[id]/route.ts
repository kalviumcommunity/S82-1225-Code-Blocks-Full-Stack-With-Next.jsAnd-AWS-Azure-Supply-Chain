import { successResponse, handleApiError } from "@/lib/api-response";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { NotFoundError, UnauthorizedError } from "@/lib/api-error";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(req);

    const habit = await prisma.habit.findUnique({
      where: { id: params.id },
    });

    if (!habit) {
      throw new NotFoundError("Habit not found");
    }

    if (habit.userId !== user.id) {
      throw new UnauthorizedError("Access denied");
    }

    return successResponse(habit);
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

    const habit = await prisma.habit.findUnique({
      where: { id: params.id },
    });

    if (!habit) {
      throw new NotFoundError("Habit not found");
    }

    if (habit.userId !== user.id) {
      throw new UnauthorizedError("Access denied");
    }

    await prisma.habit.delete({
      where: { id: params.id },
    });

    return successResponse({ message: "Habit deleted" });
  } catch (error) {
    return handleApiError(error);
  }
}
