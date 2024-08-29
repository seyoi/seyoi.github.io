import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "초기창업패키지 (초창패) AI 도우미 | 도슨티 문서똑똑. 모집 공고 오픈 임박 기념.",
  description:
    "창업사업화 지원사업 사업계획서 어시스턴트, AI 상담, 창업 컨설팅 | 챗GPT (챗지피티), ChatGPT, AI, 초기 창업, 스타트업, 펀딩, 예창패, 예비창업패키지, 초창패, 초기창업패키지, 창업중심대학, 창업사업화, 중기부, 창진원, 정부지원사업, 사업계획서, 자동 작성, 완벽 가이드, 프롬프트. 뤼튼, GetGPT 보다 쉽게 사용. 모집 공고.",
};

export default function ChochangpaePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
