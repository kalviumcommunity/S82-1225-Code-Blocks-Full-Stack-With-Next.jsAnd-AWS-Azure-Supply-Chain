import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasources: {
    db: {
      url: process.env.DATABASE_URL!,
    },
  },
  migrations: {
    path: "prisma/migrations",
    seed: "npx ts-node prisma/seed.ts",
  },
});
