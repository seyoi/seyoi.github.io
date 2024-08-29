import { getAIBot } from "@/domains/ai-chatbot/actions/getAIBot";
import PromptForm from "@/domains/ai-chatbot/components/PromptForm";

export default async function AIChatbotPromptPage({
  params,
}: {
  params: { workspaceId: string; botId: string };
}) {
  const { botId, workspaceId } = params;
  const { aiBot: initialAIBot } = await getAIBot({ botId, workspaceId });

  return (
    <div className="grid grid-rows-[90px,minmax(0,1fr)]">
      <div className="flex items-center justify-between border-b border-gray-lightest p-[20px]">
        <div className="flex items-center gap-[12px]">
          <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[12px] bg-gray-lighter">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="19"
              viewBox="0 0 20 19"
              fill="none"
            >
              <path
                d="M1 0.75H19C19.5523 0.75 20 1.18528 20 1.72222V17.2778C20 17.8147 19.5523 18.25 19 18.25H1C0.44772 18.25 0 17.8147 0 17.2778V1.72222C0 1.18528 0.44772 0.75 1 0.75ZM2 2.69444V16.3056H18V2.69444H2ZM10 12.4167H16V14.3611H10V12.4167ZM6.66685 9.5L3.83842 6.75014L5.25264 5.37521L9.4953 9.5L5.25264 13.6247L3.83842 12.2498L6.66685 9.5Z"
                fill="#5C5C5C"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="text-lg">챗봇 프롬프트 설정</div>
            <div className="whitespace-nowrap text-sm text-gray-normal">
              AI 챗봇 프롬프트를 맞춤 설정하세요.
            </div>
          </div>
        </div>
      </div>
      <PromptForm initialAIBot={initialAIBot} />
    </div>
  );
}
