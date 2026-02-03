import { NextResponse } from "next/server";
import { verifyToken, signAccessToken } from "@/lib/auth/jwt";

export async function POST(req: Request) {
  const refreshToken = req.headers
    .get("cookie")
    ?.split("refreshToken=")[1];

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  try {
    const payload = verifyToken(refreshToken, "refresh");

    const newAccessToken = signAccessToken({
      userId: payload.userId,
      role: payload.role,
    });

    return NextResponse.json({ accessToken: newAccessToken });
  } catch {
    return NextResponse.json({ error: "Invalid refresh token" }, { status: 403 });
  }
}
