import { signToken } from "@/lib/auth/jwt";
import { comparePassword } from "@/lib/auth/password";
import { successResponse, handleApiError } from "@/lib/api-response";
import { UnauthorizedError } from "@/lib/api-error";

export async function POST() {
  try {
    // Fake user for now (DB comes later)
    const user = {
      id: "user-1",
      email: "test@example.com",
      password: "$2a$10$hashedpassword", // pretend hash
    };

    const passwordValid = await comparePassword(
      "password",
      user.password
    );

    if (!passwordValid) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
    });

    return successResponse({ token });
  } catch (error) {
    return handleApiError(error);
  }
}
