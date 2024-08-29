"use client";

import Link from "next/link";
import Image from "next/image";
import { UserChatContext } from "@/domains/helpdesk/stores/UserChatContext";
import { WorkspaceContext } from "@/domains/workspace/stores/WorkspaceContext";
import { useContext, useEffect, useRef, useState } from "react";
import { addAssignee } from "@/domains/helpdesk/actions/addAssignee";
import { addFollower } from "@/domains/helpdesk/actions/addFollower";
import { createMessage } from "@/domains/helpdesk/actions/createMessage";
import { sendEmailNotiWhenMemberAnswer } from "@/domains/helpdesk/actions/sendEmailNotiWhenMemberAnswer";
import { formatTime } from "@/common/utils/formatTime";
import { useChannel, usePresenceListener } from "ably/react";
import Markdown from "react-markdown";
import type {
  ButtonInMessage,
  FormInMessage,
  LogInMessage,
  SourceInMessage,
} from "@/common/types/workspace";
import { readChat } from "@/domains/helpdesk/actions/readChat";
import { encodeSpecialCharacterUrl } from "@/common/utils/encodeSpecialCharacterUrl";
import type { DraftMessageFile, Message } from "../types/helpdesk.type";
import type { MessageFile } from "@prisma/client";
import { formatFileSize } from "@/common/utils/formatFileSize";
import { ImageGalleryModalContext } from "@/common/stores/ImageGalleryModalContext";
import { v4 as uuid } from "uuid";
import { updateUserChat } from "../actions/updateUserChat";
import { getPrivateFileSignedUrlInBin } from "../actions/getPrivateFileSignedUrlInBin";
import { uploadPrivateFileInBin } from "../actions/uploadPrivateFileInBin";
import { formatDraftMessageFile } from "../utils/formatDraftMessageFile";
import { FollowUpForm } from "./FollowUpForm";

export default function UserChat() {
  const { workspace, myMembership } = useContext(WorkspaceContext);
  const { userChat, messages, endUser, isLoading } =
    useContext(UserChatContext);
  const dummyMessageRef = useRef<HTMLDivElement | null>(null);

  const { channel: workspaceChannel } = useChannel(
    `workspace:${workspace?.id}`,
  );

  const sortedMessage = messages.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  useEffect(() => {
    dummyMessageRef.current?.scrollIntoView();
  }, []);

  useEffect(() => {
    if (!isLoading)
      dummyMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isLoading, messages.length]);

  useEffect(() => {
    const read = async () => {
      if (!workspace) return;
      if (!myMembership) return;
      if (!userChat) return;

      const { session, error } = await readChat({
        memberId: myMembership.id,
        workspaceId: workspace.id,
        chatId: userChat.id,
      });

      if (error) console.error(error);

      workspaceChannel.publish("readEndUserChat", { session });
    };
    window.addEventListener("focus", read);

    return () => window.removeEventListener("focus", read);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspace, myMembership, userChat]);

  return (
    <div className="grid grid-rows-[90px,minmax(0,1fr)] border-r border-gray-lighter bg-white-normal">
      <div className="flex min-w-0 items-center justify-between border-b border-gray-lighter p-[20px]">
        <div className="text-lg">{endUser?.name}</div>
      </div>
      <div className="flex h-[calc(100dvh-90px)] flex-col overflow-hidden">
        <div className="flex flex-1 flex-col gap-[16px] overflow-y-auto p-[20px]">
          {sortedMessage.map((message) => {
            return <UserChatMessage key={message.id} {...message} />;
          })}
          <div ref={dummyMessageRef} />
        </div>
        <Footer />
      </div>
    </div>
  );
}

