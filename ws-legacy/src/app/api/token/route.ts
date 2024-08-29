import { NextRequest, NextResponse } from "next/server";
import { decodeJWT } from "@/common/utils/jwtUtil";

// Decode token
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const token = searchParams.get("token");

    if (!token) {
      throw new Error("No token provided");
    }

    const data = await decodeJWT(token);

    return new NextResponse(JSON.stringify({ data }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: `Decode token failed: ${error}` }),
      {
        status: 500,
      },
    );
  }
}
