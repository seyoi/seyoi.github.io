"use client";
import { ConstructSection } from "./ConstructSection";
import { CustomerSection } from "./CustomerSection";
import { FinanceSection } from "./FinanceSection";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function BusinessSection() {
  useGSAP(() => {
    gsap.from("#business-elements", {
      scrollTrigger: "#business-elements", // start animation when ".box" enters the viewport
      opacity: 0,
      y: 10,
      duration: 0.5,
      stagger: 0.1,
    });
  });
  return (
    <section
      id="business"
      className="flex w-full flex-col items-center gap-[80px] mobile:gap-5"
    >
      <h2
        id="business-elements"
        className="flex flex-col items-center gap-3 text-xl text-blue-normal mobile:mt-20 mobile:text-boldmd"
      >
        한단계 도약한 업무 자동화
        <p
          id="business-elements"
          className="text-3xl text-black-normal mobile:whitespace-pre-wrap mobile:text-center mobile:text-lg"
        >
          {`전통산업과 도슨티 AI가 만나\n현장 업무를 빠르게`}
        </p>
      </h2>
      <div id="business-elements">
        <ConstructSection />
      </div>
      <div id="business-elements">
        <CustomerSection />
      </div>
      <div id="business-elements">
        <FinanceSection />
      </div>
    </section>
  );
}
