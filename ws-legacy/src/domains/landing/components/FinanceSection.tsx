import Image from "next/image";
import { FieldContent } from "./FieldContent";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function FinanceSection() {
  useGSAP(() => {
    gsap.from("#finance-elements", {
      scrollTrigger: "#finance-elements", // start animation when ".box" enters the viewport
      opacity: 0,
      y: 10,
      duration: 0.5,
      stagger: 0.1,
    });
  });
  return (
    <>
      <section
        id="finance-elements"
        className="flex h-[460px] w-[1200px] items-center justify-center gap-[200px] rounded-[20px] bg-gray-bright mobile:hidden"
      >
        <Image
          src="/images/landing/finance.png"
          alt="종목 정보 제공 및 진단, 수익률 예측을 하는 AI"
          width={385}
          height={415}
          style={{ width: 385, height: 415 }}
        />
        <FieldContent
          bulletText="최적의 보안과 함께"
          title="금융"
          desc="종목 정보 제공 및 진단, 수익률 예측을 하는 AI"
        />
      </section>
      <section className="hidden bg-gray-bright mobile:block mobile:rounded-[20px] mobile:p-3 mobile:shadow-card">
        <div className="justify-center gap-3 mobile:flex">
          <FieldContent
            bulletText="AI PB 투자 상담 도우미"
            title="금융"
            desc={"종목 정보 제공 및 진단, 수익률\n예측을 하는 AI"}
          />
          <Image
            src="/images/landing/finance-responsive.png"
            alt="종목 정보 제공 및 진단, 수익률 예측을 하는 AI"
            width={165}
            height={159}
            style={{ width: 165, height: 159 }}
          />
        </div>
      </section>
    </>
  );
}
