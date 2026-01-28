import jwt from "jsonwebtoken";
import type { Role } from "./types";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export type JwtPayload = {
  userId: string;
  email: string;
  role: Role;
};

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
