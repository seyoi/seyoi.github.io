"use client";

import { useParams } from "next/navigation";
import { useContext } from "react";
import { BotProfileContext } from "@/domains/ai-chatbot/stores/BotProfileContext";
import { updateBotName } from "@/domains/ai-chatbot/actions/updateBotName";
import { AlertContext } from "@/common/stores/AlertContext";

export default function BotNameForm() {
  const { workspaceId, botId }: { workspaceId: string; botId: string } =
    useParams();
  const { name, welcomeMessage, setName, setWelcomeMessage } =
    useContext(BotProfileContext);
  const { addAlert } = useContext(AlertContext);

  const handleChangeBotName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const handleChangeWelcomeMessage = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => setWelcomeMessage(e.target.value);

  const handleClickSave = async () => {
    try {
      addAlert({ type: "ok", text: "업데이트중입니다. 잠시만 기다려주세요." });
      const { bot, error } = await updateBotName({
        workspaceId,
        botId,
        name,
        welcomeMessage,
      });
      if (error) throw error;
      setName(bot?.name as string);
      setWelcomeMessage(bot?.welcomeMessage as string);
      addAlert({ type: "ok", text: "업데이트에 성공했습니다." });
    } catch (err) {
      console.error(err);
      addAlert({ type: "error", text: "업데이트에 실패했습니다." });
    }
  };

  return (
    <div className="flex flex-col gap-[8px] rounded-[12px] border border-gray-lighter bg-white-normal p-[20px]">
      <div className="flex flex-col">
        <div className="text-lg">챗봇 이름 설정</div>
      </div>
      <div className="flex flex-col gap-[8px]">
        <label htmlFor="botName" className="flex flex-col gap-[8px]">
          <div id="botName" className="text-md">
            챗봇 이름
          </div>
          <input
            className="rounded-[8px] border-[1.5px] border-gray-lighter bg-white-normal px-[12px] py-[8px] text-md placeholder:text-gray-light"
            placeholder="Docenty Bot"
            value={name}
            onChange={handleChangeBotName}
          />
        </label>
        <label htmlFor="welcomeMessage" className="flex flex-col gap-[8px]">
          <div id="welcomeMessage" className="text-md">
            웰컴 메세지
          </div>
          <textarea
            className="h-[160px] resize-none rounded-[8px] border-[1.5px] border-gray-lighter bg-white-normal px-[12px] py-[8px] text-md placeholder:text-gray-light"
            placeholder="방문해주셔서 감사합니다 :)"
            value={welcomeMessage}
            onChange={handleChangeWelcomeMessage}
          />
        </label>
      </div>
      <button
        type="button"
        className="flex items-center justify-center self-end rounded-[8px] bg-blue-normal px-[16px] py-[8px] text-md text-white-normal"
        onClick={handleClickSave}
      >
        저장
      </button>
    </div>
  );
}
