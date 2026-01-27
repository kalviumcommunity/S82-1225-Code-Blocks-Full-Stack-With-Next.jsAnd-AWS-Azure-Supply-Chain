import { prisma } from "@/lib/prisma";

export async function getUserWithHabits(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      habits: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}
