import { NextRequest } from "next/server";

export const maxDuration = 300;

export async function POST(req: NextRequest) {
  try {
    const {
      message,
      taskName,
      type,
    }: {
      message: string;
      taskName: string;
      type: "chochangpae" | "yechangpae";
    } = await req.json();

    const body = JSON.stringify({
      message,
      vecs_name: taskName,
      type,
    });

    const response = await fetch(
      `${process.env.NEXT_BACKEND_API_URL}/api/v1/chat/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-DCT-V01-API-KEY": "XwCCcfz9m5JeVL9urkiiwYBLSei6CdmpgfD",
        },
        cache: "no-store",
        body,
      },
    );

    const {
      data,
    }: {
      data: {
        datasource: {
          sources: ["string"];
          chatSources: [
            {
              url: "string";
              title: "string";
              fileName: "string";
            },
          ];
        };
        answer: "string";
        etc: unknown;
        model_name: "string";
      };
      meta: {
        errors: [
          {
            code: 0;
            msg: "string";
            desc: "string";
            displayMsg: "string";
          },
        ];
      };
    } = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    throw `Auto Write Business Plan ${error}`;
  }
}
