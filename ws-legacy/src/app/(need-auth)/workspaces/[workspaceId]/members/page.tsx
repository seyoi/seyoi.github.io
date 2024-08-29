import Link from "next/link";
import Image from "next/image";
import { getMembers } from "@/domains/workspace/actions/getMembers";
import InviteMemberModal from "@/domains/workspace/components/InviteMemberModal";

export default async function MembersPage({
  params,
  searchParams,
}: {
  params: { workspaceId: string };
  searchParams?: { [key: string]: string | undefined };
}) {
  const { workspaceId } = params;
  const inviting = searchParams?.inviting;

  const { members } = await getMembers({ workspaceId });

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b border-gray-lightest p-[20px]">
        <div className="flex items-center gap-[12px]">
          <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[12px] bg-gray-lighter">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
            >
              <path
                d="M0.802064 17.25C1.21578 14.2857 4.04847 11.8929 7.625 11.8929C11.2016 11.8929 14.0342 14.2857 14.4479 17.25H0.802064ZM7.625 9.53571C4.80274 9.53571 2.65625 7.49718 2.65625 5.14286C2.65625 2.78854 4.80274 0.75 7.625 0.75C10.4473 0.75 12.5938 2.78854 12.5938 5.14286C12.5938 7.49718 10.4473 9.53571 7.625 9.53571ZM17.8735 17.25C17.7735 16.1111 17.4481 15.0323 16.9403 14.0493C18.0425 14.8588 18.8247 15.9847 19.1271 17.25H17.8735ZM16 5.14286C16 4.44917 15.8977 3.77756 15.7067 3.13995C16.7251 3.79449 17.3594 4.85298 17.3594 6C17.3594 7.51934 16.2369 8.89133 14.5953 9.36252C15.4783 8.16097 16 6.7115 16 5.14286Z"
                fill="#A6A6A6"
                stroke="#292929"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="text-lg">멤버 관리</div>
          </div>
        </div>
        <Link
          href={`/workspaces/${workspaceId}/members?inviting=true`}
          className="flex items-center justify-center gap-[12px] rounded-[8px] bg-black-normal px-[16px] py-[8px]"
        >
          <svg
            className="shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
          >
            <path
              d="M6.28114 10.9631H7.71886V8.21886H10.4631V6.78113H7.71886V4.03692H6.28114V6.78113H3.53692V8.21886H6.28114V10.9631ZM7 14.5C6.02908 14.5 5.11809 14.3164 4.26702 13.9491C3.41594 13.5819 2.67563 13.0835 2.04607 12.4539C1.41651 11.8244 0.918112 11.0841 0.550867 10.233C0.183622 9.38191 0 8.47092 0 7.5C0 6.52908 0.183622 5.61809 0.550867 4.76702C0.918112 3.91594 1.41651 3.17563 2.04607 2.54607C2.67563 1.91651 3.41594 1.41811 4.26702 1.05087C5.11809 0.683622 6.02908 0.5 7 0.5C7.97092 0.5 8.88191 0.683622 9.73298 1.05087C10.5841 1.41811 11.3244 1.91651 11.9539 2.54607C12.5835 3.17563 13.0819 3.91594 13.4491 4.76702C13.8164 5.61809 14 6.52908 14 7.5C14 8.47092 13.8164 9.38191 13.4491 10.233C13.0819 11.0841 12.5835 11.8244 11.9539 12.4539C11.3244 13.0835 10.5841 13.5819 9.73298 13.9491C8.88191 14.3164 7.97092 14.5 7 14.5ZM7 12.9392C8.52125 12.9392 9.80809 12.413 10.8605 11.3605C11.913 10.3081 12.4392 9.02125 12.4392 7.5C12.4392 5.97875 11.913 4.69191 10.8605 3.63945C9.80809 2.58701 8.52125 2.06079 7 2.06079C5.47875 2.06079 4.19191 2.58701 3.13945 3.63945C2.08701 4.69191 1.56079 5.97875 1.56079 7.5C1.56079 9.02125 2.08701 10.3081 3.13945 11.3605C4.19191 12.413 5.47875 12.9392 7 12.9392Z"
              fill="white"
            />
          </svg>
          <div className="whitespace-nowrap text-md text-white-normal">
            멤버 추가하기
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-between p-[16px]">
        <div className="text-[16px] font-[600] text-[#222222]">
          총 {members.length}명이 워크스페이스에 참여중입니다
        </div>
      </div>
      <div className="flex flex-col p-[16px]">
        <div className="grid grid-cols-[minmax(180px,1fr),180px] items-center border-b border-[#0000001A] px-[16px] py-[8px]">
          <div className="text-[14px] font-[500] text-[#757575]">이름</div>
          <div className="text-[14px] font-[500] text-[#757575]">이메일</div>
        </div>
        {members.map((member) => (
          <div
            key={member.id}
            className="grid grid-cols-[minmax(180px,1fr),180px] items-center border-b border-[#0000001A] px-[16px] py-[8px]"
          >
            <div className="flex items-center gap-[8px]">
              <div className="relative flex h-[16px] w-[16px] items-center justify-center overflow-hidden rounded-[50%]">
                <Image src={member.avatarUrl} alt="avatar" fill />
              </div>
              <div className="text-[14px] font-[600] text-[#222222]">
                <span className="line-clamp-1">{member.name}</span>
              </div>
            </div>
            <div className="text-[14px] text-[#222222]">
              <span className="line-clamp-1">{member.email}</span>
            </div>
          </div>
        ))}
      </div>
      {inviting && <InviteMemberModal />}
    </div>
  );
}
