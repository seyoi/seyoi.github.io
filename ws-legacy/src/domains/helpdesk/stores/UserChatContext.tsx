"use client";

import { useParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { AlertContext } from "@/common/stores/AlertContext";
import { WorkspaceContext } from "../../workspace/stores/WorkspaceContext";
import { getUserChat } from "@/domains/helpdesk/actions/getUserChat";
import { getMessages } from "@/domains/helpdesk/actions/getMessages";
import * as Ably from "ably";
import { ChannelProvider, useChannel } from "ably/react";
import {
  type EndUser,
  type EndUserChat,
  type WorkspaceBot,
} from "@prisma/client";
import { editMessage } from "@/domains/helpdesk/actions/editMessage";
import type { Message, UserChat } from "../types/helpdesk.type";

export const UserChatContext = createContext<{
  userChat: EndUserChat | null;
  messages: Message[];
  bots: WorkspaceBot[];
  endUser: EndUser | null;
  isLoading: boolean;
  currentEditingMessage: Message | null;
  setUserChat: React.Dispatch<React.SetStateAction<EndUserChat | null>>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setEndUser: React.Dispatch<React.SetStateAction<EndUser | null>>;
  showMessageEditModal: (message: Message) => void;
  hideMessageEditModal: () => void;
}>({
  userChat: null,
  messages: [],
  bots: [],
  endUser: null,
  isLoading: true,
  currentEditingMessage: null,
  setUserChat: () => null,
  setMessages: () => null,
  setEndUser: () => null,
  showMessageEditModal: () => null,
  hideMessageEditModal: () => null,
});

export default function UserChatContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { chatId }: { chatId: string } = useParams();
  const { workspace } = useContext(WorkspaceContext);
  const [userChat, setUserChat] = useState<EndUserChat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [bots, setBots] = useState<WorkspaceBot[]>([]);
  const [endUser, setEndUser] = useState<EndUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMessageEditModalShow, setIsMessageEditModalShow] = useState(false);
  const [currentEditingMessage, setCurrentEditingMessage] =
    useState<Message | null>(null);

  const showMessageEditModal = (message: Message) => {
    setIsMessageEditModalShow(true);
    setCurrentEditingMessage(message);
  };

  const hideMessageEditModal = () => {
    setIsMessageEditModalShow(false);
    setCurrentEditingMessage(null);
  };

  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);
        const [
          { userChat, user, error: getUserChatError },
          { messages, bots, error: getMessagesError },
        ] = await Promise.all([
          getUserChat({ chatId }),
          getMessages({ chatId }),
        ]);
        setUserChat(userChat);
        setMessages(messages);
        setBots(bots);
        setEndUser(user);

        if (getUserChatError)
          throw `UserChatContextProvider: getUserChatError ${getUserChatError}`;
        if (getMessagesError)
          throw `UserChatContextProvider: getMessagesError ${getMessagesError}`;
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, [chatId]);

  if (isLoading) return;

  return (
    <UserChatContext.Provider
      value={{
        userChat,
        messages,
        bots,
        endUser,
        isLoading,
        currentEditingMessage,
        setUserChat,
        setMessages,
        setEndUser,
        showMessageEditModal,
        hideMessageEditModal,
      }}
    >
      <ChannelProvider
        channelName={`workspace:${workspace?.id}:endUserId:${endUser?.id}`}
      >
        <EndUserChannelSubscriber>
          {children}
          {isMessageEditModalShow && <MessageEditModal />}
        </EndUserChannelSubscriber>
      </ChannelProvider>
    </UserChatContext.Provider>
  );
}

