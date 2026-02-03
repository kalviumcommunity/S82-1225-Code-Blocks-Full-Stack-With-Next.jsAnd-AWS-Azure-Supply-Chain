import { NextResponse } from "next/server";
import {
  verifyRefreshToken,
  signAccessToken,
} from "@/lib/auth/jwt";

export async function POST(req: Request) {
  const cookieHeader = req.headers.get("cookie");

  const refreshToken = cookieHeader
    ?.split("; ")
    .find((c) => c.startsWith("refreshToken="))
    ?.split("=")[1];

  if (!refreshToken) {
    return NextResponse.json(
      { error: "No refresh token" },
      { status: 401 }
    );
  }

  try {
    const payload = verifyRefreshToken(refreshToken);

    const newAccessToken = signAccessToken({
      userId: payload.userId,
      role: payload.role,
    });

    return NextResponse.json({
      accessToken: newAccessToken,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid refresh token" },
      { status: 403 }
    );
  }
}
