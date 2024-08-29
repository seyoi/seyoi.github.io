"use client";

import { FieldContentType } from "../types/types";
import { DemoForm } from "./DemoForm";

export function FieldContent({ title, desc, bulletText }: FieldContentType) {
  return (
    <>
      <div className="flex flex-col mobile:w-fit mobile:gap-2">
        <p className="flex items-center gap-2 text-lg text-blue-normal mobile:gap-1 mobile:text-sm">
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="4" cy="4" r="4" fill="#416BFF" />
          </svg>
          {bulletText}
        </p>
        <p className="mb-2 mt-5 text-3xl text-blue-normal mobile:m-0 mobile:text-boldlg">
          {title}
        </p>
        <span className="mb-8 whitespace-pre-wrap text-lg text-gray-normal mobile:m-0 mobile:text-boldsm">
          {desc}
        </span>
        <DemoForm variant="blue" business={true} />
      </div>
    </>
  );
}
