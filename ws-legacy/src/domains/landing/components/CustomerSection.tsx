import Image from "next/image";
import { FieldContent } from "./FieldContent";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function CustomerSection() {
  useGSAP(() => {
    gsap.from("#customer-elements", {
      scrollTrigger: "#customer-elements", // start animation when ".box" enters the viewport
      opacity: 0,
      y: 10,
      duration: 0.5,
      stagger: 0.1,
    });
  });

  return (
    <>
      <section
        id="customer-elements"
        className="flex h-[460px] w-[1200px] items-center justify-center gap-[200px] rounded-[20px] bg-gray-bright mobile:hidden"
      >
        <FieldContent
          bulletText="전문 상담도 AI에게"
          title="콜센터"
          desc="고객과의 모든 대화내용을 통합 기록/분석 하세요."
        />
        <Image
          src="/images/landing/cs.png"
          alt="고객과의 모든 대화내용을 통합 기록/분석 하세요."
          width={464}
          height={363}
          style={{ width: 464, height: 363 }}
        />
      </section>
      <section className="hidden bg-gray-bright mobile:block mobile:rounded-[20px] mobile:p-3 mobile:shadow-card">
        <div className="justify-center gap-3 mobile:flex">
          <FieldContent
            bulletText="전문 상담도 AI에게"
            title="콜센터"
            desc={"고객과의 모든 대화내용을\n통합 기록/분석 하세요."}
          />
          <Image
            src="/images/landing/cs-responsive.png"
            alt="고객과의 모든 대화내용을 통합 기록/분석 하세요."
            width={187}
            height={154}
            style={{ width: 187, height: 154 }}
          />
        </div>
      </section>
    </>
  );
}
