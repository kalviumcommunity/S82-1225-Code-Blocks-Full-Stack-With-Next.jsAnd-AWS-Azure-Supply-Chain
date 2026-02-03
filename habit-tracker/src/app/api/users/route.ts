import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth/middleware";

export const DELETE = async (req: NextRequest) => {
  const authResponse = withAuth("delete")(req);
  if (authResponse) return authResponse;

  // Delete user logic here
  return NextResponse.json({ message: "User deleted" });
};

export const GET = async (req: NextRequest) => {
  const authResponse = withAuth("read")(req);
  if (authResponse) return authResponse;

  return NextResponse.json([
    { id: 1, email: "admin@test.com", role: "ADMIN" },
  ]);
};
