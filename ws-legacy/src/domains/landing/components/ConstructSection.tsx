"use client";

import Image from "next/image";
import { FieldContent } from "./FieldContent";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function ConstructSection() {
  useGSAP(() => {
    gsap.from("#construct-elements", {
      scrollTrigger: "#construct-elements", // start animation when ".box" enters the viewport
      opacity: 0,
      y: 10,
      duration: 0.5,
      stagger: 0.1,
    });
  });
  return (
    <div>
      <section
        id="construct-elements"
        className="flex h-[460px] w-[1200px] items-center justify-center gap-[200px] rounded-[20px] bg-gray-bright mobile:hidden"
      >
        <Image
          src="/images/landing/construct.png"
          alt="사무실과 현장 간 업무를 자동화 하세요."
          width={527}
          height={347}
          style={{ width: 527, height: 347 }}
          priority={true}
        />
        <FieldContent
          bulletText="현장 업무를 빠르게"
          title="건설"
          desc="사무실과 현장 간 업무를 자동화 하세요."
        />
      </section>
      <section className="hidden bg-gray-bright mobile:block mobile:rounded-[20px] mobile:p-3 mobile:shadow-card">
        <div className="justify-center gap-3 mobile:flex">
          <FieldContent
            bulletText="현장 업무를 빠르게"
            title="건설"
            desc="사무실과 현장 간 업무를 자동화 하세요."
          />
          <Image
            src="/images/landing/construct-responsive.png"
            alt="사무실과 현장 간 업무를 자동화 하세요."
            width={126}
            height={133}
            style={{ width: 126, height: 133 }}
          />
        </div>
      </section>
    </div>
  );
}
