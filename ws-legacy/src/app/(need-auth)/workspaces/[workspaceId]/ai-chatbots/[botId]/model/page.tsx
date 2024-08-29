import { getAIBot } from "@/domains/ai-chatbot/actions/getAIBot";
import LLMModelForm from "@/domains/ai-chatbot/components/LLMModelForm";

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
                d="M20 5.54167V3.95833H18.3333C18.3333 2.64892 17.2117 1.58333 15.8333 1.58333V0H14.1667V1.58333H12.5V0H10.8333V1.58333H9.16667V0H7.5V1.58333H5.83333V0H4.16667V1.58333C2.78833 1.58333 1.66667 2.64892 1.66667 3.95833H0V5.54167H1.66667V7.125H0V8.70833H1.66667V10.2917H0V11.875H1.66667V13.4583H0V15.0417H1.66667V17.4167H4.16667V19H5.83333V17.4167H7.5V19H9.16667V17.4167H10.8333V19H12.5V17.4167H14.1667V19H15.8333V17.4167H18.3333V15.0417H20V13.4583H18.3333V11.875H20V10.2917H18.3333V8.70833H20V7.125H18.3333V5.54167H20ZM16.6667 15.8333H3.33333V3.95833C3.33333 3.52133 3.7075 3.16667 4.16667 3.16667H15.8333C16.2925 3.16667 16.6667 3.52133 16.6667 3.95833V15.8333ZM9.06333 5.68417C7.96917 5.24875 6.85417 5.85912 6.61583 6.83842L5 13.4583H6.71083L6.90417 12.6667H9.7625L9.95583 13.4583H11.6667L10.065 6.89462C9.93667 6.37054 9.58583 5.89237 9.06333 5.68496V5.68417ZM7.29083 11.0833L8.23917 7.19625C8.24917 7.15429 8.28833 7.125 8.33333 7.125C8.37833 7.125 8.4175 7.15429 8.4275 7.19625L9.37583 11.0833H7.29083ZM12.5 5.54167H14.1667V13.4583H12.5V5.54167Z"
                fill="#5C5C5C"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="text-lg">챗봇 LLM 모델 설정</div>
            <div className="whitespace-nowrap text-sm text-gray-normal">
              AI 챗봇 LLM을 맞춤 설정하세요.
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-lighter">
        <LLMModelForm initialAIBot={initialAIBot} />
      </div>
    </div>
  );
}
