import Link from "next/link";
import Contents from "@/domains/ai-chatbot/components/Contents";
import { getAIBot } from "@/domains/ai-chatbot/actions/getAIBot";
import { getAIBotKnowledge } from "@/domains/ai-chatbot/actions/getAIBotKnowledge";

export default async function AIChatbotContentsPage({
  params,
}: {
  params: { workspaceId: string; botId: string };
}) {
  const { workspaceId, botId } = params;

  const [{ aiBot: initialAIBot }, { aiBotknowledge: initialAIBotKnowledge }] =
    await Promise.all([
      getAIBot({ botId, workspaceId }),
      getAIBotKnowledge({ botId, workspaceId }),
    ]);

  return (
    <div className="grid grid-rows-[90px,minmax(0,1fr)]">
      <div className="flex min-w-0 items-center justify-between border-b border-gray-lightest p-[20px]">
        <div className="flex items-center gap-[12px]">
          <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[12px] bg-gray-lighter">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="none"
            >
              <path
                d="M9.13889 2.96333C9.61222 1.01222 12.3878 1.01222 12.8611 2.96333C12.9321 3.25644 13.0714 3.52864 13.2675 3.75778C13.4636 3.98691 13.711 4.1665 13.9896 4.28194C14.2682 4.39738 14.5702 4.44539 14.8709 4.42208C15.1716 4.39876 15.4625 4.30478 15.72 4.14778C17.4344 3.10333 19.3978 5.06556 18.3533 6.78111C18.1966 7.03851 18.1027 7.32926 18.0795 7.62975C18.0562 7.93023 18.1042 8.23197 18.2195 8.51042C18.3348 8.78888 18.5142 9.0362 18.743 9.23228C18.9719 9.42836 19.2438 9.56767 19.5367 9.63889C21.4878 10.1122 21.4878 12.8878 19.5367 13.3611C19.2436 13.4321 18.9714 13.5714 18.7422 13.7675C18.5131 13.9636 18.3335 14.211 18.2181 14.4896C18.1026 14.7682 18.0546 15.0702 18.0779 15.3709C18.1012 15.6716 18.1952 15.9625 18.3522 16.22C19.3967 17.9344 17.4344 19.8978 15.7189 18.8533C15.4615 18.6966 15.1707 18.6027 14.8703 18.5795C14.5698 18.5562 14.268 18.6042 13.9896 18.7195C13.7111 18.8348 13.4638 19.0142 13.2677 19.243C13.0716 19.4719 12.9323 19.7438 12.8611 20.0367C12.3878 21.9878 9.61222 21.9878 9.13889 20.0367C9.06787 19.7436 8.92864 19.4714 8.73254 19.2422C8.53644 19.0131 8.28901 18.8335 8.01039 18.7181C7.73176 18.6026 7.42982 18.5546 7.12913 18.5779C6.82844 18.6012 6.5375 18.6952 6.28 18.8522C4.56556 19.8967 2.60222 17.9344 3.64667 16.2189C3.80345 15.9615 3.89728 15.6707 3.92054 15.3703C3.9438 15.0698 3.89583 14.768 3.78052 14.4896C3.66522 14.2111 3.48584 13.9638 3.25697 13.7677C3.02809 13.5716 2.75618 13.4323 2.46333 13.3611C0.512222 12.8878 0.512222 10.1122 2.46333 9.63889C2.75644 9.56787 3.02864 9.42864 3.25778 9.23254C3.48691 9.03644 3.6665 8.78901 3.78194 8.51039C3.89738 8.23176 3.94539 7.92982 3.92208 7.62913C3.89876 7.32844 3.80478 7.0375 3.64778 6.78C2.60333 5.06556 4.56556 3.10222 6.28111 4.14667C7.39222 4.82222 8.83222 4.22444 9.13889 2.96333Z"
                stroke="#5C5C5C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.66667 11.5C7.66667 12.3841 8.01786 13.2319 8.64298 13.857C9.2681 14.4821 10.1159 14.8333 11 14.8333C11.8841 14.8333 12.7319 14.4821 13.357 13.857C13.9821 13.2319 14.3333 12.3841 14.3333 11.5C14.3333 10.6159 13.9821 9.7681 13.357 9.14298C12.7319 8.51786 11.8841 8.16667 11 8.16667C10.1159 8.16667 9.2681 8.51786 8.64298 9.14298C8.01786 9.7681 7.66667 10.6159 7.66667 11.5Z"
                stroke="#5C5C5C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="text-lg">챗봇 콘텐츠 관리</div>
            <div className="whitespace-nowrap text-sm text-gray-normal">
              AI 챗봇을 생성할 때 수집한 데이터들을 관리해보세요.
            </div>
          </div>
        </div>
        <Link
          href={`/workspaces/${workspaceId}/ai-chatbots/${botId}/contents/new`}
          className="flex items-center justify-center gap-[12px] rounded-[8px] bg-black-normal px-[16px] py-[8px]"
        >
          <svg
            className="shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
          >
            <path
              d="M6.28114 10.9631H7.71886V8.21886H10.4631V6.78113H7.71886V4.03692H6.28114V6.78113H3.53692V8.21886H6.28114V10.9631ZM7 14.5C6.02908 14.5 5.11809 14.3164 4.26702 13.9491C3.41594 13.5819 2.67563 13.0835 2.04607 12.4539C1.41651 11.8244 0.918112 11.0841 0.550867 10.233C0.183622 9.38191 0 8.47092 0 7.5C0 6.52908 0.183622 5.61809 0.550867 4.76702C0.918112 3.91594 1.41651 3.17563 2.04607 2.54607C2.67563 1.91651 3.41594 1.41811 4.26702 1.05087C5.11809 0.683622 6.02908 0.5 7 0.5C7.97092 0.5 8.88191 0.683622 9.73298 1.05087C10.5841 1.41811 11.3244 1.91651 11.9539 2.54607C12.5835 3.17563 13.0819 3.91594 13.4491 4.76702C13.8164 5.61809 14 6.52908 14 7.5C14 8.47092 13.8164 9.38191 13.4491 10.233C13.0819 11.0841 12.5835 11.8244 11.9539 12.4539C11.3244 13.0835 10.5841 13.5819 9.73298 13.9491C8.88191 14.3164 7.97092 14.5 7 14.5ZM7 12.9392C8.52125 12.9392 9.80809 12.413 10.8605 11.3605C11.913 10.3081 12.4392 9.02125 12.4392 7.5C12.4392 5.97875 11.913 4.69191 10.8605 3.63945C9.80809 2.58701 8.52125 2.06079 7 2.06079C5.47875 2.06079 4.19191 2.58701 3.13945 3.63945C2.08701 4.69191 1.56079 5.97875 1.56079 7.5C1.56079 9.02125 2.08701 10.3081 3.13945 11.3605C4.19191 12.413 5.47875 12.9392 7 12.9392Z"
              fill="white"
            />
          </svg>
          <div className="whitespace-nowrap text-md text-white-normal">
            콘텐츠 추가하기
          </div>
        </Link>
      </div>
      <Contents
        initialAIBot={initialAIBot}
        initialAIBotKnowledge={initialAIBotKnowledge}
      />
    </div>
  );
}
