import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

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
