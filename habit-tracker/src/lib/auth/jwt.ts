import jwt from "jsonwebtoken";
import { env } from "@/lib/env";

export interface JwtPayload {
  userId: string;
  role: string;
}

/* ---------- ACCESS TOKEN ---------- */
export function signAccessToken(payload: JwtPayload) {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
}

/* ---------- REFRESH TOKEN ---------- */
export function signRefreshToken(payload: JwtPayload) {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
}

/* ---------- VERIFY TOKEN ---------- */
export function verifyToken(token: string, type: "access" | "refresh") {
  const secret =
    type === "access"
      ? env.JWT_ACCESS_SECRET
      : env.JWT_REFRESH_SECRET;

  return jwt.verify(token, secret) as JwtPayload;
}
