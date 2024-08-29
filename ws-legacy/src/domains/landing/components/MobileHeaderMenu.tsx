"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function MobileMenu({ isLogin }: { isLogin: boolean }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const handleClickSignOut = () => signOut();

  useEffect(() => {
    const mainPage = document.getElementsByTagName("main")[0];
    const overlay = document.createElement("div");
    overlay.className = "fixed inset-0 z-40 bg-black opacity-50";

    if (isMobileOpen) {
      document.body.style.overflow = "hidden";

      mainPage.style.position = "relative";

      mainPage.style.zIndex = "0";
      mainPage.appendChild(overlay);
    } else {
      document.body.style.overflow = "unset";
      if (mainPage.contains(overlay)) {
        mainPage.removeChild(overlay);
      }
    }

    // Cleanup function to remove overlay when component is unmounted or dependencies change
    return () => {
      if (mainPage.contains(overlay)) {
        mainPage.removeChild(overlay);
      }
    };
  }, [isMobileOpen]);

  const handleMobileButton = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  useGSAP(() => {
    if (isMobileOpen) {
      gsap.to(navRef.current, {
        height: "auto",
        duration: 0.5,
        ease: "power1.inOut",
        zIndex: "9999",
      });
    } else {
      gsap.to(navRef.current, {
        height: 0,
        duration: 0.5,
        ease: "power1.inOut",
      });
    }
  }, [isMobileOpen]);
  return (
    <>
      <button
        onClick={handleMobileButton}
        className={`ml-auto transform duration-300 ${isMobileOpen ? "rotate-45" : "rotate-0"}`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 7H13M7 1V13"
            stroke="#292929"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        ref={navRef}
        className="absolute left-0 top-full h-0 w-full overflow-hidden rounded-b-[30px] bg-white"
      >
        {!isLogin && (
          <div className="flex flex-col gap-2 rounded-[30px] p-4">
            <Link
              href="/get-started"
              className="rounded-[30px] bg-gray-lightest p-4 text-center text-lg text-black-normal"
            >
              로그인
            </Link>
            <Link
              href="/workspaces"
              className="rounded-[30px] bg-black-normal p-4 text-center text-lg text-white-normal"
            >
              워크스페이스
            </Link>
          </div>
        )}
        {isLogin && (
          <div className="flex flex-col gap-2 rounded-[30px] p-4">
            <button
              onClick={handleClickSignOut}
              className="rounded-[30px] bg-gray-lightest p-4 text-center text-lg text-black-normal"
            >
              로그아웃
            </button>
            <Link
              href="/workspaces"
              className="rounded-[30px] bg-black-normal p-4 text-center text-lg text-white-normal"
            >
              워크스페이스
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
