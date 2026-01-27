import { prisma } from "@/lib/prisma";
import type { PrismaClient } from "@prisma/client";

export async function createUserWithHabits() {
  return await prisma.$transaction(async (tx: any) => {
    const user = await tx.user.create({
      data: {
        email: "transaction@example.com",
        password: "secure-password",
      },
    });

    await tx.habit.createMany({
      data: [
        {
          name: "Meditation",
          userId: user.id,
        },
        {
          name: "Journaling",
          userId: user.id,
        },
      ],
    });

    return user;
  });
}
