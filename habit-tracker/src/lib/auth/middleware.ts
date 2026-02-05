// lib/auth/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken, type JwtPayload } from "./jwt";
import { hasPermission, Permission } from "./rbac";

export async function requireAuth(req: Request): Promise<JwtPayload & { id: string }> {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    throw new Error("Unauthorized");
  }

  try {
    const token = authHeader.replace("Bearer ", "");
    const payload = verifyAccessToken(token);
    return {
      ...payload,
      id: payload.userId,
    };
  } catch {
    throw new Error("Invalid token");
  }
}

export function requireRole(userRole: string, allowedRoles: string[]): void {
  if (!allowedRoles.includes(userRole)) {
    throw new Error("Forbidden");
  }
}

export function withAuth(permission: Permission) {
  return (req: NextRequest) => {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    try {
      const token = authHeader.replace("Bearer ", "");
      const user = verifyAccessToken(token);

      const allowed = hasPermission(user.role, permission);

      console.log(
        `[RBAC] ${user.role} -> ${permission}: ${
          allowed ? "ALLOWED" : "DENIED"
        }`
      );

      if (!allowed) {
        return NextResponse.json(
          { error: "Forbidden" },
          { status: 403 }
        );
      }

      // Attach user to request (optional)
      (req as any).user = user;

      return NextResponse.next();
    } catch {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }
  };
}
