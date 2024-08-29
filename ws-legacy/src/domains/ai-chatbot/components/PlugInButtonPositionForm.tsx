"use client";

import { useParams } from "next/navigation";
import { useContext } from "react";
import { PlugInSettingContext } from "@/domains/ai-chatbot/stores/PlugInSettingContext";
import { updatePlugInButtonPosition } from "@/domains/ai-chatbot/actions/updatePlugInButtonPosition";
import { AlertContext } from "@/common/stores/AlertContext";

export default function PlugInButtonPositionForm() {
  const { workspaceId, botId }: { workspaceId: string; botId: string } =
    useParams();
  const { marginX, marginY, setMarginX, setMarginY } =
    useContext(PlugInSettingContext);
  const { addAlert } = useContext(AlertContext);

  const handleChangeMarginX = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (isNaN(value)) {
      setMarginX(0);
      return;
    }

    if (value < 0) {
      setMarginX(0);
      return;
    }

    if (value > 200) {
      setMarginX(200);
      return;
    }

    setMarginX(Number(e.target.value));
  };

  const handleChangeMarginY = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (isNaN(value)) {
      setMarginY(0);
      return;
    }

    if (value < 0) {
      setMarginY(0);
      return;
    }

    if (value > 200) {
      setMarginY(200);
      return;
    }

    setMarginY(Number(e.target.value));
  };

  const handleClickSave = async () => {
    try {
      const { plugIn, error } = await updatePlugInButtonPosition({
        workspaceId,
        botId,
        marginX,
        marginY,
      });
      if (error) throw error;
      setMarginX(plugIn?.marginX as number);
      setMarginY(plugIn?.marginY as number);
      addAlert({ type: "ok", text: "업데이트에 성공했습니다." });
    } catch (err) {
      console.error(err);
      addAlert({ type: "error", text: "업데이트에 실패했습니다." });
    }
  };

  return (
    <div className="flex flex-col gap-[8px] rounded-[12px] border border-gray-lighter bg-white-normal p-[20px]">
      <div className="flex flex-col">
        <div className="text-lg">버튼 위치 설정</div>
      </div>
      <div className="flex flex-col gap-[8px]">
        <div className="flex items-center gap-[8px]">
          <div className="text-md">가로</div>
          <input
            type="range"
            className="slider flex-1 appearance-none"
            value={marginX}
            onChange={handleChangeMarginX}
            min={0}
            max={200}
          />
          <div className="max-w-[60px] rounded-[4px] border border-gray-lighter bg-white-normal p-[8px]">
            <input
              className="w-full outline-none"
              value={marginX}
              onChange={handleChangeMarginX}
              min={0}
              max={200}
            />
          </div>
        </div>
        <div className="flex items-center gap-[8px]">
          <div className="text-md">세로</div>
          <input
            type="range"
            className="slider flex-1 appearance-none"
            value={marginY}
            onChange={handleChangeMarginY}
            min={0}
            max={200}
          />
          <div className="max-w-[60px] rounded-[4px] border border-gray-lighter bg-white-normal p-[8px]">
            <input
              className="w-full outline-none"
              value={marginY}
              onChange={handleChangeMarginY}
              min={0}
              max={200}
            />
          </div>
        </div>
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
