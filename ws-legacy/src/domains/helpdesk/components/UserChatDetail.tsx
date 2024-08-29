"use client";

import { UserChatContext } from "@/domains/helpdesk/stores/UserChatContext";
import { WorkspaceContext } from "@/domains/workspace/stores/WorkspaceContext";
import { addAssignee } from "@/domains/helpdesk/actions/addAssignee";
import { addFollower } from "@/domains/helpdesk/actions/addFollower";
import { addNote } from "@/domains/helpdesk/actions/addNote";
import { closeChat } from "@/domains/helpdesk/actions/closeChat";
import { openChat } from "@/domains/helpdesk/actions/openChat";
import { removeAssignee } from "@/domains/helpdesk/actions/removeAssignee";
import { removeFollower } from "@/domains/helpdesk/actions/removeFollower";
import { snoozeChat } from "@/domains/helpdesk/actions/snoozeChat";
import { UserChatNote } from "@/common/types/workspace";
import { formatTime } from "@/common/utils/formatTime";
import { useChannel } from "ably/react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function UserChatDetail() {
  return (
    <div className="grid grid-rows-[90px,minmax(0,1fr)] bg-white-normal">
      <div className="flex items-center justify-between border-b border-gray-lighter p-[20px]">
        <div className="text-lg">상세 정보</div>
        <UserChatStateMenu />
      </div>
      <div className="flex h-[calc(100dvh-90px)] flex-col overflow-y-auto">
        <UserChatInfo />
        <EndUserInfo />
        <BotInfo />
        <Notes />
      </div>
    </div>
  );
}

