export const serverEnv = {
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
};
export const env = {
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
};

// Safety checks (very important)
if (!serverEnv.databaseUrl) {
  throw new Error("DATABASE_URL is not defined");
}

if (!serverEnv.jwtSecret) {
  throw new Error("JWT_SECRET is not defined");
}
