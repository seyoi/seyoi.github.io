"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export function Menu({ isLogin }: { isLogin: boolean }) {
  const handleClickSignOut = () => signOut();

  if (isLogin)
    return (
      <div className="flex items-center justify-center gap-[0.9375rem]">
        <button
          type="button"
          className="flex items-center justify-center rounded-[12px] bg-[#E8E8E8] px-[16px] py-[8px] text-[16px] font-[600] text-[#222222]"
          onClick={handleClickSignOut}
        >
          로그아웃
        </button>
        <Link
          href="/workspaces"
          className="flex items-center justify-center rounded-[8px] bg-[#222222] px-[16px] py-[8px] text-[16px] font-[600] text-[#FFFFFF]"
        >
          내 워크스페이스 목록
        </Link>
      </div>
    );

  return (
    <div className="flex items-center justify-center gap-[0.9375rem]">
      <Link
        href="/get-started"
        className="flex items-center justify-center rounded-[12px] bg-[#E8E8E8] px-[16px] py-[8px] text-[16px] font-[600] text-[#222222]"
      >
        로그인
      </Link>
    </div>
  );
}
