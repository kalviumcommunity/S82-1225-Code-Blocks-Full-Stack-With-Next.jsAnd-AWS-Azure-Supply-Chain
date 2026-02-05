import { NextResponse } from "next/server";
import { signAccessToken, signRefreshToken } from "@/lib/auth/jwt";
import { verifyPassword } from "@/lib/auth/password";
import { loginSchema } from "@/lib/validators/auth";


export async function POST(req: Request) {
  const body = await req.json();
  const data = loginSchema.parse(body);

  // fake user (replace with Prisma later)
  const user = {
    id: "123",
    email: data.email,
    role: "USER",
    password: "$2a$10$hashedpassword",
  };

  const valid = await verifyPassword(data.password, user.password);
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const accessToken = signAccessToken({
    userId: user.id,
    role: user.role as "USER" | "ADMIN",
  });

  const refreshToken = signRefreshToken({
    userId: user.id,
    role: user.role as "USER" | "ADMIN",
  });

  const res = NextResponse.json({ accessToken });

  res.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/api/auth/refresh",
  });

  return res;
}
