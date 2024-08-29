"use client";

import { useContext, useEffect, useState } from "react";
import { PopUpContext } from "@/common/stores/PopUpContext";

export function PopUp() {
  const { config, hidePopUp } = useContext(PopUpContext);
  const [isActionRunning, setIsActionRunning] = useState(false);

  const handleMouseDownCapture = (e: React.MouseEvent<HTMLDivElement>) =>
    e.stopPropagation();

  const handleClickAction = async () => {
    try {
      setIsActionRunning(true);
      await config?.action();
    } catch (err) {
      console.error(err);
    } finally {
      setIsActionRunning(false);
      hidePopUp();
    }
  };

  useEffect(() => {
    window.document.addEventListener("mousedown", hidePopUp);

    return () => window.document.removeEventListener("mousedown", hidePopUp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center bg-black-lighter"
      onMouseDown={hidePopUp}
    >
      <div
        className="rounded-[24px] bg-white-normal"
        onMouseDownCapture={handleMouseDownCapture}
      >
        <div className="flex flex-col gap-[32px] p-[20px]">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-lg">{config?.title}</div>
              <div className="whitespace-nowrap text-sm text-gray-normal">
                {config?.subTitle}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[4px] self-end">
            <button
              type="button"
              className="rounded-[4px] bg-white-normal px-[16px] py-[8px] text-md text-black-normal"
              onClick={hidePopUp}
            >
              취소
            </button>
            {config?.actionType === "ok" && (
              <button
                type="button"
                className="flex items-center justify-center rounded-[4px] bg-blue-normal px-[16px] py-[8px] text-md text-white-normal disabled:cursor-wait disabled:bg-blue-light"
                onClick={handleClickAction}
                disabled={isActionRunning}
              >
                <span>확인</span>
              </button>
            )}
            {config?.actionType === "delete" && (
              <button
                type="button"
                className="flex items-center justify-center rounded-[4px] bg-red-normal px-[16px] py-[8px] text-md text-white-normal disabled:cursor-wait disabled:bg-red-light"
                onClick={handleClickAction}
                disabled={isActionRunning}
              >
                <span>삭제</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
