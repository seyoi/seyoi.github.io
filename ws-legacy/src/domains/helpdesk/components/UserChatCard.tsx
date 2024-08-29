"use client";

import Link from "next/link";
import Image from "next/image";
import { formatTime } from "@/common/utils/formatTime";
import type { MessageFile } from "@prisma/client";

export function UserChatCard({
  href,
  isActive,
  avatarUrl,
  name,
  createdAt,
  plainText,
  files,
  unreadCount,
  onClick,
}: {
  href: string;
  isActive: boolean;
  avatarUrl: string;
  name: string;
  createdAt: Date;
  plainText: string | null;
  files: MessageFile[] | null;
  unreadCount?: number;
  onClick: () => Promise<void>;
}) {
  return (
    <Link href={href} onClick={onClick}>
      <div
        className={`${isActive ? "bg-blue-light" : "bg-blue-lighter"} flex items-center gap-[12px] rounded-[8px] p-[8px] hover:bg-blue-light`}
      >
        <div className="relative flex h-[36px] w-[36px] shrink-0 items-center justify-center overflow-hidden rounded-[50%]">
          <Image src={avatarUrl} alt="end user avatar" fill sizes="36px" />
        </div>
        <div className="flex flex-1 flex-col gap-[4px] overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="truncate text-md">{name}</div>
            <div className="truncate text-md">{formatTime(createdAt)}</div>
          </div>
          <div className="flex items-center justify-between">
            {plainText && (
              <div className="line-clamp-1 break-all text-md text-gray-normal">
                {plainText}
              </div>
            )}
            {!plainText && files && !!files.length && (
              <div className="line-clamp-1 break-all text-md text-gray-normal">
                [파일]
              </div>
            )}
            {!!unreadCount && (
              <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[50%] bg-red-normal text-sm text-white-normal">
                {unreadCount}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
