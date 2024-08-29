import { useEffect } from "react";

export function PopUpMessage({
  message,
  isPopUp,
  closePopUp,
  backgroundColor,
}: {
  message: string;
  isPopUp: boolean;
  closePopUp: () => void;
  backgroundColor: string;
}) {
  useEffect(() => {
    const id = setTimeout(() => closePopUp(), 5000);
    return () => clearTimeout(id);
  }, [closePopUp, isPopUp]);

  if (isPopUp)
    return (
      <div
        className="fixed left-[50%] top-[64px] z-[9999] flex translate-x-[-50%] items-center gap-[1rem] rounded-[0.25rem] p-[1rem] text-[#FFFFFF]"
        style={{ backgroundColor }}
      >
        {message}
        <button type="button" onClick={closePopUp}>
          <svg
            className="shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    );

  return null;
}
