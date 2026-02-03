import { NextResponse } from "next/server";
import { getSecrets } from "@/lib/secrets";

export async function GET() {
  try {
    const secrets = await getSecrets();

    return NextResponse.json({
      message: "Secrets loaded successfully",
      keys: Object.keys(secrets), // DO NOT expose values
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
