"use client";

import { useContext } from "react";
import { ModalContext } from "@/common/stores/ModalContext";

export default function Modal({ children }: { children: React.ReactNode }) {
  const { hideModal } = useContext(ModalContext);

  const handleMouseDownCapture = (e: React.MouseEvent<HTMLDivElement>) =>
    e.stopPropagation();

  return (
    <div
      className="fixed bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center bg-black-lighter"
      onMouseDown={hideModal}
    >
      <div
        className="relative w-[min(600px,100%)] rounded-[24px] bg-white-normal"
        onMouseDownCapture={handleMouseDownCapture}
      >
        <div className="absolute right-[20px] top-[16px]">
          <button
            type="button"
            className="flex items-center justify-center rounded-[50%] bg-blue-lighter p-[8px]"
            onClick={hideModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M1.69231 12L0 10.3077L4.30769 6L0 1.69231L1.69231 0L6 4.30769L10.3077 0L12 1.69231L7.69231 6L12 10.3077L10.3077 12L6 7.69231L1.69231 12Z"
                fill="#5C5C5C"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
