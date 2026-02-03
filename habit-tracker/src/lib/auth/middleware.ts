import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./jwt";

export function authMiddleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    verifyToken(token, "access");
    return NextResponse.next();
  } catch {
    return NextResponse.json({ error: "Token expired" }, { status: 401 });
  }
}
