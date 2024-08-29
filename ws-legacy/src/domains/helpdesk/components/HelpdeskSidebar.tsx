"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useChannel } from "ably/react";
import { readChat } from "@/domains/helpdesk/actions/readChat";
import { WorkspaceContext } from "@/domains/workspace/stores/WorkspaceContext";
import { HelpdeskContext } from "@/domains/helpdesk/stores/HelpdeskContext";
import { UserChatCard } from "./UserChatCard";
import { NoChatsPlaceholder } from "./NoChatsPlaceholder";
import type { HelpdeskSidebarMenu } from "@/domains/helpdesk/types/helpdesk.type";

export default function HelpdeskSidebar() {
  const { chatId }: { chatId: string } = useParams();
  const { menus } = useContext(HelpdeskContext);
  const { workspace, myMembership } = useContext(WorkspaceContext);
  const {
    currentMenu,
    currentChatFilter,
    userChats,
    messages,
    endUsers,
    sessions,
  } = useContext(HelpdeskContext);

  const { channel: workspaceChannel } = useChannel(
    `workspace:${workspace?.id}`,
  );

  const filteredUserChats = userChats
    .filter((chat) => chat.firstAskedAt)
    .filter((chat) => chat.state === currentChatFilter?.tab.key)
    .filter((chat) => {
      if (currentChatFilter?.sort.key === "unread") {
        const findSession = sessions.find(
          (session) =>
            session.endUserChatId === chat.id &&
            session.personId === myMembership?.id,
        );
        return !!findSession?.unreadCount;
      }

      return true;
    })
    .filter((chat) => {
      const findUser = endUsers.find((user) => user.id === chat.endUserId);

      if (!findUser?.name.includes(currentChatFilter?.search as string))
        return false;

      return true;
    })
    .sort((a, b) => {
      const currentMessageA = messages.find(
        (message) => message.id === a.currentMessageId,
      );

      const currentMessageB = messages.find(
        (message) => message.id === b.currentMessageId,
      );

      const aTime = new Date(
        currentMessageA?.createdAt ?? new Date(),
      ).getTime();

      const bTime = new Date(
        currentMessageB?.createdAt ?? new Date(),
      ).getTime();

      if (currentChatFilter?.sort.key === "oldest") return aTime - bTime;

      return bTime - aTime;
    });

  return (
    <div className="sticky left-0 grid h-full grid-cols-[250px,300px]">
      <div className="flex flex-col gap-[16px] border-r border-gray-lightest bg-white-normal p-[20px]">
        <div className="text-lg">헬프데스크</div>
        <div className="flex flex-col gap-[8px]">
          {menus.map((menu) => (
            <HelpdeskMenu key={menu.key} menu={menu} />
          ))}
        </div>
      </div>
      <div className="grid h-full grid-rows-[90px,120px,minmax(0,1fr)] border-r border-gray-lighter bg-blue-lighter">
        <div className="flex min-w-0 items-center justify-between p-[20px]">
          <div className="truncate text-lg">{currentMenu?.label}</div>
          <Sort />
        </div>
        <div className="flex flex-col gap-[16px] px-[20px]">
          <Tab />
          <Search />
        </div>
        <div className="flex h-[calc(100dvh-210px)] flex-col gap-[8px] overflow-y-auto px-[12px]">
          {filteredUserChats.map((chat) => {
            const findUser = endUsers.find(
              (user) => user.id === chat.endUserId,
            );
            const findMessage = messages.find(
              (message) => message.id === chat.currentMessageId,
            );
            const findSession = sessions.find(
              (session) =>
                session.endUserChatId === chat.id &&
                session.personId === myMembership?.id,
            );

            if (!findUser || !findMessage || !findSession) return;

            const handleClickReadUserChat = async () => {
              try {
                if (!workspace) throw "handleClickReadUserChat: No workspace";
                if (!myMembership)
                  throw "handleClickReadUserChat: No myMembership";

                const { session, error } = await readChat({
                  memberId: myMembership.id,
                  workspaceId: workspace.id,
                  chatId: chat.id,
                });

                if (error) throw new Error(`${error}`);

                workspaceChannel.publish("readEndUserChat", { session });
              } catch (err) {
                console.error(err);
              }
            };

            return (
              <UserChatCard
                key={chat.id}
                href={`/workspaces/${workspace?.id}/help-desk/user-chats/${chat.id}`}
                isActive={chat.id === chatId}
                avatarUrl={findUser.avatarUrl}
                name={findUser.name}
                createdAt={findMessage.createdAt}
                plainText={findMessage.plainText}
                files={findMessage.files}
                unreadCount={findSession.unreadCount}
                onClick={handleClickReadUserChat}
              />
            );
          })}
          {!filteredUserChats.length && <NoChatsPlaceholder />}
        </div>
      </div>
    </div>
  );
}

