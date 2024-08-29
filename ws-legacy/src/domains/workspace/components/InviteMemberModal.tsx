"use client";

import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { getInvitationByWorkspaceId } from "@/domains/workspace/actions/getInvitationByWorkspaceId";
import { updateInvitation } from "@/domains/workspace/actions/updateInvitation";
import { type WorkspaceInvitation } from "@prisma/client";
import { AlertContext } from "@/common/stores/AlertContext";

export default function InviteMemberModal() {
  const router = useRouter();
  const { workspaceId }: { workspaceId: string } = useParams();
  const { addAlert } = useContext(AlertContext);
  const [invitation, setInvitation] = useState<WorkspaceInvitation | null>(
    null,
  );

  useEffect(() => {
    const init = async () => {
      const { invitation, error } = await getInvitationByWorkspaceId({
        workspaceId,
      });

      if (error) console.error(error);

      setInvitation(invitation);
    };
    init();
  }, [workspaceId]);

  const closeModal = () => router.push(`/workspaces/${workspaceId}/members`);

  const handleClickCopyLink = async () => {
    await window.navigator.clipboard.writeText(invitation?.url as string);
    addAlert({ type: "ok", text: "클립보드에 복사했습니다." });
  };

  const handleClickReissue = async () => {
    try {
      if (!invitation) throw "handleClickReissue: No invitation";

      const { invitation: updatedInvitation, error } = await updateInvitation({
        invitationId: invitation.id,
      });

      if (error) throw error;

      setInvitation(updatedInvitation);
      addAlert({ type: "ok", text: "링크를 재발급했습니다." });
    } catch (err) {
      console.error(err);
      addAlert({ type: "error", text: "재발급에 실패했습니다." });
    }
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 top-0 z-[9999] flex items-center justify-center bg-[rgba(0,0,0,0.30)]"
      onClick={closeModal}
    >
      <div
        className="w-[min(720px,100%)] rounded-[8px] bg-[#FFFFFF] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.10)] p-[16px]">
          <div className="text-[16px] font-[600] text-[#222222]">멤버 초대</div>
          <button
            type="button"
            className="flex h-[14px] w-[14px] items-center justify-center"
            onClick={closeModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M1.97436 14L0 12.0256L5.02564 7L0 1.97436L1.97436 0L7 5.02564L12.0256 0L14 1.97436L8.97436 7L14 12.0256L12.0256 14L7 8.97436L1.97436 14Z"
                fill="#757575"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-[16px] p-[16px]">
          <div className="flex items-center gap-[8px]">
            <div className="flex-1 rounded-[8px] bg-[rgba(65,107,255,0.10)] p-[8px] text-[14px] font-[500] text-[#416BFF]">
              <span className="line-clamp-1">{invitation?.url}</span>
            </div>
            <button
              type="button"
              className="flex items-center justify-center rounded-[8px] bg-[#416BFF] px-[16px] py-[8px] text-[14px] font-[600] text-[#FFFFFF]"
              onClick={handleClickCopyLink}
            >
              Copy link
            </button>
          </div>
          <div className="flex gap-[8px] rounded-[4px] bg-[#E8E8E8] p-[8px]">
            <div className="flex h-[16px] w-[16px] items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
              >
                <path
                  d="M5.4 9.5H6.6V5.9H5.4V9.5ZM6 4.7C6.17 4.7 6.3125 4.6425 6.4275 4.5275C6.5425 4.4125 6.6 4.27 6.6 4.1C6.6 3.93 6.5425 3.7875 6.4275 3.6725C6.3125 3.5575 6.17 3.5 6 3.5C5.83 3.5 5.6875 3.5575 5.5725 3.6725C5.4575 3.7875 5.4 3.93 5.4 4.1C5.4 4.27 5.4575 4.4125 5.5725 4.5275C5.6875 4.6425 5.83 4.7 6 4.7ZM6 12.5C5.17 12.5 4.39 12.3425 3.66 12.0275C2.93 11.7125 2.295 11.285 1.755 10.745C1.215 10.205 0.7875 9.57 0.4725 8.84C0.1575 8.11 0 7.33 0 6.5C0 5.67 0.1575 4.89 0.4725 4.16C0.7875 3.43 1.215 2.795 1.755 2.255C2.295 1.715 2.93 1.2875 3.66 0.9725C4.39 0.6575 5.17 0.5 6 0.5C6.83 0.5 7.61 0.6575 8.34 0.9725C9.07 1.2875 9.705 1.715 10.245 2.255C10.785 2.795 11.2125 3.43 11.5275 4.16C11.8425 4.89 12 5.67 12 6.5C12 7.33 11.8425 8.11 11.5275 8.84C11.2125 9.57 10.785 10.205 10.245 10.745C9.705 11.285 9.07 11.7125 8.34 12.0275C7.61 12.3425 6.83 12.5 6 12.5ZM6 11.3C7.34 11.3 8.475 10.835 9.405 9.905C10.335 8.975 10.8 7.84 10.8 6.5C10.8 5.16 10.335 4.025 9.405 3.095C8.475 2.165 7.34 1.7 6 1.7C4.66 1.7 3.525 2.165 2.595 3.095C1.665 4.025 1.2 5.16 1.2 6.5C1.2 7.84 1.665 8.975 2.595 9.905C3.525 10.835 4.66 11.3 6 11.3Z"
                  fill="#757575"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-[8px]">
              <div className="text-[12px] text-[#757575]">
                이 링크는{" "}
                <span className="font-[600]">
                  {new Intl.DateTimeFormat(
                    Intl.DateTimeFormat().resolvedOptions().locale,
                    {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    },
                  ).format(new Date(invitation?.expiredAt || new Date()))}
                </span>
                까지 유효합니다.
              </div>
              <div className="text-[12px] text-[#757575]">
                새로운 링크를 발급받고 싶으시면, 링크 재발급 버튼을
                클릭해주세요.{" "}
                <button
                  type="button"
                  className="font-[600] underline"
                  onClick={handleClickReissue}
                >
                  링크 재발급
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
