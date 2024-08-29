"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PriceCard } from "./PriceCard";
import { useEffect, useState } from "react";
import { PaymentPlanType } from "@prisma/client";
import { Session } from "next-auth";
import { getUserPaymentPlan } from "@/domains/landing/actions/getUserPaymentPlan";

export function PriceSection({ session }: { session?: Session | null }) {
  const userId = session?.user.id;
  const [currentPlan, setCurrentPlan] = useState<PaymentPlanType>(
    PaymentPlanType.NO_PLAN,
  );

  gsap.registerPlugin(useGSAP, ScrollTrigger);
  useGSAP(() => {
    gsap.from("#price-elements", {
      scrollTrigger: "#price-elements", // start animation when ".box" enters the viewport
      opacity: 0,
      y: 10,
      duration: 0.5,
      stagger: 0.1,
    });
  });

  useEffect(() => {
    const handlePaid = async () => {
      if (userId) {
        const planResult = await getUserPaymentPlan(userId);
        const data = planResult.result.data as { plan: PaymentPlanType };
        setCurrentPlan(data?.plan || PaymentPlanType.NO_PLAN);
      }
    };

    handlePaid();
  }, [userId]);

  return (
    <section
      id="price"
      className="mt-[80px] flex flex-col items-center justify-center gap-10 mobile:mt-[120px] mobile:w-full mobile:px-[14px]"
    >
      <h2
        id="price-elements"
        className="flex flex-col items-center gap-3 text-xl text-blue-normal mobile:gap-2 mobile:text-boldmd"
      >
        업무 환경에 맞는 다양한 플랜을 제공합니다.
        <span className="text-3xl text-black-normal mobile:text-boldlg">
          합리적인 가격의 AI 자동화 서비스
        </span>
      </h2>
      <div className="mobile:w-full">
        <article className="flex gap-6 mobile:flex-col mobile:gap-4">
          <div id="price-elements">
            <PriceCard
              title="기본"
              desc="성실 상담원 시급 38원"
              price="2.7만원"
              plan={PaymentPlanType.BASIC}
              userPlan={currentPlan}
              session={session}
              feature={[
                "챗봇 1개",
                "월 최대 2천개 메세지",
                "학습 웹페이지,문서 페이지 25장",
                "업로드한 파일 최대 10개",
                "최대 파일 크기 10MB",
                "채팅 히스토리",
              ]}
            />
          </div>
          <div id="price-elements">
            <PriceCard
              title="프로"
              desc="전문 상담원 시급 195원"
              price="14만원"
              plan={PaymentPlanType.PRO}
              userPlan={currentPlan}
              session={session}
              feature={[
                "기본 플랜 모든 기능",
                "월 최대 1만개 메세지",
                "업로드한 파일 최대 1000개",
                "최대 파일 크기 100MB",
                "여러 채널 연동",
              ]}
            />
          </div>
          <div id="price-elements">
            <PriceCard
              title="엔터프라이즈"
              desc="전문가 컨설팅 시급 2,500원"
              price="1천만원+100만원"
              plan={PaymentPlanType.ENTERPRISE}
              userPlan={currentPlan}
              session={session}
              feature={[
                "프로 플랜 모든 기능",
                "무제한 챗봇",
                "학습페이지 1천만 장",
                "개발자 API",
                "커스텀 도메인",
                "기능 추가 의뢰",
                "AI 전문가 컨설팅",
                "AI 전문가가 맞춤 챗봇 생성",
              ]}
            />
          </div>
        </article>
      </div>
    </section>
  );
}
