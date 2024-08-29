import { NextResponse } from "next/server";
import Ably from "ably";

export async function POST() {
  if (!process.env.ABLY_API_KEY) {
    return NextResponse.json({ status: 500 });
  }

  const client = new Ably.Rest(process.env.ABLY_API_KEY as string);

  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: "*",
  });

  return NextResponse.json(tokenRequestData);
}