const HelpdeskMenu = ({ menu }: { menu: HelpdeskSidebarMenu }) => {
  const { key, icon, image, label, subMenus } = menu;
  const { workspace } = useContext(WorkspaceContext);
  const { currentMenu, selectMenu } = useContext(HelpdeskContext);
  const [isShowSubMenu, setIsShowSubMenu] = useState(true);

  const handleClickMenu = selectMenu;

  const handleExpandSubMenu = () => setIsShowSubMenu((prev) => !prev);

  if (subMenus)
    return (
      <div className="flex flex-col gap-[8px]">
        <div className="flex items-center justify-between rounded-[4px] bg-white-normal px-[8px] py-[4px]">
          <div className="flex items-center gap-[8px]">
            <div className="text-md">{label}</div>
          </div>
          <div className="flex items-center gap-[4px]">
            <button
              type="button"
              className={`${isShowSubMenu ? "rotate-0" : "rotate-180"} flex h-[16px] w-[16px] items-center justify-center`}
              onClick={handleExpandSubMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="7"
                viewBox="0 0 10 7"
                fill="none"
              >
                <path
                  d="M5 6.64253L0 1.64253L1.28511 0.357422L5 4.07231L8.71489 0.357422L10 1.64253L5 6.64253Z"
                  fill="#292929"
                />
              </svg>
            </button>
            <Link
              href={`/workspaces/${workspace?.id}/members?inviting=true`}
              className="flex h-[16px] w-[16px] items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
              >
                <path
                  d="M4.21043 6.28957H0V4.71043H4.21043V0.5H5.78957V4.71043H10V6.28957H5.78957V10.5H4.21043V6.28957Z"
                  fill="#292929"
                />
              </svg>
            </Link>
          </div>
        </div>
        {isShowSubMenu &&
          subMenus.map((menu) => <HelpdeskMenu key={menu.key} menu={menu} />)}
      </div>
    );

  return (
    <button
      type="button"
      className={`${
        key === currentMenu?.key
          ? "bg-blue-light text-blue-dark"
          : "bg-white-normal"
      } flex items-center justify-between rounded-[4px] px-[8px] py-[4px] hover:bg-blue-light hover:text-blue-dark`}
      onClick={() => handleClickMenu(menu)}
    >
      <div className="flex items-center gap-[8px]">
        {icon && (
          <div className="relative flex h-[16px] w-[16px] items-center justify-center">
            {icon}
          </div>
        )}
        {image && (
          <div className="relative flex h-[16px] w-[16px] items-center justify-center overflow-hidden rounded-[50%]">
            <Image src={image} alt="avatar" fill sizes="16px" />
          </div>
        )}
        <div className="text-md">{label}</div>
      </div>
    </button>
  );
};

const Sort = () => {
  const { sorts, currentChatFilter, selectSort } = useContext(HelpdeskContext);
  const [isMenuShow, setIsMenuShow] = useState(false);

  const showMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMenuShow(true);
  };

  const hideMenu = () => setIsMenuShow(false);

  useEffect(() => {
    window.addEventListener("mousedown", hideMenu);

    return () => window.removeEventListener("mousedown", hideMenu);
  }, []);

  return (
    <div className="relative flex flex-col gap-[8px]">
      <button
        type="button"
        className="flex items-center gap-[8px] rounded-[4px] px-[8px] py-[4px] hover:bg-gray-lightest"
        onClick={showMenu}
      >
        <div className="whitespace-nowrap text-md">
          {currentChatFilter?.sort.label}
        </div>
        <div className="flex h-[8px] w-[8px] shrink-0 items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="4"
            viewBox="0 0 8 4"
            fill="none"
          >
            <path
              d="M4 4L0.817871 0.817875L1.63575 0L4 2.36425L6.36424 0L7.18212 0.817875L4 4Z"
              fill="#292929"
            />
          </svg>
        </div>
      </button>
      <div
        className={`${isMenuShow ? "visible opacity-100" : "invisible opacity-0"} absolute right-0 top-[48px] flex flex-col gap-[8px] rounded-[8px] border border-gray-lightest bg-white-normal p-[8px] shadow-card transition-[opacity,visibility]`}
      >
        {sorts.map((sort) => (
          <button
            key={sort.key}
            type="button"
            className={`${sort.key === currentChatFilter?.sort.key ? "bg-gray-lightest" : "bg-white-normal"} flex items-center justify-end whitespace-nowrap rounded-[4px] px-[8px] py-[4px] text-md hover:bg-gray-lightest`}
            onClick={() => selectSort(sort)}
          >
            {sort.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const Tab = () => {
  const { tabs, currentChatFilter, selectTab } = useContext(HelpdeskContext);
  return (
    <div className="flex items-center rounded-[8px] bg-gray-lightest p-[4px]">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          className={`${tab.key === currentChatFilter?.tab.key ? "bg-white-normal" : "text-gray-light"} flex flex-1 items-center justify-center rounded-[8px] p-[4px] text-md`}
          onClick={() => selectTab(tab)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

const Search = () => {
  const { currentChatFilter, changeSearch } = useContext(HelpdeskContext);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeSearch(e.target.value);
  };

  return (
    <label
      htmlFor="search"
      className="flex items-center gap-[8px] rounded-[8px] border-[1.5px] border-gray-lighter bg-white-normal px-[12px] py-[8px]"
    >
      <div className="flex h-[12px] w-[12px] items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="15"
          viewBox="0 0 14 15"
          fill="none"
        >
          <path
            d="M13 13.5L9 9.5M1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36684 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 5.55383 10.2126 4.947 9.97811 4.38081C9.74358 3.81462 9.39984 3.30018 8.9665 2.86684C8.53316 2.43349 8.01871 2.08975 7.45252 1.85523C6.88634 1.62071 6.2795 1.5 5.66667 1.5C5.05383 1.5 4.447 1.62071 3.88081 1.85523C3.31462 2.08975 2.80018 2.43349 2.36684 2.86684C1.93349 3.30018 1.58975 3.81462 1.35523 4.38081C1.12071 4.947 1 5.55383 1 6.16667Z"
            stroke="#5C5C5C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <input
        id="search"
        className="flex-1 text-md outline-none placeholder:text-gray-light"
        placeholder="유저 이름으로 검색하기"
        defaultValue={currentChatFilter?.search}
        onChange={handleChangeSearch}
      />
    </label>
  );
};
