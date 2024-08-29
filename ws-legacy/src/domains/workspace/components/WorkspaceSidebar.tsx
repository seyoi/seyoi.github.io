"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { WorkspaceContext } from "@/domains/workspace/stores/WorkspaceContext";

export default function WorkspaceSidebar() {
  const pathname = usePathname();
  const { workspace, myMembership } = useContext(WorkspaceContext);
  const [isAccountMenuShow, setIsAccountMenuShow] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const handleClickCopilotBot = () => {
    if (isShow) {
      window.Docenty.hide();
      window.Docenty.hideButton();
      setIsShow(false);
      return;
    }
    window.Docenty.show();
    setIsShow(true);
  };

  const handleOpenAccountMenu = () => setIsAccountMenuShow(true);

  const handleCloseAccountMenu = () => setIsAccountMenuShow(false);

  const handleClickSignOut = () => signOut();

  useEffect(() => {
    window.document.addEventListener("mousedown", handleCloseAccountMenu);

    return () =>
      window.document.removeEventListener("mousedown", handleCloseAccountMenu);
  }, []);

  return (
    <div className="sticky left-0 z-[10] flex max-h-[100dvh] flex-col justify-between bg-black-normal">
      <div className="flex flex-col">
        <Link
          href="/workspaces"
          className="flex h-[64px] w-[64px] items-center justify-center text-gray-light"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="38"
            viewBox="0 0 40 38"
            fill="none"
          >
            <path
              d="M17.5774 20.1873H15.8602C15.5765 20.1873 15.3466 20.4125 15.3466 20.6903V23.413C15.3466 23.6908 15.5765 23.916 15.8602 23.916H17.5774C17.861 23.916 18.091 23.6908 18.091 23.413V20.6903C18.091 20.4125 17.861 20.1873 17.5774 20.1873Z"
              fill="currentColor"
            />
            <path
              d="M23.7205 20.1873H22.0034C21.7197 20.1873 21.4897 20.4125 21.4897 20.6903V23.413C21.4897 23.6908 21.7197 23.916 22.0034 23.916H23.7205C24.0042 23.916 24.2342 23.6908 24.2342 23.413V20.6903C24.2342 20.4125 24.0042 20.1873 23.7205 20.1873Z"
              fill="currentColor"
            />
            <path
              d="M34.7488 20.5119H33.5811C33.1481 18.4443 32.064 16.4029 30.3439 14.7213C30.3439 14.7213 26.6647 10.5919 20.907 10.1064C20.8921 10.1064 20.8772 10.1064 20.8622 10.1035C20.701 10.0918 20.5397 10.0801 20.3755 10.0713C20.1873 10.0626 19.9992 10.0596 19.8111 10.0596C19.6229 10.0596 19.4318 10.0655 19.2466 10.0713C19.0824 10.0772 18.9211 10.0889 18.7599 10.1035C18.7449 10.1035 18.727 10.1035 18.7121 10.1064C12.9544 10.5919 9.2812 14.7213 9.2812 14.7213C7.56405 16.4029 6.47702 18.4443 6.044 20.5119H4.86738C4.15962 20.5119 3.58325 21.0734 3.58325 21.7695V24.8578C3.58325 25.5509 4.15663 26.1153 4.86738 26.1153H5.88274C6.27992 29.4054 9.13487 31.9585 12.602 31.9585H19.9604L28.6715 36.5705C30.2633 37.5649 32.3507 36.4448 32.3507 34.5965V29.4259C33.1003 28.493 33.599 27.3582 33.7483 26.1182H34.7517C35.4595 26.1182 36.0359 25.5567 36.0359 24.8607V21.7724C36.0359 21.0793 35.4625 20.5148 34.7517 20.5148L34.7488 20.5119ZM29.0926 25.6591C29.0926 26.747 28.1937 27.6273 27.0828 27.6273H26.9365V30.2974C26.9365 30.5489 26.6528 30.701 26.4378 30.5635L21.8149 27.6273H12.5333C11.4224 27.6273 10.5235 26.747 10.5235 25.6591V19.1783C10.5235 18.0904 11.4224 17.2101 12.5333 17.2101H27.0828C28.1937 17.2101 29.0926 18.0904 29.0926 19.1783V25.6591Z"
              fill="currentColor"
            />
            <path
              d="M15.7622 9.41623C16.6671 9.12962 17.6526 8.91906 18.7097 8.8284C18.7247 8.8284 18.7426 8.8284 18.7575 8.82547C18.9188 8.81377 19.08 8.80208 19.2443 8.7933C19.4324 8.78453 19.6206 8.7816 19.8087 8.7816C19.9968 8.7816 20.188 8.78745 20.3731 8.7933C20.5374 8.79915 20.6986 8.81085 20.8599 8.82547C20.8748 8.82547 20.8898 8.82547 20.9047 8.8284C21.9589 8.91613 22.9444 9.12962 23.8522 9.41623C23.6193 7.67028 22.2396 6.2782 20.4747 5.99452V4.25075C21.1615 3.98755 21.6513 3.33537 21.6513 2.56915C21.6513 1.57188 20.827 0.764709 19.8087 0.764709C18.7904 0.764709 17.9661 1.57188 17.9661 2.56915C17.9661 3.33537 18.4529 3.98755 19.1428 4.25075V5.99452C17.3778 6.2782 15.9951 7.67028 15.7652 9.41623H15.7622Z"
              fill="currentColor"
            />
          </svg>
        </Link>
        <Link
          href={`/workspaces/${workspace?.id}/ai-chatbots`}
          className={`${
            new RegExp(/\/workspaces\/.*\/ai-chatbots.*/).test(pathname)
              ? "border-blue-normal bg-white-light text-white-normal"
              : "border-black-normal text-gray-light"
          } group relative flex h-[48px] w-full items-center justify-center border-l-[2px] hover:bg-white-light hover:text-white-normal`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
          >
            <path
              d="M12.2692 1.59614C12.2692 1.97204 12.1058 2.30977 11.8461 2.54218V4.1346H16.0769C17.4789 4.1346 18.6154 5.27111 18.6154 6.67306V15.1346C18.6154 16.5366 17.4789 17.6731 16.0769 17.6731H5.92307C4.52112 17.6731 3.38461 16.5366 3.38461 15.1346V6.67306C3.38461 5.27111 4.52112 4.1346 5.92307 4.1346H10.1538V2.54218C9.89415 2.30977 9.73076 1.97204 9.73076 1.59614C9.73076 0.895156 10.299 0.326904 11 0.326904C11.7009 0.326904 12.2692 0.895156 12.2692 1.59614ZM5.92307 5.8269C5.45575 5.8269 5.07691 6.20574 5.07691 6.67306V15.1346C5.07691 15.6019 5.45575 15.9807 5.92307 15.9807H16.0769C16.5442 15.9807 16.9231 15.6019 16.9231 15.1346V6.67306C16.9231 6.20574 16.5442 5.8269 16.0769 5.8269H11.8461H10.1538H5.92307ZM8.46153 12.1731C9.16251 12.1731 9.73076 11.6048 9.73076 10.9038C9.73076 10.2029 9.16251 9.6346 8.46153 9.6346C7.76055 9.6346 7.1923 10.2029 7.1923 10.9038C7.1923 11.6048 7.76055 12.1731 8.46153 12.1731ZM13.5385 12.1731C14.2394 12.1731 14.8077 11.6048 14.8077 10.9038C14.8077 10.2029 14.2394 9.6346 13.5385 9.6346C12.8375 9.6346 12.2692 10.2029 12.2692 10.9038C12.2692 11.6048 12.8375 12.1731 13.5385 12.1731Z"
              fill="currentColor"
            />
            <path
              d="M1.83335 13.0192C1.5926 13.0192 1.3542 12.9645 1.13177 12.8582C0.909337 12.7519 0.707232 12.5961 0.536991 12.3996C0.366751 12.2032 0.231708 11.97 0.139575 11.7134C0.0474409 11.4567 2.04133e-05 11.1816 2.04239e-05 10.9038C2.04344e-05 10.626 0.0474409 10.351 0.139575 10.0943C0.231708 9.83766 0.366751 9.60447 0.536991 9.40803C0.707232 9.2116 0.909337 9.05578 1.13177 8.94948C1.3542 8.84317 1.5926 8.78845 1.83335 8.78845L1.83335 10.9038L1.83335 13.0192Z"
              fill="currentColor"
            />
            <path
              d="M20.1666 13.0192C20.4074 13.0192 20.6458 12.9645 20.8682 12.8582C21.0907 12.7519 21.2928 12.5961 21.463 12.3996C21.6332 12.2032 21.7683 11.97 21.8604 11.7134C21.9526 11.4567 22 11.1816 22 10.9038C22 10.626 21.9526 10.351 21.8604 10.0943C21.7683 9.83766 21.6332 9.60447 21.463 9.40803C21.2928 9.2116 21.0907 9.05578 20.8682 8.94948C20.6458 8.84317 20.4074 8.78845 20.1666 8.78845L20.1666 10.9038L20.1666 13.0192Z"
              fill="currentColor"
            />
          </svg>
          <div className="invisible absolute left-[62px] flex items-center justify-center whitespace-nowrap rounded-[4px] bg-black-light px-[8px] py-[4px] text-sm text-white-normal opacity-0 transition-[visibility,opacity] group-hover:visible group-hover:opacity-100">
            챗봇 목록
          </div>
        </Link>
        <Link
          href={`/workspaces/${workspace?.id}/help-desk/user-chats`}
          className={`${
            new RegExp(/\/workspaces\/.*\/help-desk\/user-chats.*/).test(
              pathname,
            )
              ? "border-blue-normal bg-white-light text-white-normal"
              : "border-black-normal text-gray-light"
          } group relative flex h-[48px] w-full items-center justify-center border-l-[2px] hover:bg-white-light hover:text-white-normal`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
          >
            <path
              d="M3 0C2.5313 0 2.12549 0.32553 2.02381 0.78307L0.0238099 9.7831C0.00798991 9.8543 0 9.927 0 10V17C0 17.5523 0.44772 18 1 18H19C19.5523 18 20 17.5523 20 17V10C20 9.927 19.992 9.8543 19.9762 9.7831L17.9762 0.78307C17.8745 0.32553 17.4687 0 17 0H3ZM17.7534 9H13C13 10.6569 11.6569 12 10 12C8.3431 12 7 10.6569 7 9H2.24662L3.80217 2H16.1978L17.7534 9Z"
              fill="currentColor"
            />
          </svg>
          <div className="invisible absolute left-[62px] flex items-center justify-center whitespace-nowrap rounded-[4px] bg-black-light px-[8px] py-[4px] text-sm text-white-normal opacity-0 transition-[visibility,opacity] group-hover:visible group-hover:opacity-100">
            헬프데스크
          </div>
        </Link>
        <Link
          href={`/workspaces/${workspace?.id}/members`}
          className={`${
            new RegExp(/\/workspaces\/\w+\b(?<!\bhelp-desk)\/members.*/).test(
              pathname,
            )
              ? "border-blue-normal bg-white-light text-white-normal"
              : "border-black-normal text-gray-light"
          } group relative flex h-[48px] w-full items-center justify-center border-l-[2px] hover:bg-white-light hover:text-white-normal`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
          >
            <path
              d="M0.802064 17.25C1.21578 14.2857 4.04847 11.8929 7.625 11.8929C11.2016 11.8929 14.0342 14.2857 14.4479 17.25H0.802064ZM7.625 9.53571C4.80274 9.53571 2.65625 7.49718 2.65625 5.14286C2.65625 2.78854 4.80274 0.75 7.625 0.75C10.4473 0.75 12.5938 2.78854 12.5938 5.14286C12.5938 7.49718 10.4473 9.53571 7.625 9.53571ZM17.8735 17.25C17.7735 16.1111 17.4481 15.0323 16.9403 14.0493C18.0425 14.8588 18.8247 15.9847 19.1271 17.25H17.8735ZM16 5.14286C16 4.44917 15.8977 3.77756 15.7067 3.13995C16.7251 3.79449 17.3594 4.85298 17.3594 6C17.3594 7.51934 16.2369 8.89133 14.5953 9.36252C15.4783 8.16097 16 6.71151 16 5.14286Z"
              fill="#292929"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          <div className="invisible absolute left-[62px] flex items-center justify-center whitespace-nowrap rounded-[4px] bg-black-light px-[8px] py-[4px] text-sm text-white-normal opacity-0 transition-[visibility,opacity] group-hover:visible group-hover:opacity-100">
            멤버 관리
          </div>
        </Link>
      </div>
      <div className="flex flex-col">
        <button
          type="button"
          className="group relative flex h-[48px] w-full items-center justify-center border-l-[2px] border-black-normal text-gray-light hover:bg-white-light hover:text-white-normal"
          onClick={handleClickCopilotBot}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
          >
            <g clipPath="url(#clip0_1943_1897)">
              <path
                d="M1 25L2.73199 19.1577C1.23508 16.6684 0.693563 13.7205 1.20813 10.8621C1.7227 8.00367 3.25833 5.42929 5.5295 3.61758C7.80067 1.80587 10.6528 0.880114 13.5557 1.01246C16.4585 1.1448 19.2145 2.32622 21.3112 4.33706C23.408 6.3479 24.7027 9.05132 24.9548 11.9447C25.2068 14.838 24.3991 17.7244 22.6816 20.0672C20.9642 22.41 18.454 24.0497 15.6177 24.6814C12.7814 25.3132 9.81208 24.8941 7.26179 23.502L1 25Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.9099 12.5215H11.1371C11.0095 12.5215 10.906 12.6203 10.906 12.7422V13.9367C10.906 14.0585 11.0095 14.1573 11.1371 14.1573H11.9099C12.0375 14.1573 12.141 14.0585 12.141 13.9367V12.7422C12.141 12.6203 12.0375 12.5215 11.9099 12.5215Z"
                fill="currentColor"
              />
              <path
                d="M14.6743 12.5215H13.9016C13.7739 12.5215 13.6704 12.6203 13.6704 12.7422V13.9367C13.6704 14.0585 13.7739 14.1573 13.9016 14.1573H14.6743C14.8019 14.1573 14.9054 14.0585 14.9054 13.9367V12.7422C14.9054 12.6203 14.8019 12.5215 14.6743 12.5215Z"
                fill="currentColor"
              />
              <path
                d="M19.637 12.6636H19.1115C18.9167 11.7565 18.4288 10.861 17.6548 10.1233C17.6548 10.1233 15.9991 8.31163 13.4082 8.09865C13.4015 8.09865 13.3948 8.09865 13.388 8.09737C13.3155 8.09224 13.2429 8.08711 13.169 8.08326C13.0843 8.07941 12.9997 8.07812 12.915 8.07812C12.8303 8.07812 12.7443 8.08069 12.661 8.08326C12.5871 8.08582 12.5145 8.09095 12.442 8.09737C12.4352 8.09737 12.4272 8.09737 12.4205 8.09865C9.82951 8.31163 8.17656 10.1233 8.17656 10.1233C7.40385 10.861 6.91468 11.7565 6.71982 12.6636H6.19035C5.87185 12.6636 5.61249 12.91 5.61249 13.2153V14.5702C5.61249 14.8743 5.87051 15.1219 6.19035 15.1219H6.64726C6.82599 16.5653 8.11072 17.6854 9.67093 17.6854H12.9822L16.9022 19.7087C17.6185 20.1449 18.5578 19.6535 18.5578 18.8427V16.5743C18.8952 16.165 19.1196 15.6672 19.1868 15.1232H19.6383C19.9568 15.1232 20.2162 14.8769 20.2162 14.5715V13.2166C20.2162 12.9125 19.9581 12.6649 19.6383 12.6649L19.637 12.6636ZM17.0917 14.9218C17.0917 15.399 16.6872 15.7852 16.1873 15.7852H16.1214V16.9566C16.1214 17.067 15.9938 17.1337 15.897 17.0734L13.8167 15.7852H9.64002C9.14011 15.7852 8.73561 15.399 8.73561 14.9218V12.0786C8.73561 11.6013 9.14011 11.2151 9.64002 11.2151H16.1873C16.6872 11.2151 17.0917 11.6013 17.0917 12.0786V14.9218Z"
                fill="currentColor"
              />
              <path
                d="M11.093 7.7955C11.5002 7.66977 11.9437 7.57739 12.4194 7.53762C12.4261 7.53762 12.4342 7.53762 12.4409 7.53633C12.5135 7.5312 12.586 7.52607 12.66 7.52222C12.7446 7.51837 12.8293 7.51709 12.9139 7.51709C12.9986 7.51709 13.0846 7.51966 13.1679 7.52222C13.2418 7.52479 13.3144 7.52992 13.387 7.53633C13.3937 7.53633 13.4004 7.53633 13.4071 7.53762C13.8815 7.57611 14.325 7.66977 14.7335 7.7955C14.6287 7.02954 14.0078 6.41882 13.2136 6.29437V5.52936C13.5227 5.41389 13.7431 5.12778 13.7431 4.79162C13.7431 4.35411 13.3722 4 12.9139 4C12.4557 4 12.0848 4.35411 12.0848 4.79162C12.0848 5.12778 12.3038 5.41389 12.6143 5.52936V6.29437C11.82 6.41882 11.1978 7.02954 11.0944 7.7955H11.093Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_1943_1897">
                <rect width="26" height="26" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <div className="invisible absolute left-[62px] flex items-center justify-center whitespace-nowrap rounded-[4px] bg-black-light px-[8px] py-[4px] text-sm text-white-normal opacity-0 transition-[visibility,opacity] group-hover:visible group-hover:opacity-100">
            도슨티에 문의하기
          </div>
        </button>
        <Link
          href={`/workspaces/${workspace?.id}/settings`}
          className={`${
            new RegExp(/\/workspaces\/.*\/settings/).test(pathname)
              ? "border-blue-normal bg-white-light text-white-normal"
              : "border-black-normal text-gray-light"
          } group relative flex h-[48px] w-full items-center justify-center border-l-[2px] hover:bg-white-light hover:text-white-normal`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
          >
            <path
              d="M9.13889 2.46333C9.61222 0.512222 12.3878 0.512222 12.8611 2.46333C12.9321 2.75644 13.0714 3.02864 13.2675 3.25778C13.4636 3.48691 13.711 3.6665 13.9896 3.78194C14.2682 3.89738 14.5702 3.94539 14.8709 3.92208C15.1716 3.89876 15.4625 3.80478 15.72 3.64778C17.4344 2.60333 19.3978 4.56556 18.3533 6.28111C18.1966 6.53851 18.1027 6.82926 18.0795 7.12975C18.0562 7.43023 18.1042 7.73197 18.2195 8.01042C18.3348 8.28888 18.5142 8.5362 18.743 8.73228C18.9719 8.92836 19.2438 9.06767 19.5367 9.13889C21.4878 9.61222 21.4878 12.3878 19.5367 12.8611C19.2436 12.9321 18.9714 13.0714 18.7422 13.2675C18.5131 13.4636 18.3335 13.711 18.2181 13.9896C18.1026 14.2682 18.0546 14.5702 18.0779 14.8709C18.1012 15.1716 18.1952 15.4625 18.3522 15.72C19.3967 17.4344 17.4344 19.3978 15.7189 18.3533C15.4615 18.1966 15.1707 18.1027 14.8703 18.0795C14.5698 18.0562 14.268 18.1042 13.9896 18.2195C13.7111 18.3348 13.4638 18.5142 13.2677 18.743C13.0716 18.9719 12.9323 19.2438 12.8611 19.5367C12.3878 21.4878 9.61222 21.4878 9.13889 19.5367C9.06787 19.2436 8.92864 18.9714 8.73254 18.7422C8.53644 18.5131 8.28901 18.3335 8.01039 18.2181C7.73176 18.1026 7.42982 18.0546 7.12913 18.0779C6.82844 18.1012 6.5375 18.1952 6.28 18.3522C4.56556 19.3967 2.60222 17.4344 3.64667 15.7189C3.80345 15.4615 3.89728 15.1707 3.92054 14.8703C3.9438 14.5698 3.89583 14.268 3.78052 13.9896C3.66522 13.7111 3.48584 13.4638 3.25697 13.2677C3.02809 13.0716 2.75618 12.9323 2.46333 12.8611C0.512222 12.3878 0.512222 9.61222 2.46333 9.13889C2.75644 9.06787 3.02864 8.92864 3.25778 8.73254C3.48691 8.53644 3.6665 8.28901 3.78194 8.01039C3.89738 7.73176 3.94539 7.42982 3.92208 7.12913C3.89876 6.82844 3.80478 6.5375 3.64778 6.28C2.60333 4.56556 4.56556 2.60222 6.28111 3.64667C7.39222 4.32222 8.83222 3.72444 9.13889 2.46333Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.66667 11C7.66667 11.8841 8.01786 12.7319 8.64298 13.357C9.2681 13.9821 10.1159 14.3333 11 14.3333C11.8841 14.3333 12.7319 13.9821 13.357 13.357C13.9821 12.7319 14.3333 11.8841 14.3333 11C14.3333 10.1159 13.9821 9.2681 13.357 8.64298C12.7319 8.01786 11.8841 7.66667 11 7.66667C10.1159 7.66667 9.2681 8.01786 8.64298 8.64298C8.01786 9.2681 7.66667 10.1159 7.66667 11Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="invisible absolute left-[62px] flex items-center justify-center whitespace-nowrap rounded-[4px] bg-black-light px-[8px] py-[4px] text-sm text-white-normal opacity-0 transition-[visibility,opacity] group-hover:visible group-hover:opacity-100">
            워크스페이스 설정
          </div>
        </Link>
        <div className="relative">
          <button
            type="button"
            className={`${
              isAccountMenuShow
                ? "border-blue-normal bg-white-light text-white-normal"
                : "border-black-normal text-gray-light"
            } group relative flex h-[48px] w-full items-center justify-center border-l-[2px] hover:bg-white-light hover:text-white-normal`}
            onClick={handleOpenAccountMenu}
          >
            <div className="relative flex h-[24px] w-[24px] items-center justify-center overflow-hidden rounded-[50%] bg-white-normal">
              <Image
                src={myMembership?.avatarUrl || "/images/default/dcty.png"}
                alt="member avatar"
                fill
                sizes="24px"
              />
            </div>
            <div className="invisible absolute left-[62px] flex items-center justify-center whitespace-nowrap rounded-[4px] bg-black-light px-[8px] py-[4px] text-sm text-white-normal opacity-0 transition-[visibility,opacity] group-hover:visible group-hover:opacity-100">
              개인 설정
            </div>
          </button>
          <div
            className={`${isAccountMenuShow ? "visible opacity-100" : "invisible opacity-0"} absolute bottom-[20px] left-[80px] z-[10] flex w-[224px] flex-col gap-[4px] rounded-[8px] border border-gray-lighter bg-white-normal px-[8px] py-[12px] shadow-card`}
            onMouseDownCapture={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-[12px]">
              <div className="relative flex h-[44px] w-[44px] shrink-0 items-center justify-center overflow-hidden rounded-[50%] bg-white-normal">
                <Image
                  src={myMembership?.avatarUrl || "/images/default/dcty.png"}
                  alt="member avatar"
                  fill
                  sizes="44px"
                />
              </div>
              <div className="flex max-w-[133px] flex-col gap-[4px]">
                <div className="truncate text-md">{myMembership?.name}</div>
                <div className="truncate text-md text-gray-normal">
                  {myMembership?.email}
                </div>
              </div>
            </div>
            <Link
              href={`/workspaces/${workspace?.id}/members/me`}
              className="flex items-center gap-[8px] rounded-[4px] px-[8px] py-[4px] hover:bg-blue-normal hover:text-white-normal"
            >
              <div className="flex h-[16px] w-[16px] items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                >
                  <path
                    d="M5.39111 9.10592C5.77434 9.06589 6.08788 9.38213 6.08788 9.76744V9.76744C6.08788 10.1528 5.77397 10.4599 5.39238 10.5134C3.47094 10.7826 1.94364 12.1499 1.59631 13.8948C1.51426 14.307 1.18127 14.6512 0.760985 14.6512V14.6512C0.340705 14.6512 -0.00586355 14.3083 0.0557561 13.8926C0.428588 11.3771 2.62935 9.39442 5.39111 9.10592ZM6.08788 8.37209C3.56522 8.37209 1.52197 6.49884 1.52197 4.18605C1.52197 1.87326 3.56522 0 6.08788 0C8.61055 0 10.6538 1.87326 10.6538 4.18605C10.6538 6.49884 8.61055 8.37209 6.08788 8.37209ZM6.08788 6.97674C7.76966 6.97674 9.13182 5.72791 9.13182 4.18605C9.13182 2.64419 7.76966 1.39535 6.08788 1.39535C4.40611 1.39535 3.04394 2.64419 3.04394 4.18605C3.04394 5.72791 4.40611 6.97674 6.08788 6.97674ZM7.74312 12.5956C7.93024 12.4965 8.01978 12.282 8.00013 12.0713C7.99365 12.0018 7.99035 11.9315 7.99035 11.8605C7.99035 11.7894 7.99365 11.7191 8.00013 11.6497C8.01978 11.4389 7.93022 11.2245 7.74315 11.1255V11.1255C7.50812 11.0011 7.42852 10.703 7.57022 10.478L7.80678 10.1024C7.95448 9.86781 8.25801 9.78674 8.503 9.91642V9.91642C8.69635 10.0188 8.93016 9.98743 9.1135 9.86809C9.25463 9.77623 9.40595 9.69664 9.56559 9.63104C9.75447 9.55343 9.89281 9.37805 9.89281 9.17384V9.17384C9.89281 8.92371 10.0956 8.72093 10.3457 8.72093H10.9619C11.212 8.72093 11.4148 8.92371 11.4148 9.17384V9.17384C11.4148 9.37805 11.5531 9.55342 11.742 9.63105C11.9016 9.69664 12.0529 9.77621 12.194 9.86805C12.3773 9.98741 12.6112 10.0187 12.8046 9.91638V9.91638C13.0496 9.78669 13.3531 9.86775 13.5009 10.1023L13.7374 10.4779C13.8791 10.7029 13.7995 11.001 13.5644 11.1254V11.1254C13.3774 11.2244 13.2878 11.4388 13.3075 11.6496C13.3139 11.7191 13.3172 11.7894 13.3172 11.8605C13.3172 11.9315 13.3139 12.0018 13.3075 12.0713C13.2878 12.282 13.3774 12.4965 13.5645 12.5955V12.5955C13.7995 12.7199 13.8791 13.0179 13.7374 13.243L13.5009 13.6185C13.3532 13.8531 13.0496 13.9342 12.8046 13.8045V13.8045C12.6113 13.7021 12.3774 13.7335 12.1941 13.8528C12.053 13.9447 11.9017 14.0243 11.7421 14.0898C11.5532 14.1675 11.4149 14.3428 11.4149 14.5471V14.5471C11.4149 14.7972 11.2121 15 10.9619 15H10.3458C10.0956 15 9.89289 14.7972 9.89289 14.5471V14.5471C9.89289 14.3429 9.75452 14.1675 9.56562 14.0899C9.406 14.0243 9.25471 13.9448 9.1136 13.8529C8.93025 13.7335 8.6964 13.7022 8.50304 13.8046V13.8046C8.25808 13.9342 7.95455 13.8532 7.80685 13.6187L7.57022 13.2429C7.42853 13.018 7.50811 12.72 7.74312 12.5956V12.5956ZM10.6538 12.907C11.2842 12.907 11.7953 12.4384 11.7953 11.8605C11.7953 11.2825 11.2842 10.814 10.6538 10.814C10.0234 10.814 9.51232 11.2825 9.51232 11.8605C9.51232 12.4384 10.0234 12.907 10.6538 12.907Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="text-md">개인 설정</div>
            </Link>
            <button
              type="button"
              className="flex items-center gap-[8px] rounded-[4px] px-[8px] py-[4px] text-red-normal"
              onClick={handleClickSignOut}
            >
              <div className="flex h-[16px] w-[16px] items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                >
                  <path
                    d="M2.21053 11.9213H3.68421V13.395H12.5263V1.60552H3.68421V3.0792H2.21053V0.868678C2.21053 0.461735 2.54043 0.131836 2.94737 0.131836H13.2632C13.6701 0.131836 14 0.461735 14 0.868678V14.1318C14 14.5388 13.6701 14.8687 13.2632 14.8687H2.94737C2.54043 14.8687 2.21053 14.5388 2.21053 14.1318V11.9213ZM3.68421 6.76341H8.84211V8.2371H3.68421V10.4476L0 7.50026L3.68421 4.55289V6.76341Z"
                    fill="#FF5C5C"
                  />
                </svg>
              </div>
              <div className="text-md">로그아웃</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
