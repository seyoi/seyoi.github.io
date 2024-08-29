"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { joinWorkspace } from "@/domains/workspace/actions/joinWorkspace";
import { useContext } from "react";
import { AlertContext } from "@/common/stores/AlertContext";

export default function JoinWorkspaceForm({
  workspaceId,
  workspaceName,
  workspaceAvatarUrl,
  invitationId,
}: {
  workspaceId: string;
  workspaceName: string;
  workspaceAvatarUrl: string;
  invitationId: string;
}) {
  const router = useRouter();
  const { addAlert } = useContext(AlertContext);

  const handleClickJoinWorkspace = async () => {
    try {
      const { error } = await joinWorkspace({ workspaceId, invitationId });
      if (error) throw error;
      router.replace(`/workspaces/${workspaceId}/help-desk/user-chats`);
    } catch (err) {
      console.error(err);
      addAlert({ type: "error", text: "워크스페이스 참여에 실패했습니다." });
    }
  };
  return (
    <div className="flex flex-col gap-[44px]">
      <div className="flex flex-col items-center gap-[24px]">
        <div className="text-center text-3xl">
          워크스페이스 {workspaceName}에 <br />
          초대되었어요.
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="relative flex h-[80px] w-[80px] items-center justify-center rounded-[8px]">
          <Image src={workspaceAvatarUrl} alt="workspace avatar" fill />
        </div>
      </div>
      <button
        className="rounded-[8px] bg-blue-normal p-[8px] text-lg text-white-normal hover:bg-blue-dark"
        onClick={handleClickJoinWorkspace}
      >
        초대 수락하기
      </button>
    </div>
  );
}
