"use client";
import React, { useState } from "react";
import { DemoForm } from "./DemoForm";

export function DemoSection() {
  const [directEmail, setDirectEmail] = useState<string>("");
  const handleEmailSubmit = () => {
    // 이메일 제출 후 상태 초기화
    setDirectEmail("");
  };
  return (
    <>
      <section className="flex flex-col items-center bg-blue-normal pb-[40px] pt-[80px] mobile:items-start mobile:pl-[14px]">
        <h2
          id="book-elements"
          className="whitespace-pre-line text-center text-4xl text-white-normal mobile:text-start mobile:text-xl"
        >
          {"전문지식 AI 도슨티로\n비용을 줄이고 혁신을 시작하세요!"}
        </h2>
        <div
          id="book-elements"
          className="mt-10 flex w-full items-center justify-center gap-2 mobile:w-fit mobile:flex-col mobile:justify-start"
        >
          <input
            className="block w-[387px] rounded-xl border border-white bg-transparent py-4 pl-4 text-boldmd text-white-normal placeholder-white-normal mobile:hidden"
            placeholder="이메일을 입력하면 데모 신청이 시작됩니다!"
            type="email"
            name="email"
            value={directEmail}
            onChange={(e) => setDirectEmail(e.target.value)}
          />
          <div className="block mobile:hidden">
            <DemoForm
              variant="white"
              disabled={directEmail === ""}
              direct={directEmail}
              onSuccess={handleEmailSubmit} // 제출 성공 후 호출될 함수
            />
          </div>
          <div className="hidden mobile:flex mobile:justify-start">
            <DemoForm variant="white" business={true} />
          </div>
        </div>
      </section>
    </>
  );
}
