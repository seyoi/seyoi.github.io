"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";

export function Menu({ isLogin }: { isLogin: boolean }) {
  const handleClickSignOut = () => signOut();

  if (isLogin)
    return (
      <>
        <div className="ml-10 flex gap-10 text-md text-gray-normal">
          <Link className="hover:text-black-normal" href="/#business">
            제품소개
          </Link>
          <Link className="hover:text-black-normal" href="/#price">
            요금
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={handleClickSignOut}
            className="rounded-xl px-3 py-2 text-md text-black-normal duration-300 ease-out hover:bg-black-normal hover:text-white-normal"
          >
            로그아웃
          </button>
          <Link
            href="/workspaces"
            className="group flex items-center gap-2 rounded-xl border bg-black-normal px-3 py-2 text-md text-white-normal duration-300 ease-out hover:border hover:border-black-normal hover:bg-white-normal hover:text-black-normal"
          >
            워크스페이스
            <svg
              width="15"
              height="9"
              viewBox="0 0 15 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-white-normal hover:fill-black-normal"
            >
              <path
                d="M1 4.49998H13M13 4.49998L9.57143 7.92855M13 4.49998L9.57143 1.07141"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </>
    );

  return (
    <>
      <div className="ml-10 flex gap-10 text-md text-gray-normal">
        <button className="hover:text-black-normal">제품소개</button>
        <button className="hover:text-black-normal">요금</button>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <Link
          href="/get-started"
          className="rounded-xl px-3 py-2 text-md text-black-normal duration-300 ease-out hover:bg-black-normal hover:text-white-normal"
        >
          로그인
        </Link>
        <Link
          href="/workspaces"
          className="group flex items-center gap-2 rounded-xl border bg-black-normal px-3 py-2 text-md text-white-normal duration-300 ease-out hover:border hover:border-black-normal hover:bg-white-normal hover:text-black-normal"
        >
          워크스페이스
          <svg
            width="15"
            height="9"
            viewBox="0 0 15 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-white-normal hover:fill-black-normal"
          >
            <path
              d="M1 4.49998H13M13 4.49998L9.57143 7.92855M13 4.49998L9.57143 1.07141"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </>
  );
}
