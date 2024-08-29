"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useContext, useState } from "react";
import { AlertContext } from "@/common/stores/AlertContext";
import Image from "next/image";
import KAKAO_LOGIN_IMAGE from "../../../../public/images/auth/kakao_login_medium_narrow.png";

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const [email, setEmail] = useState("");
  const { addAlert } = useContext(AlertContext);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handleSubmitSignInWithEmail = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (!email) {
      addAlert({ type: "error", text: "이메일을 입력해주세요!" });
      return;
    }
    await signIn("email", {
      email,
      redirect: false,
      callbackUrl: redirectTo || "/workspaces",
    });
    router.push(`/check-email?email=${email}`);
  };

  const handleClickSignInWithGoogle = async () => {
    await signIn("google", {
      callbackUrl: redirectTo || "/workspaces",
    });
  };

  const handleClickSignInWithKakao = async () => {
    await signIn("kakao", {
      callbackUrl: redirectTo || "/",
    });
  };

  return (
    <div className="flex flex-col gap-[44px]">
      <form
        className="flex flex-col gap-[44px]"
        onSubmit={handleSubmitSignInWithEmail}
      >
        <label
          htmlFor="email"
          className="flex items-center gap-[16px] border-b border-gray-lighter px-[12px] py-[8px] focus-within:border-blue-normal hover:border-blue-normal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="19"
            viewBox="0 0 22 19"
            fill="none"
          >
            <path
              d="M1 3.30305C1 2.69684 1.23413 2.11546 1.65087 1.6868C2.06762 1.25815 2.63285 1.01733 3.22222 1.01733H18.7778C19.3671 1.01733 19.9324 1.25815 20.3491 1.6868C20.7659 2.11546 21 2.69684 21 3.30305M1 3.30305V14.7316C1 15.3378 1.23413 15.9192 1.65087 16.3479C2.06762 16.7765 2.63285 17.0173 3.22222 17.0173H18.7778C19.3671 17.0173 19.9324 16.7765 20.3491 16.3479C20.7659 15.9192 21 15.3378 21 14.7316V3.30305M1 3.30305L11 10.1602L21 3.30305"
              stroke="#416BFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            id="email"
            type="email"
            className="w-full text-md outline-none placeholder:text-gray-normal"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={handleChangeEmail}
            autoComplete="on"
          />
        </label>
        <button className="rounded-[8px] bg-blue-normal p-[8px] text-lg text-white-normal hover:bg-blue-dark">
          가입하기
        </button>
      </form>
      <div className="flex items-center gap-[76px]">
        <div className="w-[161px] border-b border-gray-light"></div>
        <div className="whitespace-nowrap bg-white-normal text-gray-light">
          또는
        </div>
        <div className="w-[161px] border-b border-gray-light"></div>
      </div>
      <div className="flex justify-center gap-2">
        <button
          type="button"
          className="flex items-center gap-[8px] rounded-[40px] border border-gray-normal px-[12px] py-[8px]"
          onClick={handleClickSignInWithGoogle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
          >
            <g clipPath="url(#clip0_739_5301)">
              <mask
                id="mask0_739_5301"
                style={{ maskType: "luminance" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="20"
                height="21"
              >
                <path d="M20 0.017334H0V20.0173H20V0.017334Z" fill="white" />
              </mask>
              <g mask="url(#mask0_739_5301)">
                <path
                  d="M19.6 10.2474C19.6 9.53739 19.54 8.85739 19.42 8.19739H10V12.0674H15.38C15.15 13.3174 14.44 14.3774 13.38 15.0874V17.5974H16.61C18.5 15.8574 19.59 13.2974 19.59 10.2474H19.6Z"
                  fill="#4779BD"
                />
                <path
                  d="M10.0001 20.0174C12.7001 20.0174 14.9601 19.1174 16.6201 17.5974L13.3901 15.0874C12.4901 15.6874 11.3501 16.0374 10.0001 16.0374C7.40006 16.0374 5.19006 14.2774 4.40006 11.9174H1.06006V14.5074C2.71006 17.7774 6.09006 20.0174 10.0001 20.0174Z"
                  fill="#38A052"
                />
                <path
                  d="M4.4 11.9173C4.2 11.3173 4.09 10.6773 4.09 10.0173C4.09 9.35734 4.2 8.71734 4.4 8.11734V5.52734H1.06C0.38 6.87734 0 8.40734 0 10.0173C0 11.6273 0.39 13.1573 1.06 14.5073L4.4 11.9173Z"
                  fill="#F0B61A"
                />
                <path
                  d="M10.0001 3.99738C11.4701 3.99738 12.7901 4.49738 13.8201 5.49738L16.6901 2.62738C14.9601 1.01738 12.6901 0.0273771 10.0001 0.0273771C6.09006 0.0173771 2.71006 2.25738 1.06006 5.52738L4.40006 8.11738C5.19006 5.75738 7.39006 3.99738 10.0001 3.99738Z"
                  fill="#DC4336"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_739_5301">
                <rect
                  width="20"
                  height="20"
                  fill="white"
                  transform="translate(0 0.017334)"
                />
              </clipPath>
            </defs>
          </svg>
          <div className="text-md text-gray-normal">구글 간편 로그인</div>
        </button>
        <button onClick={handleClickSignInWithKakao}>
          <Image
            src={KAKAO_LOGIN_IMAGE}
            alt="카카오 로그인 버튼"
            width={154}
            height={68}
          />
        </button>
      </div>
    </div>
  );
}