const EndUserChannelSubscriber = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { workspace } = useContext(WorkspaceContext);
  const { userChat, endUser, setUserChat, setMessages, setEndUser } =
    useContext(UserChatContext);

  useChannel(
    `workspace:${workspace?.id}:endUserId:${endUser?.id}`,
    (ablyMessage: Ably.Message) => {
      if (ablyMessage.name === `chatId-${userChat?.id}-sendMessageInPlugIn`) {
        const { message }: { message: Message } = ablyMessage.data;

        setMessages((prev) => prev.concat(message));
      }

      if (ablyMessage.name === `chatId-${userChat?.id}-sendMessageInHelpDesk`) {
        const { message }: { message: Message } = ablyMessage.data;
        setMessages((prev) => prev.concat(message));
      }

      if (
        ablyMessage.name === `chatId-${userChat?.id}-clickScenarioNextButton`
      ) {
        const { message }: { message: Message } = ablyMessage.data;

        setMessages((prev) => prev.concat(message));
      }

      if (
        ablyMessage.name === `chatId-${userChat?.id}-createMessagesScenario`
      ) {
        const { messages }: { messages: Message[] } = ablyMessage.data;

        setMessages((prev) => prev.concat(messages));
      }

      if (ablyMessage.name === `chatId-${userChat?.id}-updateMessageForm`) {
        const { message }: { message: Message } = ablyMessage.data;

        setMessages((prev) =>
          prev.map((prevMessage) =>
            prevMessage.id === message.id ? message : prevMessage,
          ),
        );
      }

      if (ablyMessage.name === `chatId-${userChat?.id}-openChat`) {
        const { message }: { userChat: EndUserChat; message: Message } =
          ablyMessage.data;

        setMessages((prev) => prev.concat(message));
      }

      if (ablyMessage.name === `chatId-${userChat?.id}-closeChat`) {
        const { message }: { userChat: EndUserChat; message: Message } =
          ablyMessage.data;

        setMessages((prev) => prev.concat(message));
      }

      if (ablyMessage.name === `chatId-${userChat?.id}-snoozeChat`) {
        const { message }: { userChat: EndUserChat; message: Message } =
          ablyMessage.data;

        setMessages((prev) => prev.concat(message));
      }

      if (ablyMessage.name === "editMessage") {
        const { message }: { message: Message } = ablyMessage.data;

        setMessages((prev) =>
          prev.map((prevMessage) =>
            prevMessage.id === message.id ? message : prevMessage,
          ),
        );
      }

      if (ablyMessage.name === `chatId-${userChat?.id}-openChat`) {
        const { userChat }: { userChat: EndUserChat; message: Message } =
          ablyMessage.data;
        setUserChat(userChat);
      }

      if (ablyMessage.name === `chatId-${userChat?.id}-closeChat`) {
        const { userChat }: { userChat: EndUserChat; message: Message } =
          ablyMessage.data;
        setUserChat(userChat);
      }

      if (ablyMessage.name === `chatId-${userChat?.id}-snoozeChat`) {
        const { userChat }: { userChat: EndUserChat; message: Message } =
          ablyMessage.data;
        setUserChat(userChat);
      }

      if (ablyMessage.name === "assign") {
        const { userChat }: { userChat: EndUserChat } = ablyMessage.data;

        setUserChat(userChat);
      }

      if (ablyMessage.name === "unassign") {
        const { userChat }: { userChat: EndUserChat } = ablyMessage.data;

        setUserChat(userChat);
      }

      if (ablyMessage.name === "addFollower") {
        const { userChat }: { userChat: EndUserChat } = ablyMessage.data;

        setUserChat(userChat);
      }

      if (ablyMessage.name === "removeFollower") {
        const { userChat }: { userChat: EndUserChat } = ablyMessage.data;

        setUserChat(userChat);
      }

      if (ablyMessage.name === "addNote") {
        const { userChat }: { userChat: EndUserChat } = ablyMessage.data;

        setUserChat(userChat);
      }

      if (ablyMessage.name === "updateEndUser") {
        const { user }: { user: EndUser } = ablyMessage.data;

        setEndUser(user);
      }

      if (ablyMessage.name === `chatId-${userChat?.id}-toggle-ai`) {
        const { userChat }: { userChat: EndUserChat } = ablyMessage.data;

        setUserChat(userChat);
      }

      if (ablyMessage.name === `chatId-${userChat?.id}-createFollowUpForm`) {
        const { message, userChat }: { message: Message; userChat: UserChat } =
          ablyMessage.data;

        setMessages((prev) => prev.concat(message));
        setUserChat(userChat);
      }

      if (ablyMessage.name === `chatId-${userChat?.id}-updateFollowUpForm`) {
        const { message }: { message: Message } = ablyMessage.data;

        setMessages((prev) =>
          prev.map((prevMessage) =>
            prevMessage.id === message.id ? message : prevMessage,
          ),
        );
      }
    },
  );

  return <>{children}</>;
};

