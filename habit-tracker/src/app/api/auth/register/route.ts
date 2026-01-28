import { successResponse, handleApiError } from "@/lib/api-response";
import { BadRequestError } from "@/lib/api-error";
import { registerSchema } from "@/lib/validators/user";
import { hashPassword } from "@/lib/auth/password";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      throw new BadRequestError(parsed.error.issues[0].message);
    }

    const { email, password } = parsed.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestError("User already exists");
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return successResponse(
      {
        id: user.id,
        email: user.email,
      },
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}