const UserChatStateMenu = () => {
  const { workspace, myMembership } = useContext(WorkspaceContext);
  const { userChat, endUser } = useContext(UserChatContext);
  const [isMenuShow, setIsMenuShow] = useState(false);

  const { channel: workspaceChannel } = useChannel(
    `workspace:${workspace?.id}`,
  );
  const { channel: endUserChannel } = useChannel(
    `workspace:${workspace?.id}:endUserId:${endUser?.id}`,
  );

  const showMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMenuShow(true);
  };

  const hideMenu = () => setIsMenuShow(false);

  const handleMouseDownCapture = (e: React.MouseEvent<HTMLDivElement>) =>
    e.stopPropagation();

  const handleClickOpenChat = async () => {
    try {
      if (!workspace) throw "handleClickOpenChat: No workspace";
      if (!myMembership) throw "handleClickOpenChat: No myMembership";
      if (!userChat) throw "handleClickOpenChat: No userChat";

      const {
        userChat: updatedUserChat,
        message,
        error,
      } = await openChat({
        workspaceId: workspace.id,
        chatId: userChat.id,
        personId: myMembership.id,
      });

      if (error) throw error;

      workspaceChannel.publish("openChat", { userChat: updatedUserChat });
      endUserChannel.publish(`chatId-${userChat.id}-openChat`, {
        userChat: updatedUserChat,
        message,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickCloseChat = async () => {
    try {
      if (!workspace) throw "handleClickCloseChat: No workspace";
      if (!myMembership) throw "handleClickCloseChat: No myMembership";
      if (!userChat) throw "handleClickCloseChat: No userChat";

      const {
        userChat: updatedUserChat,
        message,
        error,
      } = await closeChat({
        workspaceId: workspace.id,
        chatId: userChat.id,
        personId: myMembership.id,
      });

      if (error) throw error;

      workspaceChannel.publish("closeChat", { userChat: updatedUserChat });
      endUserChannel.publish(`chatId-${userChat.id}-closeChat`, {
        userChat: updatedUserChat,
        message,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickSnoozeChat = async () => {
    try {
      if (!workspace) throw "handleClickCloseChat: No workspace";
      if (!myMembership) throw "handleClickCloseChat: No myMembership";
      if (!userChat) throw "handleClickCloseChat: No userChat";

      const {
        userChat: updatedUserChat,
        message,
        error,
      } = await snoozeChat({
        workspaceId: workspace.id,
        chatId: userChat.id,
        personId: myMembership.id,
      });

      if (error) throw error;

      workspaceChannel.publish("snoozeChat", { userChat: updatedUserChat });
      endUserChannel.publish(`chatId-${userChat.id}-snoozeChat`, {
        userChat: updatedUserChat,
        message,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    window.document.addEventListener("mousedown", hideMenu);
    return () => window.document.removeEventListener("mousedown", hideMenu);
  }, []);

  return (
    <div className="relative flex flex-col gap-[8px]">
      <button
        type="button"
        className="flex items-center gap-[8px] rounded-[4px] px-[8px] py-[4px] hover:bg-gray-lightest"
        onClick={showMenu}
      >
        <div className="text-md">
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
        </div>
      </button>
      <div
        className={`${isMenuShow ? "visible opacity-100" : "invisible opacity-0"} absolute right-0 top-[48px] z-10 flex flex-col gap-[8px] rounded-[8px] border border-gray-lightest bg-white-normal p-[8px] shadow-card transition-[opacity,visibility]`}
        onMouseDownCapture={handleMouseDownCapture}
      >
        <button
          type="button"
          className="flex items-center justify-end whitespace-nowrap rounded-[4px] bg-white-normal px-[8px] py-[4px] text-md hover:bg-gray-lightest"
          onClick={handleClickOpenChat}
        >
          상담 시작하기
        </button>
        <button
          type="button"
          className="flex items-center justify-end whitespace-nowrap rounded-[4px] bg-white-normal px-[8px] py-[4px] text-md hover:bg-gray-lightest"
          onClick={handleClickSnoozeChat}
        >
          상담 보류하기
        </button>
        <button
          type="button"
          className="flex items-center justify-end whitespace-nowrap rounded-[4px] bg-white-normal px-[8px] py-[4px] text-md hover:bg-gray-lightest"
          onClick={handleClickCloseChat}
        >
          상담 종료하기
        </button>
      </div>
    </div>
  );
};

const UserChatInfo = () => {
  const menu = [
    {
      key: "open",
      label: "진행중",
      className: "bg-green-light text-green-dark",
    },
    {
      key: "closed",
      label: "상담 종료",
      className: "bg-gray-normal text-white-normal",
    },
    {
      key: "snoozed",
      label: "보류중",
      className: "bg-gray-lightest text-gray-normal",
    },
  ];
  const { userChat } = useContext(UserChatContext);
  const currentUserChatState = menu.find(
    (item) => item.key === userChat?.state,
  );

  return (
    <div className="flex flex-col gap-[16px] border-b border-gray-lighter p-[20px]">
      <div className="flex items-center justify-between">
        <div className="text-md">상담 정보</div>
        {currentUserChatState && (
          <div
            className={`${currentUserChatState.className} rounded-[4px] px-[8px] py-[4px] text-sm`}
          >
            {currentUserChatState.label}
          </div>
        )}
      </div>
      <AssigneeMenu />
      <FollowerMenu />
    </div>
  );
};

const AssigneeMenu = () => {
  const { workspace, members } = useContext(WorkspaceContext);
  const { userChat, endUser } = useContext(UserChatContext);
  const [isMeneShow, setIsMenuShow] = useState(false);
  const [search, setSearch] = useState("");

  const { channel: workspaceChannel } = useChannel(
    `workspace:${workspace?.id}`,
  );
  const { channel: endUserChannel } = useChannel(
    `workspace:${workspace?.id}:endUserId:${endUser?.id}`,
  );

  const currentAssignee = members.find(
    (member) => member.id === userChat?.assigneeId,
  );

  const filteredMembersBySearch = members.filter((member) =>
    member.name.includes(search),
  );

  const showMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMenuShow(true);
  };

  const hideMenu = () => setIsMenuShow(false);

  const handleMouseDownCapture = (e: React.MouseEvent<HTMLDivElement>) =>
    e.stopPropagation();

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleClickRemoveAssignee = async () => {
    try {
      if (!userChat) throw "handleClickRemoveAssignee: No userChat";

      const {
        userChat: updatedUserChat,
        message,
        user,
        error,
      } = await removeAssignee({
        chatId: userChat.id,
      });

      if (error) throw error;

      endUserChannel.publish("unassign", {
        userChat: updatedUserChat,
        message,
        user,
      });
      workspaceChannel.publish("unassign", {
        userChat: updatedUserChat,
        message,
        user,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickAddAssignee = async (assigneeId: string) => {
    try {
      if (!workspace) throw "handleClickAddAssignee: No workspace";
      if (!userChat) throw "handleClickAddAssignee: No userChat";

      const {
        userChat: updatedUserChat,
        message,
        user,
        sessions,
        error,
      } = await addAssignee({
        workspaceId: workspace.id,
        chatId: userChat.id,
        assigneeId,
      });

      if (error) throw error;

      endUserChannel.publish("assign", {
        userChat: updatedUserChat,
        message,
        user,
      });
      workspaceChannel.publish("assign", {
        userChat: updatedUserChat,
        message,
        user,
        sessions,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    window.document.addEventListener("mousedown", hideMenu);
    return () => window.document.removeEventListener("mousedown", hideMenu);
  }, []);

  return (
    <div className="relative flex flex-col">
      <div className="grid grid-cols-[120px,minmax(0,1fr)]">
        <div className="flex items-center gap-[8px]">
          <div className="flex h-[20px] w-[20px] items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="15"
              viewBox="0 0 18 15"
              fill="none"
            >
              <path
                d="M5.57143 2.83333H3.28571C2.67951 2.83333 2.09812 2.97381 1.66947 3.22386C1.24082 3.47391 1 3.81304 1 4.16667V12.1667C1 12.5203 1.24082 12.8594 1.66947 13.1095C2.09812 13.3595 2.67951 13.5 3.28571 13.5H14.7143C15.3205 13.5 15.9019 13.3595 16.3305 13.1095C16.7592 12.8594 17 12.5203 17 12.1667V4.16667C17 3.81304 16.7592 3.47391 16.3305 3.22386C15.9019 2.97381 15.3205 2.83333 14.7143 2.83333H12.4286M5.57143 2.83333C5.57143 2.47971 5.81224 2.14057 6.2409 1.89052C6.66955 1.64048 7.25093 1.5 7.85714 1.5H10.1429C10.7491 1.5 11.3304 1.64048 11.7591 1.89052C12.1878 2.14057 12.4286 2.47971 12.4286 2.83333M5.57143 2.83333C5.57143 3.18696 5.81224 3.52609 6.2409 3.77614C6.66955 4.02619 7.25093 4.16667 7.85714 4.16667H10.1429C10.7491 4.16667 11.3304 4.02619 11.7591 3.77614C12.1878 3.52609 12.4286 3.18696 12.4286 2.83333M5.57143 7.5H5.58286M10.1429 7.5H12.4286M5.57143 10.1667H5.58286M10.1429 10.1667H12.4286"
                stroke="#5C5C5C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="text-md text-gray-normal">담당자</div>
        </div>
        <button
          type="button"
          className="flex w-full items-center gap-[8px] rounded-[8px] px-[8px] py-[4px] hover:bg-blue-lighter"
          onClick={showMenu}
        >
          {currentAssignee && (
            <div className="flex w-full items-center justify-start gap-[8px]">
              <div className="relative flex h-[16px] w-[16px] shrink-0 items-center justify-center overflow-hidden rounded-[50%]">
                <Image
                  src={currentAssignee.avatarUrl}
                  alt="avatar"
                  fill
                  sizes="16px"
                />
              </div>
              <div className="truncate text-md">{currentAssignee.name}</div>
            </div>
          )}
          {!currentAssignee && (
            <div className="flex w-full justify-end text-md">없음</div>
          )}
        </button>
      </div>
      <div
        className={`${isMeneShow ? "visible opacity-100" : "invisible opacity-0"} absolute top-[40px] z-[10] flex h-[200px] w-full flex-col gap-[8px] rounded-[8px] bg-white-normal p-[4px] shadow-card transition-[opacity,visiblity]`}
        onMouseDownCapture={handleMouseDownCapture}
      >
        <div className="outline-3px rounded-[8px] border-[1.5px] border-blue-normal px-[12px] py-[8px] outline-blue-light">
          <input
            placeholder="멤버 검색"
            className="w-full outline-none"
            value={search}
            onChange={handleChangeSearch}
          />
        </div>
        <button
          type="button"
          className="rounded-[8px] px-[8px] py-[4px] text-start hover:bg-blue-lighter"
          onClick={handleClickRemoveAssignee}
        >
          담당자 제거
        </button>
        <div className="flex flex-col overflow-y-auto">
          {filteredMembersBySearch.map((member) => (
            <button
              key={member.id}
              type="button"
              className="flex items-center gap-[8px] rounded-[8px] px-[8px] py-[4px] hover:bg-blue-lighter"
              onClick={() => handleClickAddAssignee(member.id)}
            >
              <div className="relative flex h-[16px] w-[16px] shrink-0 items-center justify-center overflow-hidden rounded-[50%]">
                <Image src={member.avatarUrl} alt="avatar" fill sizes="16px" />
              </div>
              <div className="truncate text-md">{member.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const FollowerMenu = () => {
  const { workspace, members } = useContext(WorkspaceContext);
  const { userChat, endUser } = useContext(UserChatContext);
  const [isMeneShow, setIsMenuShow] = useState(false);
  const [search, setSearch] = useState("");

  const { channel: workspaceChannel } = useChannel(
    `workspace:${workspace?.id}`,
  );
  const { channel: endUserChannel } = useChannel(
    `workspace:${workspace?.id}:endUserId:${endUser?.id}`,
  );

  const currentFollowers = members.filter((member) =>
    userChat?.followerIds.includes(member.id),
  );

  const notCurrentFollowers = members
    .filter((member) => !userChat?.followerIds.includes(member.id))
    .filter((member) => member.name.includes(search));

  const showMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMenuShow(true);
  };

  const hideMenu = () => setIsMenuShow(false);

  const handleMouseDownCapture = (e: React.MouseEvent<HTMLDivElement>) =>
    e.stopPropagation();

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleClickRemoveFollower = async (followerId: string) => {
    try {
      if (!userChat) throw "handleClickRemoveFollower: No userChat";
      if (!endUser) throw "handleClickRemoveFollower: No endUser";

      const {
        userChat: updatedUserChat,
        message,
        user,
        error,
      } = await removeFollower({
        chatId: userChat.id,
        followerIds: currentFollowers
          .filter((follower) => follower.id !== followerId)
          .map((follower) => follower.id),
      });

      if (error) throw error;

      endUserChannel.publish("removeFollower", {
        userChat: updatedUserChat,
        message,
        user,
      });
      workspaceChannel.publish("removeFollower", {
        userChat: updatedUserChat,
        message,
        user,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickAddFollower = async (followerId: string) => {
    try {
      if (!workspace) throw "handleClickAddFollower: No workspace";
      if (!userChat) throw "handleClickAddFollower: No userChat";

      const {
        userChat: updatedUserChat,
        message,
        user,
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
        message,
        user,
      });
      workspaceChannel.publish("addFollower", {
        userChat: updatedUserChat,
        message,
        user,
        sessions,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    window.document.addEventListener("mousedown", hideMenu);
    return () => window.document.removeEventListener("mousedown", hideMenu);
  }, []);

  return (
    <div className="relative flex flex-col">
      <div className="grid grid-cols-[120px,minmax(0,1fr)] items-start">
        <div className="flex items-center gap-[8px]">
          <div className="flex h-[20px] w-[20px] items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
            >
              <path
                d="M11 14.9737H17M14 12.4474V17.5M1 16.6579V14.9737C1 14.0803 1.42143 13.2236 2.17157 12.5919C2.92172 11.9602 3.93913 11.6053 5 11.6053H9M3 4.86842C3 5.76178 3.42143 6.61855 4.17157 7.25025C4.92172 7.88196 5.93913 8.23684 7 8.23684C8.06087 8.23684 9.07828 7.88196 9.82843 7.25025C10.5786 6.61855 11 5.76178 11 4.86842C11 3.97506 10.5786 3.11829 9.82843 2.48659C9.07828 1.85489 8.06087 1.5 7 1.5C5.93913 1.5 4.92172 1.85489 4.17157 2.48659C3.42143 3.11829 3 3.97506 3 4.86842Z"
                stroke="#5C5C5C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="text-md text-gray-normal">보조 담당자</div>
        </div>
        <button type="button" onClick={showMenu}>
          <div className="flex flex-col gap-[8px] rounded-[8px] px-[8px] hover:bg-blue-lighter">
            {currentFollowers.map((member) => (
              <div
                key={member.id}
                className="flex w-full items-center justify-start gap-[8px]"
              >
                <div className="relative flex h-[16px] w-[16px] shrink-0 items-center justify-center overflow-hidden rounded-[50%]">
                  <Image
                    src={member.avatarUrl}
                    alt="avatar"
                    fill
                    sizes="16px"
                  />
                </div>
                <div className="flex-1 truncate text-start text-md">
                  {member.name}
                </div>
              </div>
            ))}
            {!currentFollowers.length && (
              <div className="flex w-full justify-end text-md">없음</div>
            )}
          </div>
        </button>
      </div>
      <div
        className={`${isMeneShow ? "visible opacity-100" : "invisible opacity-0"} absolute top-[30px] z-[10] flex h-[200px] w-full flex-col gap-[8px] rounded-[8px] bg-white-normal p-[4px] shadow-card transition-[opacity,visiblity]`}
        onMouseDownCapture={handleMouseDownCapture}
      >
        <div className="outline-3px rounded-[8px] border-[1.5px] border-blue-normal px-[12px] py-[8px] outline-blue-light">
          <input
            placeholder="멤버 검색"
            className="w-full outline-none"
            value={search}
            onChange={handleChangeSearch}
          />
        </div>
        <div className="flex flex-col overflow-y-auto">
          <div className="text-sm text-gray-normal">현재 담당자</div>
          {currentFollowers.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-[8px] rounded-[8px] px-[8px] py-[4px] hover:bg-blue-lighter"
            >
              <div className="relative flex h-[16px] w-[16px] shrink-0 items-center justify-center overflow-hidden rounded-[50%]">
                <Image src={member.avatarUrl} alt="avatar" fill sizes="16px" />
              </div>
              <div className="flex-1 truncate text-md">{member.name}</div>
              <button
                type="button"
                className="flex h-[14px] w-[14px] items-center justify-center"
                onClick={() => handleClickRemoveFollower(member.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  fill="none"
                >
                  <path
                    d="M1.69231 12.5L0 10.8077L4.30769 6.5L0 2.19231L1.69231 0.5L6 4.80769L10.3077 0.5L12 2.19231L7.69231 6.5L12 10.8077L10.3077 12.5L6 8.19231L1.69231 12.5Z"
                    fill="#D5D5D5"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-col overflow-y-auto">
          <div className="text-sm text-gray-normal">추가하기</div>
          {notCurrentFollowers.map((member) => (
            <button
              key={member.id}
              type="button"
              className="flex items-center gap-[8px] rounded-[8px] px-[8px] py-[4px] hover:bg-blue-lighter"
              onClick={() => handleClickAddFollower(member.id)}
            >
              <div className="relative flex h-[16px] w-[16px] shrink-0 items-center justify-center overflow-hidden rounded-[50%]">
                <Image src={member.avatarUrl} alt="avatar" fill sizes="16px" />
              </div>
              <div className="truncate text-md">{member.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const EndUserInfo = () => {
  const { endUser } = useContext(UserChatContext);

  return (
    <div className="flex flex-col gap-[16px] border-b border-gray-lighter p-[20px]">
      <div className="text-md">고객 정보</div>
      <div className="flex items-center gap-[12px]">
        <div className="relative flex h-[36px] w-[36px] shrink-0 items-center justify-center overflow-hidden rounded-[50%]">
          <Image
            src={endUser?.avatarUrl || ""}
            alt="avatar"
            fill
            sizes="36px"
          />
        </div>
        <div className="flex max-w-[220px] flex-col gap-[4px]">
          <div className="text-md">{endUser?.name}</div>
          <div className="flex items-center gap-[12px]">
            <div className="flex items-center gap-[8px]">
              <div className="flex h-[20px] w-[20px] items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="13"
                  viewBox="0 0 16 13"
                  fill="none"
                >
                  <path
                    d="M1.78374 12.9321C1.29 12.9321 0.869276 12.7583 0.521558 12.4105C0.173853 12.0628 0 11.6421 0 11.1484V1.85212C0 1.35838 0.173866 0.937656 0.521597 0.589937C0.869303 0.242219 1.29002 0.0683594 1.78376 0.0683594H14.2162C14.71 0.0683594 15.1307 0.242219 15.4784 0.589937C15.8261 0.937656 16 1.35838 16 1.85212V11.1484C16 11.6421 15.8261 12.0628 15.4784 12.4105C15.1307 12.7583 14.71 12.9321 14.2162 12.9321H1.78374ZM7.99998 7.48586L1.78374 3.56555V11.1484H14.2162V3.56555L7.99998 7.48586ZM7.99998 5.77243L14.2162 1.85212H1.78374L7.99998 5.77243ZM1.78374 3.56555V1.85212V11.1484V3.56555Z"
                    fill="#5C5C5C"
                  />
                </svg>
              </div>
              <div className="whitespace-nowrap text-md text-gray-normal">
                이메일
              </div>
            </div>
            <div className="truncate text-md">{endUser?.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BotInfo = () => {
  const { workspace } = useContext(WorkspaceContext);
  const { bots, endUser } = useContext(UserChatContext);

  const findBot = bots.find((bot) => bot.plugInId === endUser?.plugInId);

  if (!findBot) return;

  return (
    <div className="flex flex-col gap-[16px] border-b border-gray-lighter p-[20px]">
      <div className="text-md">대응한 봇 정보</div>
      <Link
        href={`/workspaces/${workspace?.id}/ai-chatbots/${findBot.id}/contents`}
      >
        <div className="flex items-center gap-[12px] rounded-[8px] p-[4px] hover:bg-blue-light">
          <div className="relative flex h-[36px] w-[36px] shrink-0 items-center justify-center overflow-hidden rounded-[50%]">
            <Image src={findBot.avatarUrl} alt="avatar" fill sizes="36px" />
          </div>
          <div className="flex max-w-[220px] flex-col gap-[4px]">
            <div className="text-md">{findBot.name}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const Notes = () => {
  const { workspace, members, myMembership } = useContext(WorkspaceContext);
  const { userChat, endUser } = useContext(UserChatContext);
  const [newNote, setNewNote] = useState("");

  const { channel: endUserChannel } = useChannel(
    `workspace:${workspace?.id}:endUserId:${endUser?.id}`,
  );

  const parsedNotes =
    userChat?.notes &&
    (userChat?.notes.map((note) =>
      JSON.parse(note as string),
    ) as UserChatNote[]);

  const handleChangeNewNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
    setNewNote(e.target.value);
  };

  const handleKeydownAddNote = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    try {
      if (!workspace) throw "handleKeydownAddNote: No workspace";
      if (!myMembership) throw "handleKeydownAddNote: No myMembership";
      if (!userChat) throw "handleKeydownAddNote: No userChat";

      if (e.nativeEvent.isComposing) return;

      if (e.key === "Enter" && !e.shiftKey) {
        const copiedNewNote = newNote;
        setNewNote("");

        const { userChat: updatedUserChat, error } = await addNote({
          workspaceId: workspace.id,
          chatId: userChat.id,
          memberId: myMembership.id,
          text: copiedNewNote,
        });

        if (error) throw error;

        endUserChannel.publish("addNote", { userChat: updatedUserChat });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-[16px] border-b border-gray-lighter p-[20px]">
      <div className="flex items-center gap-[8px]">
        <div className="flex h-[16px] w-[16px] items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
          >
            <path
              d="M1.48318 11.0168H7.25711V7.75711H10.5168V1.98318H1.48318V11.0168ZM1.48318 12.5C1.07531 12.5 0.726144 12.3548 0.435693 12.0643C0.145231 11.7739 0 11.4247 0 11.0168V1.98318C0 1.57531 0.145231 1.22614 0.435693 0.935693C0.726144 0.645231 1.07531 0.5 1.48318 0.5H10.5168C10.9247 0.5 11.2739 0.645231 11.5643 0.935693C11.8548 1.22614 12 1.57531 12 1.98318V8.47532L7.97532 12.5H1.48318Z"
              fill="#5C5C5C"
            />
          </svg>
        </div>
        <div className="text-md">노트</div>
      </div>
      <div className="flex flex-col gap-[8px]">
        <div className="flex gap-[8px] rounded-[8px] bg-yellow-normal px-[12px] py-[4px]">
          <div className="mt-[4px] flex h-[14px] w-[14px] items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
            >
              <path
                d="M4.21043 6.28957H0V4.71043H4.21043V0.5H5.78957V4.71043H10V6.28957H5.78957V10.5H4.21043V6.28957Z"
                fill="#A6A6A6"
              />
            </svg>
          </div>
          <textarea
            placeholder="새로운 메모"
            className="max-h-[160px] flex-1 resize-none bg-yellow-normal text-sm outline-none placeholder:text-gray-light"
            rows={1}
            value={newNote}
            onChange={handleChangeNewNote}
            onKeyDown={handleKeydownAddNote}
          ></textarea>
        </div>
        <div className="flex max-h-[400px] flex-col gap-[8px] overflow-y-auto">
          {parsedNotes?.map((note) => {
            const findMember = members.find(
              (member) => member.id === note.memberId,
            );
            if (!findMember) return;

            return (
              <div
                key={note.id}
                className="flex flex-col gap-[8px] rounded-[8px] bg-yellow-normal px-[12px] py-[4px]"
              >
                <div className="flex items-center gap-[4px]">
                  <div className="relative mt-[4px] flex h-[14px] w-[14px] shrink-0 items-center justify-center self-start overflow-hidden rounded-[50%]">
                    <Image
                      src={findMember.avatarUrl}
                      alt="avatar"
                      fill
                      sizes="14px"
                    />
                  </div>
                  <div className="text-sm">{findMember.name}</div>
                  {note.submittedAt && (
                    <div className="text-sm">
                      {formatTime(note.submittedAt)}
                    </div>
                  )}
                </div>
                <div
                  className="whitespace-pre-wrap text-sm"
                  dangerouslySetInnerHTML={{ __html: note.text }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
