"use client";

import { DemoForm } from "./DemoForm";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import { Input } from "@/common/components/ui/Input";

export function HeroSection() {
  const [directEmail, setDirectEmail] = useState<string>("");

  gsap.registerPlugin(useGSAP);
  useGSAP(() => {
    gsap.from("#hero-elements", {
      scrollTrigger: "#hero-elements",
      opacity: 0,
      y: 10,
      duration: 0.5,
      stagger: 0.1,
    });
  });

  const handleEmailSubmit = () => {
    // 이메일 제출 후 상태 초기화
    setDirectEmail("");
  };

  return (
    <section className="mt-[185px] flex flex-col items-center mobile:mt-20 mobile:w-screen">
      <h1 id="hero-elements" className="text-center text-6xl mobile:text-3xl">
        <span className="inline-block bg-gradient-to-r from-[#7D9AFF] via-[#406AFC] to-[#3658D1] bg-clip-text text-transparent">
          AI
        </span>
        로<br />
        전문직 업무를
        <br />
        <span className="text-blue-normal">자동화&nbsp;</span>하세요
      </h1>
      <header className="flex flex-col items-center mobile:mt-5 mobile:flex-col-reverse mobile:gap-5">
        <p
          id="hero-elements"
          className="my-8 text-xl text-black-light mobile:my-0 mobile:text-md"
        >
          시연 및 상담을 지금 예약하세요
        </p>
        <div
          id="hero-elements"
          className="flex w-full items-center justify-center gap-2 mobile:w-fit mobile:flex-col"
        >
          <Input
            className="mobile h-[58px] w-[387px] rounded-xl border-2 border-blue-normal py-4 pl-4 text-md font-bold placeholder-gray-light mobile:h-[47px] mobile:w-[365px] mobile:py-0"
            placeholder="이메일을 입력하세요!"
            type="email"
            name="email"
            value={directEmail}
            onChange={(e) => setDirectEmail(e.target.value)}
          />
          <DemoForm
            variant="blue"
            disabled={directEmail === ""}
            direct={directEmail}
            onSuccess={handleEmailSubmit} // 제출 성공 후 호출될 함수
          />
        </div>
      </header>

      <div className="relative mt-16 h-[267px] w-[600px] mobile:hidden">
        <LandingFAQ title="AI 상담예약서비스" style={{ right: "2rem" }} />
        <LandingFAQ
          title="AI 티켓예약/변경"
          style={{ top: "1rem", left: "8rem" }}
        />
        <LandingFAQ
          title="AI 주문/배송조회"
          style={{ top: "7rem", left: "0rem" }}
        />
        <LandingFAQ
          title="AI 자산관리사"
          style={{ top: "8rem", right: "10rem" }}
        />
        <LandingFAQ
          title="음성 AI"
          style={{
            bottom: "0rem",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </div>

      <div className="hidden mobile:mt-20 mobile:flex mobile:w-[375px] mobile:flex-wrap mobile:justify-end mobile:gap-1">
        <LandingFAQ title="AI 주문/배송조회" />
        <LandingFAQ title="AI 티켓예약/변경" />
        <LandingFAQ title="AI 자산관리사" />
        <LandingFAQ title="AI 상담예약서비스" />
        <LandingFAQ title="음성 AI" />
      </div>
    </section>
  );
}

function LandingFAQ({ title, style }: FAQType) {
  return (
    <button
      id="hero-elements"
      style={style}
      className="absolute cursor-default rounded-3xl border border-gray-lighter px-5 py-3 text-lg text-gray-light mobile:static mobile:mb-3 mobile:px-3 mobile:py-2 mobile:text-boldmd mobile:text-blue-normal mobile:hover:border-[#416BFF] mobile:hover:bg-blue-light"
    >
      {title}
    </button>
  );
}

type FAQType = {
  title: string;
  style?: React.CSSProperties;
};