const UserChatMessage = (messageProps: Message) => {
  const { myMembership, members } = useContext(WorkspaceContext);
  const { bots, endUser, showMessageEditModal } = useContext(UserChatContext);

  const {
    id,
    personId,
    personType,
    createdAt,
    plainText,
    button,
    form,
    sources,
    log,
    files,
    followUpForm,
  } = messageProps;

  if (personType === "bot") {
    const bot = bots.find((bot) => bot.id === personId);
    if (!bot) return;

    const parsedButton: ButtonInMessage | null = button
      ? JSON.parse(button as string)
      : null;

    const parsedForm: FormInMessage | null = form
      ? JSON.parse(form as string)
      : null;

    const parsedSources: SourceInMessage[] | null = sources
      ? JSON.parse(sources as string)
      : null;

    return (
      <div className="group relative rounded-br-[8px] rounded-tr-[8px] border-l-[3px] border-blue-normal bg-blue-light px-[20px] py-[8px]">
        <div className="flex items-start gap-[8px]">
          <div className="relative flex h-[36px] w-[36px] shrink-0 items-center justify-center overflow-hidden rounded-[50%]">
            <Image src={bot.avatarUrl} alt="avatar" fill sizes="36px" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-[8px]">
            <div className="flex items-center gap-[8px]">
              <div className="truncate text-md">{bot.name}</div>
              <div className="flex items-center justify-center truncate rounded-[4px] bg-blue-normal px-[8px] text-sm text-white-normal">
                챗봇
              </div>
              <div className="truncate text-sm text-gray-normal">
                {formatTime(createdAt)}
              </div>
            </div>
            <div className="text-md">
              <Markdown
                components={{
                  a: (props) => (
                    <a
                      target="_blank"
                      style={{
                        color: "#416BFF",
                        textDecoration: "underline",
                      }}
                      {...props}
                    />
                  ),
                }}
              >
                {plainText}
              </Markdown>
              {parsedButton && (
                <Link
                  href={parsedButton.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-[8px] flex items-center justify-center rounded-[8px] border border-blue-light bg-blue-lightest p-[8px] text-blue-normal hover:border-blue-normal"
                >
                  {parsedButton.label}
                </Link>
              )}
            </div>
            {files &&
              files.map((file) => <MessageFile key={file.id} file={file} />)}
            {parsedForm && <MessageForm messageId={id} {...parsedForm} />}
            {parsedSources && (
              <MessageSources botId={bot.id} sources={parsedSources} />
            )}
            {followUpForm && (
              <FollowUpForm
                email={followUpForm.email}
                submittedAt={followUpForm.submittedAt}
              />
            )}
          </div>
        </div>
        <div className="invisible absolute right-[8px] top-[8px] opacity-0 transition-[visibility,opacity] group-hover:visible group-hover:opacity-100">
          <button
            type="button"
            className="flex items-center rounded-[4px] bg-white-normal px-[8px] py-[4px] hover:bg-gray-lightest"
            onClick={() => showMessageEditModal(messageProps)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="4"
              height="18"
              viewBox="0 0 4 18"
              fill="none"
            >
              <path
                d="M1 9C1 9.26522 1.10536 9.51957 1.29289 9.70711C1.48043 9.89464 1.73478 10 2 10C2.26522 10 2.51957 9.89464 2.70711 9.70711C2.89464 9.51957 3 9.26522 3 9C3 8.73478 2.89464 8.48043 2.70711 8.29289C2.51957 8.10536 2.26522 8 2 8C1.73478 8 1.48043 8.10536 1.29289 8.29289C1.10536 8.48043 1 8.73478 1 9Z"
                stroke="#5C5C5C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 16C1 16.2652 1.10536 16.5196 1.29289 16.7071C1.48043 16.8946 1.73478 17 2 17C2.26522 17 2.51957 16.8946 2.70711 16.7071C2.89464 16.5196 3 16.2652 3 16C3 15.7348 2.89464 15.4804 2.70711 15.2929C2.51957 15.1054 2.26522 15 2 15C1.73478 15 1.48043 15.1054 1.29289 15.2929C1.10536 15.4804 1 15.7348 1 16Z"
                stroke="#5C5C5C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 2C1 2.26522 1.10536 2.51957 1.29289 2.70711C1.48043 2.89464 1.73478 3 2 3C2.26522 3 2.51957 2.89464 2.70711 2.70711C2.89464 2.51957 3 2.26522 3 2C3 1.73478 2.89464 1.48043 2.70711 1.29289C2.51957 1.10536 2.26522 1 2 1C1.73478 1 1.48043 1.10536 1.29289 1.29289C1.10536 1.48043 1 1.73478 1 2Z"
                stroke="#5C5C5C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  if (personType === "member") {
    const findMember = members.find((member) => member.id === personId);
    if (!findMember) return;

    const parsedLog: LogInMessage | null = log
      ? JSON.parse(log as string)
      : null;

    if (parsedLog) {
      return (
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-[8px]">
            <div className="text-sm text-gray-light">
              <span className="font-bold">{findMember.name}</span> 님이{" "}
              {parsedLog.action === "open" && "상담을 열었습니다."}
              {parsedLog.action === "close" && "상담을 종료하였습니다."}
              {parsedLog.action === "snooze" && "상담을 보류했습니다."}
            </div>
            <div className="text-sm text-gray-light">
              {formatTime(createdAt)}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="group relative rounded-br-[8px] rounded-tr-[8px] border-l-[3px] border-blue-normal bg-blue-light px-[20px] py-[8px]">
        <div className="flex items-start gap-[8px]">
          <div className="relative flex h-[36px] w-[36px] shrink-0 items-center justify-center overflow-hidden rounded-[50%]">
            <Image src={findMember.avatarUrl} alt="avatar" fill sizes="36px" />
          </div>
          <div className="flex min-w-0 flex-col gap-[8px]">
            <div className="flex items-center gap-[8px]">
              <div className="truncate text-md">{findMember.name}</div>
              <div className="flex items-center justify-center truncate rounded-[4px] bg-blue-normal px-[8px] text-sm text-white-normal">
                담당자
              </div>
              <div className="truncate text-sm text-gray-normal">
                {formatTime(createdAt)}
              </div>
            </div>
            <div className="text-md">
              <Markdown
                components={{
                  a: (props) => (
                    <a
                      target="_blank"
                      style={{
                        color: "#416BFF",
                        textDecoration: "underline",
                      }}
                      {...props}
                    />
                  ),
                }}
              >
                {plainText}
              </Markdown>
              {files &&
                files.map((file) => <MessageFile key={file.id} file={file} />)}
            </div>
          </div>
        </div>
        {findMember.id === myMembership?.id && (
          <div className="invisible absolute right-[8px] top-[8px] opacity-0 transition-[visibility,opacity] group-hover:visible group-hover:opacity-100">
            <button
              type="button"
              className="flex items-center rounded-[4px] bg-white-normal px-[8px] py-[4px] hover:bg-gray-lightest"
              onClick={() => showMessageEditModal(messageProps)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="4"
                height="18"
                viewBox="0 0 4 18"
                fill="none"
              >
                <path
                  d="M1 9C1 9.26522 1.10536 9.51957 1.29289 9.70711C1.48043 9.89464 1.73478 10 2 10C2.26522 10 2.51957 9.89464 2.70711 9.70711C2.89464 9.51957 3 9.26522 3 9C3 8.73478 2.89464 8.48043 2.70711 8.29289C2.51957 8.10536 2.26522 8 2 8C1.73478 8 1.48043 8.10536 1.29289 8.29289C1.10536 8.48043 1 8.73478 1 9Z"
                  stroke="#5C5C5C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 16C1 16.2652 1.10536 16.5196 1.29289 16.7071C1.48043 16.8946 1.73478 17 2 17C2.26522 17 2.51957 16.8946 2.70711 16.7071C2.89464 16.5196 3 16.2652 3 16C3 15.7348 2.89464 15.4804 2.70711 15.2929C2.51957 15.1054 2.26522 15 2 15C1.73478 15 1.48043 15.1054 1.29289 15.2929C1.10536 15.4804 1 15.7348 1 16Z"
                  stroke="#5C5C5C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 2C1 2.26522 1.10536 2.51957 1.29289 2.70711C1.48043 2.89464 1.73478 3 2 3C2.26522 3 2.51957 2.89464 2.70711 2.70711C2.89464 2.51957 3 2.26522 3 2C3 1.73478 2.89464 1.48043 2.70711 1.29289C2.51957 1.10536 2.26522 1 2 1C1.73478 1 1.48043 1.10536 1.29289 1.29289C1.10536 1.48043 1 1.73478 1 2Z"
                  stroke="#5C5C5C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  }

  if (personType === "user") {
    const findUser = endUser;
    if (!findUser) return;

    return (
      <div className="rounded-br-[8px] rounded-tr-[8px] border-l-[3px] border-white-normal bg-white-normal px-[20px] py-[8px]">
        <div className="flex items-start gap-[8px]">
          <div className="relative flex h-[36px] w-[36px] shrink-0 items-center justify-center overflow-hidden rounded-[50%]">
            <Image src={findUser.avatarUrl} alt="avatar" fill sizes="36px" />
          </div>
          <div className="flex min-w-0 flex-col gap-[8px]">
            <div className="flex items-center gap-[8px]">
              <div className="truncate text-md">{findUser.name}</div>
              <div className="flex items-center justify-center truncate rounded-[4px] bg-gray-lighter px-[8px] text-sm text-black-normal">
                사용자
              </div>
              <div className="truncate text-sm text-gray-normal">
                {formatTime(createdAt)}
              </div>
            </div>
            <div className="text-md">
              {plainText && (
                <Markdown
                  components={{
                    a: (props) => (
                      <a
                        target="_blank"
                        style={{
                          color: "#416BFF",
                          textDecoration: "underline",
                        }}
                        {...props}
                      />
                    ),
                  }}
                >
                  {plainText}
                </Markdown>
              )}
              {files &&
                files.map((file) => <MessageFile key={file.id} file={file} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const MessageForm = ({
  messageId,
  type,
  inputs,
  submittedAt,
}: { messageId: string } & FormInMessage) => {
  if (submittedAt)
    return (
      <div className="flex flex-col gap-[20px] rounded-[20px] border border-mint-light bg-white-normal p-[20px]">
        {inputs.map((input, index) => (
          <div
            key={`${messageId}-form-${index}`}
            className="flex flex-col gap-[8px]"
          >
            <label
              htmlFor={`${messageId}-form-${index}`}
              className="self-start text-boldmd"
            >
              {input.label}
            </label>
            <div
              id={`${messageId}-form-${index}`}
              className="text-sm text-gray-normal"
            >
              {input.value}
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <form className="flex flex-col gap-[20px] rounded-[20px] border border-mint-light bg-white-normal p-[20px]">
      {inputs.map((input, index) => (
        <div
          key={`${messageId}-form-${index}`}
          className="flex flex-col gap-[8px]"
        >
          <label
            htmlFor={`${messageId}-form-${index}`}
            className="self-start text-boldmd"
          >
            {input.label}
          </label>
          <input
            id={`${messageId}-form-${index}`}
            type={type === "followUp" ? "email" : "text"}
            className="w-full rounded-[8px] border-[1.5px] border-gray-lightest p-[8px] text-md outline-[3px] outline-offset-[2px] outline-transparent placeholder:text-gray-light"
            placeholder="입력하세요"
            defaultValue={input.value}
            disabled
          />
        </div>
      ))}
    </form>
  );
};

const MessageSources = ({
  botId,
  sources,
}: {
  botId: string;
  sources: SourceInMessage[];
}) => {
  const { workspace } = useContext(WorkspaceContext);
  return (
    <div className="flex flex-col gap-[4px] rounded-[20px]">
      <div className="text-boldsm text-gray-normal">원본 콘텐츠 보기</div>
      {sources.map((source, i) => {
        if (source.itemKey)
          return (
            <Link
              key={`${source.itemKey}-${i}`}
              href={`/workspaces/${workspace?.id}/ai-chatbots/${botId}/contents?searchItemKey=${encodeSpecialCharacterUrl(
                source.itemKey,
              )}`}
              className="text-sm text-gray-light hover:text-blue-normal hover:underline"
            >
              {source.title || source.itemKey}
            </Link>
          );

        if (source.itemUid)
          return (
            <Link
              key={`${source.itemUid}-${i}`}
              href={`/workspaces/${workspace?.id}/ai-chatbots/${botId}/contents?searchItemUid=${encodeSpecialCharacterUrl(
                source.itemUid,
              )}`}
              className="text-sm text-gray-light hover:text-blue-normal hover:underline"
            >
              {source.title || source.itemUid}
            </Link>
          );
      })}
    </div>
  );
};

const MessageFile = ({ file }: { file: MessageFile }) => {
  const { messages } = useContext(UserChatContext);
  const { showImageModal } = useContext(ImageGalleryModalContext);
  const [signedUrl, setSignedUrl] = useState("");

  const handleImageClick = (currentFileId: string) => {
    const filteredImages = messages
      .flatMap((message) => message.files)
      .filter((file) => file.type.includes("image"));

    showImageModal({ files: filteredImages, currentFileId });
  };

  useEffect(() => {
    const fetchSignedUrl = async () => {
      const signedUrl = await getPrivateFileSignedUrlInBin({
        path: file.path,
      });
      setSignedUrl(signedUrl);
    };
    fetchSignedUrl();
  }, [file]);

  if (file.type.includes("image"))
    return (
      <div
        className="relative h-[130px] w-[130px] cursor-zoom-in"
        onClick={() => handleImageClick(file.id)}
      >
        {signedUrl && (
          <Image
            src={signedUrl}
            className="object-cover"
            alt="message image"
            sizes="130px"
            fill
          />
        )}
      </div>
    );

  return (
    <Link
      href={signedUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-[8px] rounded-[20px] rounded-br-[4px] bg-mint-light p-[12px]"
    >
      <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[4px] bg-red-normal text-lg text-white-normal">
        파일
      </div>
      <div className="flex min-w-0 flex-col">
        <div className="truncate text-boldmd">{file.name}</div>
        {file.size && (
          <div className="text-sm text-gray-normal">
            {formatFileSize(file.size)}
          </div>
        )}
      </div>
    </Link>
  );
};

const Footer = () => {
  const { workspace, myMembership } = useContext(WorkspaceContext);
  const { userChat, endUser, bots } = useContext(UserChatContext);
  const [draftMessage, setDraftMessage] = useState("");

  const { channel: workspaceChannel } = useChannel(
    `workspace:${workspace?.id}`,
  );
  const { channel: endUserChannel } = useChannel(
    `workspace:${workspace?.id}:endUserId:${endUser?.id}`,
  );
  const { presenceData } = usePresenceListener(
    `workspace:${workspace?.id}:endUserId:${endUser?.id}`,
  );

  const handleChangeDraftMessage = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
    setDraftMessage(e.target.value);
  };

  const handleKeydownToSendMessage = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await sendMessage();
    }
  };

  const handleClickToSendMessage = async () => await sendMessage();

  const sendMessage = async () => {
    if (!workspace) throw "sendMessage: No workspace";
    if (!myMembership) throw "sendMessage: No membership";
    if (!userChat) throw "sendMessage: No userChat";
    if (!endUser) throw "sendMessage: No endUser";
    if (!draftMessage) return;

    const copiedDraftMessage = draftMessage;
    setDraftMessage("");

    const {
      message,
      userChat: updatedUserChat,
      error,
    } = await createMessage({
      personId: myMembership.id,
      personType: "member",
      workspaceId: workspace.id,
      chatId: userChat.id,
      plainText: copiedDraftMessage,
    });
    if (error) throw error;

    endUserChannel.publish(`chatId-${userChat.id}-sendMessageInHelpDesk`, {
      message,
      member: { ...myMembership, name: "상담원" },
    });
    workspaceChannel.publish(`sendMessageInHelpDesk`, {
      userChat: updatedUserChat,
      currentMessage: message,
    });

    const isUserIn = presenceData.find((data) => data.clientId === endUser.id);

    if (isUserIn && endUser.email) {
      const { error } = await sendEmailNotiWhenMemberAnswer({
        workspaceName: workspace?.name as string,
        workspaceId: workspace?.id as string,
        to: endUser.email,
        memberName: myMembership.name,
        message: message?.plainText || "",
        veilId: endUser.veilId,
        plugInId: bots[0].plugInId || "",
      });
      if (error) throw new Error(`${error}`);
    }
  };

  const handleChangeSendFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!workspace) throw new Error("handleClickSendFile: No workspace");
    if (!userChat) throw new Error("handleClickSendFile: No userChat");
    if (!myMembership) throw new Error("handleClickSendFile: No myMembership");

    const files = e.target.files && [...e.target.files];

    if (!files) return;

    const draftFiles: DraftMessageFile[] = [];

    for (const file of files) {
      const fileId = uuid();
      const formData = new FormData();
      formData.append("file", file);
      const filePath = `pri-files/workspaces/${workspace.id}/user-chats/${userChat.id}/${fileId}`;
      await uploadPrivateFileInBin({
        formData,
        filePath,
      });
      const draftFile = await formatDraftMessageFile({ formData, filePath });

      draftFiles.push(draftFile);
    }

    const { message: userMessage, userChat: updatedUserChatWithUserMessage } =
      await createMessage({
        chatId: userChat.id,
        personId: myMembership.id,
        personType: "member",
        workspaceId: workspace.id,
        draftFiles,
      });
    endUserChannel.publish(`chatId-${userChat.id}-sendMessageInPlugIn`, {
      message: userMessage,
    });
    workspaceChannel.publish("sendMessageInPlugIn", {
      userChat: updatedUserChatWithUserMessage,
      currentMessage: userMessage,
    });
  };

  const handleClickAddAssignee = async (assigneeId: string) => {
    try {
      if (!workspace) throw "handleClickAddAssignee: No workspace";
      if (!userChat) throw "handleClickAddAssignee: No userChat";

      const {
        userChat: updatedUserChat,
        sessions,
        error,
      } = await addAssignee({
        workspaceId: workspace.id,
        chatId: userChat.id,
        assigneeId,
      });

      if (error) throw error;

      endUserChannel.publish("assign", { userChat: updatedUserChat });
      workspaceChannel.publish("assign", {
        userChat: updatedUserChat,
        sessions,
      });
    } catch (err) {
      console.error(err);
      throw new Error(`${err}`);
    }
  };

  const handleClickAddFollower = async (followerId: string) => {
    try {
      if (!workspace) throw "handleClickAddAssignee: No workspace";
      if (!userChat) throw "handleClickAddAssignee: No userChat";

      const {
        userChat: updatedUserChat,
        sessions,
        error,
      } = await addFollower({
        workspaceId: workspace.id,
        chatId: userChat.id,
        followerId,
      });
      if (error) throw error;
      endUserChannel.publish("addFollower", {
        userChat: updatedUserChat,
      });
      workspaceChannel.publish("addFollower", {
        userChat: updatedUserChat,
        sessions,
      });
    } catch (err) {
      console.error(err);
      throw new Error(`${err}`);
    }
  };

  if (
    !userChat?.assigneeId &&
    !userChat?.followerIds.includes(myMembership?.id as string)
  )
    return (
      <div className="flex max-h-[300px] flex-col border-t border-gray-lighter p-[20px]">
        <div className="text-md">배정된 담당자가 없습니다.</div>
        <div className="text-sm text-gray-normal">
          아래의 나에게 배정 버튼을 눌러주세요.
        </div>
        <button
          type="button"
          className="rounded-[8px] bg-blue-normal px-[16px] py-[8px] text-md text-white-normal"
          onClick={() => handleClickAddAssignee(myMembership?.id as string)}
        >
          나에게 배정
        </button>
      </div>
    );

  if (
    userChat?.assigneeId &&
    userChat?.assigneeId !== myMembership?.id &&
    !userChat?.followerIds.includes(myMembership?.id as string)
  )
    return (
      <div className="flex max-h-[300px] flex-col border-t border-gray-lighter p-[20px]">
        <div className="text-md">팔로우하지 않은 상담입니다.</div>
        <div className="text-sm text-gray-normal">
          아래의 팔로우하기 버튼을 눌러주세요.
        </div>
        <button
          type="button"
          className="rounded-[8px] bg-blue-normal px-[16px] py-[8px] text-md text-white-normal"
          onClick={() => handleClickAddFollower(myMembership?.id as string)}
        >
          팔로우하기
        </button>
      </div>
    );

  return (
    <div className="flex items-end gap-[8px] border-t border-gray-lighter p-[20px]">
      <AIBotOnOffToggle />
      <div className="flex w-full items-end rounded-[8px] border-[1.5px] border-gray-lighter bg-white-normal px-[20px] py-[8px] text-md placeholder:text-gray-light">
        <textarea
          className="max-h-[160px] flex-1 resize-none outline-none"
          placeholder="메세지를 입력해주세요."
          rows={1}
          value={draftMessage}
          onChange={handleChangeDraftMessage}
          onKeyDown={handleKeydownToSendMessage}
        />
      </div>
      {!draftMessage && (
        <label
          htmlFor="upload-file"
          className="mb-[2px] flex items-center justify-center self-end whitespace-nowrap rounded-[8px] bg-blue-light p-[12px] text-md text-gray-light hover:cursor-pointer"
        >
          <input
            id="upload-file"
            type="file"
            multiple
            className="hidden"
            onChange={handleChangeSendFile}
          />
          <div className="flex h-[16px] w-[16px] items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="16"
              viewBox="0 0 15 16"
              fill="none"
            >
              <path
                d="M10.2541 4.78807L5.50816 9.53402C5.18052 9.86164 5.18052 10.3928 5.50816 10.7205C5.8358 11.0481 6.36701 11.0481 6.69463 10.7205L11.4406 5.97455C12.4234 4.99164 12.4234 3.39803 11.4406 2.41511C10.4576 1.4322 8.86403 1.4322 7.8811 2.41511L3.13521 7.161C1.49702 8.79917 1.49702 11.4553 3.13521 13.0934C4.77339 14.7316 7.4294 14.7316 9.06756 13.0934L13.8135 8.34747L15 9.53402L10.2541 14.2799C7.96063 16.5734 4.24219 16.5734 1.94873 14.2799C-0.344727 11.9864 -0.344727 8.26802 1.94873 5.97455L6.69463 1.22864C8.3328 -0.409546 10.9889 -0.409546 12.627 1.22864C14.2652 2.86682 14.2652 5.52285 12.627 7.161L7.8811 11.907C6.89825 12.8899 5.3046 12.8899 4.32169 11.907C3.33877 10.924 3.33877 9.3304 4.32169 8.34747L9.06756 3.6016L10.2541 4.78807Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </label>
      )}
      {draftMessage && (
        <button
          type="button"
          className="mb-[2px] flex items-center justify-center self-end whitespace-nowrap rounded-[8px] bg-blue-normal p-[8px] text-md text-white-normal"
          onClick={handleClickToSendMessage}
        >
          보내기
        </button>
      )}
    </div>
  );
};

const AIBotOnOffToggle = () => {
  const { workspace } = useContext(WorkspaceContext);
  const { userChat, endUser } = useContext(UserChatContext);
  const { channel: endUserChannel } = useChannel(
    `workspace:${workspace?.id}:endUserId:${endUser?.id}`,
  );

  const isOn = userChat?.isAIBotOn;

  const handleToggle = async () => {
    try {
      if (!userChat) throw "handleToggle: no userChat";

      const { userChat: updatedUserChat } = await updateUserChat({
        chatId: userChat.id,
        isAIBotOn: !isOn,
      });

      endUserChannel.publish(`chatId-${userChat.id}-toggle-ai`, {
        userChat: updatedUserChat,
      });
    } catch (err) {
      console.error(err);
      throw new Error(`${err}`);
    }
  };

  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex items-center gap-[8px]">
        <div className="flex h-[16px] w-[16px] items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <rect width="16" height="16" rx="8" fill="#E6F0FF" />
            <path
              d="M7.24345 8.46191H6.66141C6.56525 8.46191 6.4873 8.53998 6.4873 8.63625V9.57993C6.4873 9.67626 6.56525 9.75433 6.66141 9.75433H7.24345C7.3396 9.75433 7.41756 9.67626 7.41756 9.57993V8.63625C7.41756 8.53998 7.3396 8.46191 7.24345 8.46191Z"
              fill="#416BFF"
            />
            <path
              d="M9.32548 8.46191H8.74342C8.6473 8.46191 8.56934 8.53998 8.56934 8.63625V9.57993C8.56934 9.67626 8.6473 9.75433 8.74342 9.75433H9.32548C9.42161 9.75433 9.49957 9.67626 9.49957 9.57993V8.63625C9.49957 8.53998 9.42161 8.46191 9.32548 8.46191Z"
              fill="#416BFF"
            />
            <path
              d="M13.0638 8.57494H12.6679C12.5212 7.85833 12.1537 7.15075 11.5707 6.56792C11.5707 6.56792 10.3236 5.13663 8.372 4.96837C8.36698 4.96837 8.3619 4.96837 8.35681 4.96735C8.30217 4.9633 8.24753 4.95924 8.19181 4.9562C8.12808 4.95316 8.06429 4.95215 8.00051 4.95215C7.93674 4.95215 7.87196 4.95417 7.8092 4.9562C7.75353 4.95823 7.69887 4.96228 7.64421 4.96735C7.63915 4.96735 7.63307 4.96735 7.62801 4.96837C5.67641 5.13663 4.43135 6.56792 4.43135 6.56792C3.84932 7.15075 3.48086 7.85833 3.33408 8.57494H2.93526C2.69536 8.57494 2.5 8.76957 2.5 9.01083V10.0813C2.5 10.3215 2.69435 10.5172 2.93526 10.5172H3.27942C3.41405 11.6575 4.38176 12.5424 5.55697 12.5424H8.05113L11.0039 14.141C11.5433 14.4856 12.2509 14.0974 12.2509 13.4568V11.6646C12.505 11.3412 12.674 10.948 12.7247 10.5182H13.0648C13.3046 10.5182 13.5 10.3236 13.5 10.0823V9.01185C13.5 8.7716 13.3056 8.57595 13.0648 8.57595L13.0638 8.57494ZM11.1466 10.359C11.1466 10.7361 10.8419 11.0412 10.4653 11.0412H10.4157V11.9667C10.4157 12.0538 10.3196 12.1066 10.2467 12.0589L8.6797 11.0412H5.53369C5.15713 11.0412 4.85244 10.7361 4.85244 10.359V8.11277C4.85244 7.73566 5.15713 7.43058 5.53369 7.43058H10.4653C10.8419 7.43058 11.1466 7.73566 11.1466 8.11277V10.359Z"
              fill="#416BFF"
            />
            <path
              d="M6.62891 4.72914C6.93561 4.6298 7.26966 4.55681 7.62799 4.52539C7.63305 4.52539 7.63912 4.52539 7.64418 4.52438C7.69885 4.52033 7.75351 4.51627 7.80918 4.51323C7.87295 4.51019 7.93672 4.50917 8.00049 4.50917C8.06426 4.50917 8.12907 4.5112 8.19178 4.51323C8.2475 4.51525 8.30214 4.51931 8.35678 4.52438C8.36187 4.52438 8.36695 4.52438 8.37197 4.52539C8.7293 4.5558 9.06337 4.6298 9.37108 4.72914C9.2921 4.12398 8.82448 3.64148 8.22622 3.54316V2.93876C8.45901 2.84752 8.62503 2.62148 8.62503 2.3559C8.62503 2.01024 8.34567 1.73047 8.00049 1.73047C7.65532 1.73047 7.37594 2.01024 7.37594 2.3559C7.37594 2.62148 7.54094 2.84752 7.77476 2.93876V3.54316C7.17653 3.64148 6.70786 4.12398 6.62992 4.72914H6.62891Z"
              fill="#416BFF"
            />
            <circle
              cx="14"
              cy="3"
              r="1.75"
              fill="#3ACF59"
              stroke="white"
              strokeWidth="0.5"
            />
          </svg>
        </div>
        <div className="whitespace-nowrap text-md">챗봇 답변</div>
      </div>
      <button
        type="button"
        className={`${isOn ? "bg-blue-normal" : "bg-gray-light"} flex rounded-[20px] p-[4px] text-white-normal`}
        onClick={handleToggle}
      >
        <div className="relative flex items-center px-[2px]">
          <div className="flex flex-1 items-center justify-center px-[8px] py-[4px] text-md">
            ON
          </div>
          <div className="flex flex-1 items-center justify-center px-[8px] py-[4px] text-md">
            OFF
          </div>
          <div
            className="absolute right-0 h-full w-[42px] rounded-[20px] bg-white-normal transition-transform"
            style={{
              transform: `translate(${isOn ? "0%" : "-100%"})`,
            }}
          ></div>
        </div>
      </button>
    </div>
  );
};
