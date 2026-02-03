// lib/auth/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "./jwt";
import { hasPermission, Permission } from "./rbac";

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
