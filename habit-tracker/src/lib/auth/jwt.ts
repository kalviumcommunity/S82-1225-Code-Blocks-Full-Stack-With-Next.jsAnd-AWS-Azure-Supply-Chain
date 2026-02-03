// lib/auth/jwt.ts
import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export type JwtPayload = {
  userId: string;
  role: "USER" | "ADMIN";
};

/* -------- SIGN TOKENS -------- */

export function signAccessToken(payload: JwtPayload) {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: "15m",
  });
}

export function signRefreshToken(payload: JwtPayload) {
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: "7d",
  });
}

/* -------- VERIFY TOKENS -------- */

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, ACCESS_SECRET) as JwtPayload;
}

export function verifyRefreshToken(token: string): JwtPayload {
  return jwt.verify(token, REFRESH_SECRET) as JwtPayload;
}
