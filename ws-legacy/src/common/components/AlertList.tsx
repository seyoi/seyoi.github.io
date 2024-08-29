"use client";

import { useContext, useEffect, useState } from "react";
import { AlertContext } from "../stores/AlertContext";
import type { Alert } from "../types/Alert";

export default function AlertList({ alertList }: { alertList: Alert[] }) {
  return (
    <div className="fixed right-[20px] top-[20px] z-[9999] flex flex-col gap-[8px]">
      {alertList.map((alert) => (
        <Alert key={alert.id} alert={alert} />
      ))}
    </div>
  );
}

const Alert = ({ alert }: { alert: Alert }) => {
  const { removeAlert } = useContext(AlertContext);
  const [isShow, setIsShow] = useState(true);

  const hideAlert = () => setIsShow(false);

  useEffect(() => {
    const timer = setInterval(hideAlert, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isShow) return;

    const timer = setTimeout(() => removeAlert(alert), 500);

    return () => clearInterval(timer);
  }, [alert, isShow, removeAlert]);

  return (
    <div
      className={`${isShow ? "alert-visible visible" : "alert-hidden invisible"} flex items-center gap-[4px] rounded-[8px] bg-black-normal px-[16px] py-[8px] transition-[visibility] duration-500`}
    >
      <div className="flex h-[24px] w-[24px] items-center justify-center p-[4px]">
        {alert?.type === "ok" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M6.88 11.68L12.52 6.04L11.4 4.92L6.88 9.44L4.6 7.16L3.48 8.28L6.88 11.68ZM8 16C6.89333 16 5.85333 15.79 4.88 15.37C3.90667 14.95 3.06 14.38 2.34 13.66C1.62 12.94 1.05 12.0933 0.63 11.12C0.21 10.1467 0 9.10667 0 8C0 6.89333 0.21 5.85333 0.63 4.88C1.05 3.90667 1.62 3.06 2.34 2.34C3.06 1.62 3.90667 1.05 4.88 0.63C5.85333 0.21 6.89333 0 8 0C9.10667 0 10.1467 0.21 11.12 0.63C12.0933 1.05 12.94 1.62 13.66 2.34C14.38 3.06 14.95 3.90667 15.37 4.88C15.79 5.85333 16 6.89333 16 8C16 9.10667 15.79 10.1467 15.37 11.12C14.95 12.0933 14.38 12.94 13.66 13.66C12.94 14.38 12.0933 14.95 11.12 15.37C10.1467 15.79 9.10667 16 8 16ZM8 14.4C9.78667 14.4 11.3 13.78 12.54 12.54C13.78 11.3 14.4 9.78667 14.4 8C14.4 6.21333 13.78 4.7 12.54 3.46C11.3 2.22 9.78667 1.6 8 1.6C6.21333 1.6 4.7 2.22 3.46 3.46C2.22 4.7 1.6 6.21333 1.6 8C1.6 9.78667 2.22 11.3 3.46 12.54C4.7 13.78 6.21333 14.4 8 14.4Z"
              fill="#3ACF59"
            />
          </svg>
        )}
        {alert?.type === "error" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M8 16C3.58172 16 0 12.4182 0 8C0 3.58172 3.58172 0 8 0C12.4182 0 16 3.58172 16 8C16 12.4182 12.4182 16 8 16ZM8 14.4C11.5346 14.4 14.4 11.5346 14.4 8C14.4 4.46538 11.5346 1.6 8 1.6C4.46538 1.6 1.6 4.46538 1.6 8C1.6 11.5346 4.46538 14.4 8 14.4ZM8 6.86864L10.2627 4.60589L11.3941 5.73726L9.13136 8L11.3941 10.2627L10.2627 11.3941L8 9.13136L5.73726 11.3941L4.60589 10.2627L6.86864 8L4.60589 5.73726L5.73726 4.60589L8 6.86864Z"
              fill="#FF5C5C"
            />
          </svg>
        )}
      </div>
      <div className="flex flex-1 items-center justify-between gap-[8px]">
        <span className="whitespace-nowrap text-md text-white-normal">
          {alert?.text}
        </span>
        <button type="button" onClick={hideAlert}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M1.69231 12L0 10.3077L4.30769 6L0 1.69231L1.69231 0L6 4.30769L10.3077 0L12 1.69231L7.69231 6L12 10.3077L10.3077 12L6 7.69231L1.69231 12Z"
              fill="#D5D5D5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
