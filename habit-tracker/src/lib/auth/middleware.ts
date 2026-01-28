import { verifyToken } from "@/lib/auth/jwt";
import { UnauthorizedError } from "@/lib/api-error";

export function requireAuth(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    throw new UnauthorizedError("Authorization header missing");
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    throw new UnauthorizedError("Invalid authorization format");
  }

  const decoded = verifyToken(token);

  return decoded;
}