const MessageEditModal = () => {
  const { addAlert } = useContext(AlertContext);
  const { workspace } = useContext(WorkspaceContext);
  const { endUser, currentEditingMessage, hideMessageEditModal } =
    useContext(UserChatContext);
  const [draftMessage, setDraftMessage] = useState(
    currentEditingMessage?.plainText || "",
  );

  const { channel: workspaceChannel } = useChannel(
    `workspace:${workspace?.id}`,
  );

  const { channel: endUserChannel } = useChannel(
    `workspace:${workspace?.id}:endUserId:${endUser?.id}`,
  );

  const handleMouseDownCapture = (e: React.MouseEvent<HTMLDivElement>) =>
    e.stopPropagation();

  const handleChangeDraftMessage = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => setDraftMessage(e.target.value);

  const handleClickSaveMessage = async () => {
    try {
      if (!currentEditingMessage)
        throw "handleClickSaveMessage: noCurrentEditingMessage";
      if (!draftMessage) {
        addAlert({ type: "error", text: "수정할 메세지 내용을 입력해주세요." });

        return;
      }

      const { message, error } = await editMessage({
        id: currentEditingMessage.id,
        plainText: draftMessage,
      });

      if (error) throw error;

      workspaceChannel.publish("editMessage", { message });
      endUserChannel.publish("editMessage", { message });

      addAlert({
        type: "ok",
        text: "메세지가 수정됐습니다.",
      });
    } catch (err) {
      console.error(err);
      addAlert({ type: "error", text: "메세지 수정에 실패했습니다." });
    } finally {
      hideMessageEditModal();
    }
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 top-0 z-[10] flex items-center justify-center bg-black-lighter"
      onMouseDown={hideMessageEditModal}
    >
      <div
        className="w-[min(600px,100%)] rounded-[16px] bg-white-normal"
        onMouseDownCapture={handleMouseDownCapture}
      >
        <div className="flex flex-col">
          <div className="p-[20px]">
            <div className="text-boldlg">메세지 내용 수정하기</div>
          </div>
          {currentEditingMessage && currentEditingMessage.plainText && (
            <div className="px-[16px]">
              <textarea
                className="h-full max-h-[600px] min-h-[300px] w-full resize-none overflow-y-auto rounded-[8px] border-[3px] border-transparent px-[12px] py-[8px] pr-[20px] text-md outline-[3px] outline-transparent focus:border-blue-normal focus:bg-gray-lightest focus:outline-blue-light"
                placeholder="텍스트를 입력하세요."
                value={draftMessage}
                onChange={handleChangeDraftMessage}
              ></textarea>
            </div>
          )}
          <div className="flex items-center justify-end gap-[8px] p-[20px]">
            <button
              type="button"
              className="flex items-center justify-center rounded-[8px] bg-gray-lighter px-[16px] py-[8px] text-md text-gray-normal"
              onClick={hideMessageEditModal}
            >
              취소
            </button>
            <button
              type="button"
              className="flex items-center justify-center rounded-[8px] bg-blue-normal px-[16px] py-[8px] text-md text-white-normal"
              onClick={handleClickSaveMessage}
            >
              수정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
