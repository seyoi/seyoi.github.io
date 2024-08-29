import { NextResponse, type NextRequest } from "next/server";
import { ServerAPI } from "@/server/service/API";
import type { AIBotChatResponse } from "@/server/types/AIBotChat";

export async function POST(req: NextRequest) {
  try {
    const { content, prompt, botClsUid, wsUid } = await req.json();

    const result = await ServerAPI<AIBotChatResponse>({
      pathname: "/api/v1/chat/messages",
      method: "POST",
      body: JSON.stringify({
        role: "USER",
        message: { content, prompt },
        botClsUid,
        type: "",
        wsUid,
      }),
    });

    const answer = result.answer;
    const sources = result.datasource?.chatSources.map((chatSource) => ({
      title: chatSource.title,
      itemKey: chatSource.itemKey,
      itemUid: chatSource.itemUid,
    }));
    const imagePaths = result.datasource?.chatSources.flatMap(
      (chatSource) => chatSource.images_path,
    );

    return new NextResponse(
      JSON.stringify({
        answer,
        sources,
        imagePaths,
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: `Back bot messages: ${error}` }),
      {
        status: 500,
      },
    );
  }
}
