import { successResponse, handleApiError } from "@/lib/api-response";
import { BadRequestError, UnauthorizedError } from "@/lib/api-error";
import { loginSchema } from "@/lib/validators/auth";
import { comparePassword } from "@/lib/auth/password";
import { signToken } from "@/lib/auth/jwt";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      throw new BadRequestError(parsed.error.issues[0].message);
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const isPasswordValid = await comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
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
