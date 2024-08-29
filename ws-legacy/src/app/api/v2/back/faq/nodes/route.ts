import { NextResponse, type NextRequest } from "next/server";
import { ServerAPI } from "@/server/service/API";
import type { FAQResponse } from "@/server/types/FAQ";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const bot_class_uid = searchParams.get("bot_class_uid");

  try {
    const result = await ServerAPI<FAQResponse>({
      pathname: `/api/v1/faq/nodes?bot_class_uid=${bot_class_uid}`,
      method: "GET",
    });

    const rootNodes = result.get_response?.qa_nodes;

    const nodes = rootNodes?.flatMap((rootNode) => rootNode.children);

    return new NextResponse(JSON.stringify({ nodes }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: `Get faq: ${error}` }), {
      status: 500,
    });
  }
}
