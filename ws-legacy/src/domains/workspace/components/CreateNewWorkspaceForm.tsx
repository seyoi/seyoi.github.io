"use client";

import { useRouter } from "next/navigation";
import { createNewWorkspace } from "@/domains/workspace/actions/createNewWorkspace";
import { useContext } from "react";
import { AlertContext } from "@/common/stores/AlertContext";

export default function CreateNewWorkspaceForm() {
  const router = useRouter();
  const { addAlert } = useContext(AlertContext);

  return (
    <>
      <form
        className="flex flex-col gap-[8px]"
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          try {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const workspaceName = formData.get("workspaceName") as string;

            if (!workspaceName) {
              addAlert({
                type: "error",
                text: "워크스페이스 이름을 입력해주세요.",
              });
              return;
            }

            const { workspace, error } =
              await createNewWorkspace(workspaceName);

            if (error) throw error;

            addAlert({
              type: "ok",
              text: "워크스페이스가 생성됐습니다.",
            });

            router.push(`/workspaces/${workspace?.id}/ai-chatbots`);
          } catch (err) {
            addAlert({
              type: "error",
              text: "워크스페이스 생성에 실패했습니다.",
            });
          }
        }}
      >
        <input
          name="workspaceName"
          className="rounded-[8px] border-[3px] border-gray-lighter px-[20px] py-[8px] text-md outline-[3px] placeholder:text-gray-light focus:border-blue-normal focus:outline-offset-1 focus:outline-blue-light"
          placeholder="워크스페이스 이름을 입력해주세요."
        />
        <button className="rounded-[8px] bg-blue-normal p-[8px] text-lg text-white-normal hover:bg-blue-dark">
          새 워크스페이스 만들기
        </button>
      </form>
    </>
  );
}
