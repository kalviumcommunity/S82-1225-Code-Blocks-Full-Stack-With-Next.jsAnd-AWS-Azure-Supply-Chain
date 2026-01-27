import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      password: "hashed-password",
      habits: {
        create: [
          {
            name: "Daily Exercise",
            description: "30 minutes workout",
          },
          {
            name: "Read Books",
            description: "Read 10 pages",
          },
        ],
      },
    },
  });

  console.log("Seed data created:", user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
