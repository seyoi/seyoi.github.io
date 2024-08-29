"use client";
import React, { useRef } from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { useWindowSize } from "../hooks/useWindowSize";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const partners = [
  { src: "/images/partners/upstage.png", alt: "upstage", width: 112 },
  { src: "/images/partners/withie.png", alt: "withie", width: 123 },
  { src: "/images/partners/woomi.png", alt: "woomi", width: 91 },
  { src: "/images/partners/quantec.png", alt: "quantec", width: 125 },
  { src: "/images/partners/matrix-cloud.png", alt: "matrix-cloud", width: 70 },
  { src: "/images/partners/primer.png", alt: "primer", width: 89 },
  { src: "/images/partners/kaist.png", alt: "kaist", width: 59 },
  { src: "/images/partners/f-lab.png", alt: "f-lab", width: 82 },
  { src: "/images/partners/realizable.png", alt: "realizable", width: 44 },
  {
    src: "/images/partners/team-snowball.png",
    alt: "team-snowball",
    width: 136,
  },
  { src: "/images/partners/mfds.png", alt: "mfds", width: 170 },
];

export function IndustrySection() {
  gsap.registerPlugin(useGSAP);

  const size = useWindowSize();
  const isMobile = size.width <= 640; // Tailwind's default mobile breakpoint is 640px
  const isSmallMobile = size.width <= 390; // Custom mobile breakpoint for wrapping
  const industry = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    gsap.from("#industry-elements", {
      scrollTrigger: {
        trigger: "#industry-elements",
      }, // start animation when ".box" enters the viewport
      opacity: 0,
      y: 10,
      duration: 0.5,
      stagger: 0.1,
    });
  });

  return (
    <section
      ref={industry}
      className="flex h-[340px] flex-col items-center justify-center bg-gradient-to-r from-[#E9E9E9] via-[#FFFFFF] to-[#E9E9E9] mobile:mt-[80px] mobile:h-[245px]"
    >
      <h2
        id="industry-elements"
        className="flex items-center justify-center gap-1 text-xl text-gray-normal mobile:text-boldmd"
      >
        도슨티와 함께하는 성장 파트너스
        <span className="leading-none">🙌</span>
      </h2>
      <h3 id="industry-elements" className="text-3xl mobile:text-xl">
        Trusted Partners
      </h3>
      <div
        id="industry-elements"
        className="mt-[70px] mobile:mt-10"
        style={{ width: "100%" }}
      >
        <Marquee autoFill gradient={!isMobile} gradientColor="#E9E9E9">
          <div
            className={`flex ${isSmallMobile ? "flex-wrap" : "flex-nowrap"} items-center justify-center gap-10 mobile:gap-5`}
          >
            {partners.map((partner, index) => (
              <Image
                id="industry-elements"
                key={index}
                src={partner.src}
                alt={partner.alt}
                width={partner.width}
                height={24}
                className="mx-10"
                style={{ width: partner.width, height: 24 }}
              />
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
}
