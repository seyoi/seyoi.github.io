"use client";

import { useParams } from "next/navigation";
import { useContext } from "react";
import { BotProfileContext } from "@/domains/ai-chatbot/stores/BotProfileContext";
import { updatePlugInThemeColor } from "@/domains/ai-chatbot/actions/updatePlugInThemeColor";
import { AlertContext } from "@/common/stores/AlertContext";

export default function BotThemeColorForm() {
  const { workspaceId, botId }: { workspaceId: string; botId: string } =
    useParams();
  const { themeColor, setThemeColor } = useContext(BotProfileContext);
  const { addAlert } = useContext(AlertContext);

  const handleChangeThemeColor = (e: React.ChangeEvent<HTMLInputElement>) =>
    setThemeColor(e.target.value);

  const handleClickSave = async () => {
    try {
      addAlert({ type: "ok", text: "업데이트중입니다. 잠시만 기다려주세요." });
      const { plugIn, error } = await updatePlugInThemeColor({
        workspaceId,
        botId,
        themeColor,
      });
      if (error) throw error;
      setThemeColor(plugIn?.themeColor as string);
      addAlert({ type: "ok", text: "업데이트에 성공했습니다." });
    } catch (err) {
      console.error(err);
      addAlert({ type: "error", text: "업데이트에 실패했습니다." });
    }
  };

  return (
    <div className="flex flex-col gap-[8px] rounded-[12px] border border-gray-lighter bg-white-normal p-[20px]">
      <div className="flex flex-col">
        <div className="text-lg">테마 색상 설정</div>
      </div>
      <div className="flex flex-col gap-[8px]">
        <label
          htmlFor="themeColor"
          className="relative flex flex-col gap-[8px]"
        >
          <div className="text-md">테마 색상</div>
          <div className="relative flex h-[40px] items-center gap-[12px] rounded-[8px] border-[1.5px] border-gray-lighter bg-white-normal px-[12px] py-[8px] text-md outline-[3px] placeholder:text-gray-light focus-within:border-blue-normal focus-within:outline-blue-light hover:border-blue-normal hover:outline-blue-light">
            <input
              className="invisible absolute left-[12px] top-[12px]"
              id="themeColor"
              type="color"
              value={themeColor}
              onChange={handleChangeThemeColor}
            />
            <div
              className="h-[24px] w-[24px] rounded-[8px] border-none outline-none"
              style={{ backgroundColor: themeColor }}
            ></div>
            <div>{themeColor}</div>
          </div>
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
