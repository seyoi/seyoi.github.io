"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavigateToOtherBusinessPlanButton() {
  const pathname = usePathname();
  const href = () => {
    if (pathname.includes("/yechangpae")) return "/business-plan/chochangpae";

    return "/business-plan/yechangpae";
  };
  const content = () => {
    if (pathname.includes("/yechangpae"))
      return "초기 창업 패키지도 작성해보기";

    return "예비 창업 패키지도 작성해보기";
  };

  return (
    <Link
      href={href()}
      className="flex items-center justify-center gap-[0.25rem] rounded-[0.5rem] bg-[#416BFF] px-[1rem] py-[0.5rem] hover:bg-[#3356D1]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z"
          fill="white"
        />
      </svg>
      <span className="text-[1rem] font-[600] text-[#FFFFFF]">{content()}</span>
    </Link>
  );
}
