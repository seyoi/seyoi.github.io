import { getBot } from "@/domains/ai-chatbot/actions/getBot";
import { BotProfileContextProvider } from "@/domains/ai-chatbot/stores/BotProfileContext";
import BotAvatarForm from "@/domains/ai-chatbot/components/BotAvatarForm";
import BotNameForm from "@/domains/ai-chatbot/components/BotNameForm";
import BotThemeColorForm from "@/domains/ai-chatbot/components/BotThemeColorForm";
import ExamplePlugIn from "@/domains/ai-chatbot/components/ExamplePlugIn";

export default async function AIChatbotSettingsProfilePage({
  params,
}: {
  params: { botId: string };
}) {
  const { botId } = params;
  const { bot, plugIn, error } = await getBot({ botId });
  if (error) console.error(error);
  return (
    <div className="grid grid-rows-[90px,minmax(0,1fr)]">
      <div className="flex items-center justify-between border-b border-gray-lightest p-[20px]">
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
            <div className="text-lg">챗봇 설정 [프로필]</div>
            <div className="whitespace-nowrap text-sm text-gray-normal">
              고객들이 보게 될 AI 챗봇을 맞춤 설정하세요.
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <BotProfileContextProvider
          initilalPlugInId={plugIn?.id || ""}
          initialAvatarUrl={bot?.avatarUrl || ""}
          initialBotName={bot?.name || ""}
          initialBotWelcomeMessage={bot?.welcomeMessage || ""}
          initialThemeColor={plugIn?.themeColor || ""}
          initialCoverImageUrl={plugIn?.coverImageUrl || ""}
        >
          <div className="flex flex-1 flex-col gap-[16px] bg-blue-lighter p-[20px]">
            <BotAvatarForm />
            <BotNameForm />
            <BotThemeColorForm />
          </div>
          <div className="flex flex-1 items-center justify-center bg-black-lightest">
            <ExamplePlugIn />
          </div>
        </BotProfileContextProvider>
      </div>
    </div>
  );
}
