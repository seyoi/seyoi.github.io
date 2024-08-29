"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { WorkspaceContext } from "@/domains/workspace/stores/WorkspaceContext";
import { getUserChatsAll } from "@/domains/helpdesk/actions/getUserChatsAll";
import { getUserChatsAssignToMe } from "@/domains/helpdesk/actions/getUserChatsMe";
import { getUserChatsUnassigned } from "@/domains/helpdesk/actions/getUserChatsUnassigned";
import { getUserChatsAssignToMember } from "@/domains/helpdesk/actions/getUserChatsAssignToMember";
import { useChannel } from "ably/react";
import { type Message as AblyMessage } from "ably";
import type {
  HelpdeskSidebarMenu,
  UserChatFilterMenu,
  UserChat,
  Message,
  EndUser,
  Session,
} from "@/domains/helpdesk/types/helpdesk.type";

export const HelpdeskContext = createContext<{
  menus: HelpdeskSidebarMenu[];
  sorts: UserChatFilterMenu["sort"][];
  tabs: UserChatFilterMenu["tab"][];
  currentMenu: HelpdeskSidebarMenu | null;
  currentChatFilter: UserChatFilterMenu | null;
  userChats: UserChat[];
  messages: Message[];
  endUsers: EndUser[];
  sessions: Session[];
  selectMenu: (menu: HelpdeskSidebarMenu) => void;
  selectSort: (sort: UserChatFilterMenu["sort"]) => void;
  selectTab: (sort: UserChatFilterMenu["tab"]) => void;
  changeSearch: (search: UserChatFilterMenu["search"]) => void;
  setUserChats: React.Dispatch<React.SetStateAction<UserChat[]>>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setEndUsers: React.Dispatch<React.SetStateAction<EndUser[]>>;
  setSessions: React.Dispatch<React.SetStateAction<Session[]>>;
}>({
  menus: [],
  sorts: [],
  tabs: [],
  currentMenu: null,
  currentChatFilter: null,
  userChats: [],
  messages: [],
  endUsers: [],
  sessions: [],
  selectMenu: () => null,
  selectSort: () => null,
  selectTab: () => null,
  changeSearch: () => null,
  setUserChats: () => null,
  setMessages: () => null,
  setEndUsers: () => null,
  setSessions: () => null,
});

export default function HelpdeskContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { workspace, myMembership, members } = useContext(WorkspaceContext);
  const [menus, setMenus] = useState<HelpdeskSidebarMenu[]>([]);
  const [sorts, setSorts] = useState<UserChatFilterMenu["sort"][]>([]);
  const [tabs, setTabs] = useState<UserChatFilterMenu["tab"][]>([]);
  const [currentMenu, setCurrentMenu] = useState<HelpdeskSidebarMenu | null>(
    null,
  );
  const [currentChatFilter, setCurrentChatFilter] =
    useState<UserChatFilterMenu | null>(null);
  const [userChats, setUserChats] = useState<UserChat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [endUsers, setEndUsers] = useState<EndUser[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);

  const selectMenu = (menu: HelpdeskSidebarMenu) => setCurrentMenu(menu);

  const selectSort = (sort: UserChatFilterMenu["sort"]) =>
    setCurrentChatFilter((prev) => (prev ? { ...prev, sort } : prev));

  const selectTab = (tab: UserChatFilterMenu["tab"]) =>
    setCurrentChatFilter((prev) => (prev ? { ...prev, tab } : prev));

  const changeSearch = (search: UserChatFilterMenu["search"]) =>
    setCurrentChatFilter((prev) => (prev ? { ...prev, search } : prev));

  useEffect(() => {
    const initialMenus: HelpdeskSidebarMenu[] = [
      {
        key: "all",
        label: "전체 대화",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
          >
            <path
              d="M3.39394 10.6463L0 13.378V1.28049C0 0.84944 0.34112 0.5 0.761905 0.5H12.1905C12.6113 0.5 12.9524 0.84944 12.9524 1.28049V10.6463H3.39394ZM2.86691 9.08537H11.4286V2.06098H1.52381V10.1664L2.86691 9.08537ZM5.33333 12.2073H13.1331L14.4762 13.2884V5.18293H15.2381C15.6589 5.18293 16 5.53237 16 5.96341V16.5L12.6061 13.7683H6.09524C5.67445 13.7683 5.33333 13.4189 5.33333 12.9878V12.2073Z"
              fill="#5C5C5C"
            />
          </svg>
        ),
      },
      { key: "me", label: "내 담당", image: myMembership?.avatarUrl },
      { key: "unassigned", label: "담당자 없음" },
      {
        key: "member",
        label: "담당자",
        subMenus: members
          .filter((member) => member.id !== myMembership?.id)
          .map((member) => ({
            key: `member-${member.id}`,
            label: member.name,
            image: member?.avatarUrl,
          })),
      },
    ];

    const initialSorts = [
      { key: "latest", label: "최신순" },
      { key: "oldest", label: "오래된순" },
      { key: "unread", label: "안 읽은 메세지" },
    ];

    const initialTabs = [
      { key: "open", label: "진행중" },
      { key: "closed", label: "상담 종료" },
      { key: "snoozed", label: "보류중" },
    ];

    setMenus(initialMenus);
    setSorts(initialSorts);
    setTabs(initialTabs);
    setCurrentMenu(initialMenus[0]);
    setCurrentChatFilter({
      sort: initialSorts[0],
      tab: initialTabs[0],
      search: "",
    });
  }, [members, myMembership?.avatarUrl, myMembership?.id]);

  useEffect(() => {
    const init = async () => {
      try {
        if (!workspace) return;
        if (!myMembership) return;

        if (currentMenu?.key === "all") {
          const {
            userChats,
            messages,
            users,
            sessions,
            error: getUserChatsAllError,
          } = await getUserChatsAll({
            workspaceId: workspace.id,
          });
          setUserChats(userChats);
          setMessages(messages);
          setEndUsers(users);
          setSessions(sessions);

          if (getUserChatsAllError) throw getUserChatsAllError;
        }

        if (currentMenu?.key === "me") {
          const {
            userChats,
            messages,
            users,
            sessions,
            error: getUserChatsMeError,
          } = await getUserChatsAssignToMe({
            workspaceId: workspace.id,
            assigneeId: myMembership.id,
          });
          setUserChats(userChats);
          setMessages(messages);
          setEndUsers(users);
          setSessions(sessions);

          if (getUserChatsMeError) throw getUserChatsMeError;
        }

        if (currentMenu?.key === "unassigned") {
          const {
            userChats,
            messages,
            users,
            sessions,
            error: getUserChatsUnassignedError,
          } = await getUserChatsUnassigned({
            workspaceId: workspace.id,
          });
          setUserChats(userChats);
          setMessages(messages);
          setEndUsers(users);
          setSessions(sessions);

          if (getUserChatsUnassignedError) throw getUserChatsUnassignedError;
        }

        if (currentMenu?.key.startsWith("member-")) {
          const memberId = currentMenu.key.split("-")[1];
          const {
            userChats,
            messages,
            users,
            sessions,
            error: getUserChatsAssignToMemberError,
          } = await getUserChatsAssignToMember({
            workspaceId: workspace.id,
            assigneeId: memberId,
          });

          if (getUserChatsAssignToMemberError)
            throw getUserChatsAssignToMemberError;

          setUserChats(userChats);
          setMessages(messages);
          setEndUsers(users);
          setSessions(sessions);
        }
      } catch (err) {
        console.error(err);
      }
    };
    init();
  }, [currentMenu?.key, myMembership, myMembership?.id, workspace]);

  return (
    <HelpdeskContext.Provider
      value={{
        menus,
        sorts,
        tabs,
        currentMenu,
        currentChatFilter,
        userChats,
        messages,
        endUsers,
        sessions,
        selectMenu,
        selectSort,
        selectTab,
        changeSearch,
        setUserChats,
        setMessages,
        setEndUsers,
        setSessions,
      }}
    >
      <WorkspaceChannelSubscriber>{children}</WorkspaceChannelSubscriber>
    </HelpdeskContext.Provider>
  );
}

const WorkspaceChannelSubscriber = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { workspace, myMembership } = useContext(WorkspaceContext);
  const {
    currentMenu,
    userChats,
    setUserChats,
    setMessages,
    setEndUsers,
    setSessions,
  } = useContext(HelpdeskContext);

  useChannel(`workspace:${workspace?.id}`, (ablyMessage: AblyMessage) => {
    if (ablyMessage.name === "createNewChat") {
      const {
        endUser,
        userChat,
        messages,
        sessions,
      }: {
        endUser: EndUser;
        userChat: UserChat;
        messages: Message;
        sessions: Session[];
      } = ablyMessage.data;
      setEndUsers((prev) => {
        const findEndUser = prev.find(
          (prevEndUser) => prevEndUser.id === endUser.id,
        );

        if (findEndUser) return prev;

        return prev.concat(endUser);
      });
      setUserChats((prev) => prev.concat(userChat));
      setMessages((prev) => prev.concat(messages));
      setSessions((prev) => prev.concat(sessions));
    }

    if (ablyMessage.name === "sendMessageInPlugIn") {
      const {
        userChat,
        currentMessage,
      }: { userChat: UserChat; currentMessage: Message } = ablyMessage.data;

      setUserChats((prev) =>
        prev.map((prevChat) =>
          prevChat.id === userChat.id ? userChat : prevChat,
        ),
      );
      setMessages((prev) => prev.concat(currentMessage));
    }

    if (ablyMessage.name === "sendMessageInHelpDesk") {
      const {
        userChat,
        currentMessage,
      }: { userChat: UserChat; currentMessage: Message } = ablyMessage.data;

      setUserChats((prev) =>
        prev.map((prevChat) =>
          prevChat.id === userChat.id ? userChat : prevChat,
        ),
      );
      setMessages((prev) => prev.concat(currentMessage));
    }

    if (ablyMessage.name === "clickScenarioNextButton") {
      const {
        userChat,
        currentMessage,
      }: { userChat: UserChat; currentMessage: Message } = ablyMessage.data;

      setUserChats((prev) =>
        prev.map((prevChat) =>
          prevChat.id === userChat.id ? userChat : prevChat,
        ),
      );
      setMessages((prev) => prev.concat(currentMessage));
    }

    if (ablyMessage.name === "createMessagesScenario") {
      const {
        userChat,
        messages,
      }: { userChat: UserChat; messages: Message[] } = ablyMessage.data;

      setUserChats((prev) =>
        prev.map((prevChat) =>
          prevChat.id === userChat.id ? userChat : prevChat,
        ),
      );
      setMessages((prev) => prev.concat(messages));
    }

    if (ablyMessage.name === "countUpSessions") {
      const { sessions }: { sessions: Session[] } = ablyMessage.data;
      setSessions((prev) =>
        prev.map((prevSession) => {
          const findSession = sessions.find(
            (session) => session.id === prevSession.id,
          );

          if (findSession) return findSession;

          return prevSession;
        }),
      );
    }

    if (ablyMessage.name === "openChat") {
      const { userChat }: { userChat: UserChat } = ablyMessage.data;
      setUserChats((prev) =>
        prev.map((prevChat) =>
          prevChat.id === userChat.id ? userChat : prevChat,
        ),
      );
    }

    if (ablyMessage.name === "closeChat") {
      const { userChat }: { userChat: UserChat } = ablyMessage.data;
      setUserChats((prev) =>
        prev.map((prevChat) =>
          prevChat.id === userChat.id ? userChat : prevChat,
        ),
      );
    }

    if (ablyMessage.name === "snoozeChat") {
      const { userChat }: { userChat: UserChat } = ablyMessage.data;
      setUserChats((prev) =>
        prev.map((prevChat) =>
          prevChat.id === userChat.id ? userChat : prevChat,
        ),
      );
    }

    if (ablyMessage.name === "assign") {
      const {
        userChat,
        message,
        user,
        sessions,
      }: {
        userChat: UserChat;
        message: Message;
        user: EndUser;
        sessions: Session[];
      } = ablyMessage.data;

      setSessions((prev) =>
        prev.map((prevSession) => {
          const findSession = sessions.find(
            (session) => session.id === prevSession.id,
          );

          if (findSession) return findSession;

          return prevSession;
        }),
      );

      if (currentMenu?.key === "me") {
        if (!myMembership) return;

        if (userChat.assigneeId !== myMembership.id) return;

        const findUserChat = userChats.find((chat) => chat.id === userChat.id);

        if (findUserChat) {
          setUserChats((prev) =>
            prev.map((prevChat) =>
              prevChat.id === userChat.id ? userChat : prevChat,
            ),
          );
        }

        if (!findUserChat) {
          setUserChats((prev) => prev.concat(userChat));
          setMessages((prev) => prev.concat(message));
          setEndUsers((prev) => prev.concat(user));
        }
      }

      if (currentMenu?.key === "unassigned") {
        setUserChats((prev) =>
          prev.filter((prevChat) => prevChat.id !== userChat.id),
        );
      }

      if (currentMenu?.key.startsWith("member-")) {
        const memberId = currentMenu.key.split("-")[1];

        if (userChat.assigneeId !== memberId) return;

        const findUserChat = userChats.find((chat) => chat.id === userChat.id);

        if (findUserChat) {
          setUserChats((prev) =>
            prev.map((prevChat) =>
              prevChat.id === userChat.id ? userChat : prevChat,
            ),
          );
        }

        if (!findUserChat) {
          setUserChats((prev) => prev.concat(userChat));
          setMessages((prev) => prev.concat(message));
          setEndUsers((prev) => prev.concat(user));
        }
      }
    }

    if (ablyMessage.name === "unassign") {
      const {
        userChat,
        message,
        user,
      }: {
        userChat: UserChat;
        message: Message;
        user: EndUser;
      } = ablyMessage.data;

      if (currentMenu?.key === "me") {
        setUserChats((prev) =>
          prev.filter((prevChat) => prevChat.id !== userChat.id),
        );
      }

      if (currentMenu?.key === "unassigned") {
        if (userChat.assigneeId) return;

        const findUserChat = userChats.find((chat) => chat.id === userChat.id);

        if (findUserChat) {
          setUserChats((prev) =>
            prev.map((prevChat) =>
              prevChat.id === userChat.id ? userChat : prevChat,
            ),
          );
        }

        if (!findUserChat) {
          setUserChats((prev) => prev.concat(userChat));
          setMessages((prev) => prev.concat(message));
          setEndUsers((prev) => prev.concat(user));
        }
      }

      if (currentMenu?.key.startsWith("member-")) {
        const memberId = currentMenu.key.split("-")[1];

        if (
          userChat.assigneeId === memberId ||
          userChat.followerIds.includes(memberId)
        )
          return;

        setUserChats((prev) =>
          prev.filter((prevChat) => prevChat.id !== userChat.id),
        );
      }
    }

    if (ablyMessage.name === "addFollower") {
      const {
        userChat,
        message,
        user,
        sessions,
      }: {
        userChat: UserChat;
        message: Message;
        user: EndUser;
        sessions: Session[];
      } = ablyMessage.data;

      setSessions((prev) =>
        prev.map((prevSession) => {
          const findSession = sessions.find(
            (session) => session.id === prevSession.id,
          );

          if (findSession) return findSession;

          return prevSession;
        }),
      );

      if (currentMenu?.key === "me") {
        if (!myMembership) return;

        if (!userChat.followerIds.includes(myMembership.id)) return;

        const findUserChat = userChats.find((chat) => chat.id === userChat.id);

        if (findUserChat) {
          setUserChats((prev) =>
            prev.map((prevChat) =>
              prevChat.id === userChat.id ? userChat : prevChat,
            ),
          );
        }

        if (!findUserChat) {
          setUserChats((prev) => prev.concat(userChat));
          setMessages((prev) => prev.concat(message));
          setEndUsers((prev) => prev.concat(user));
        }
      }

      if (currentMenu?.key === "unassigned") {
        setUserChats((prev) =>
          prev.filter((prevChat) => prevChat.id !== userChat.id),
        );
      }

      if (currentMenu?.key.startsWith("member-")) {
        const memberId = currentMenu.key.split("-")[1];

        if (!userChat.followerIds.includes(memberId)) return;

        const findUserChat = userChats.find((chat) => chat.id === userChat.id);

        if (findUserChat) {
          setUserChats((prev) =>
            prev.map((prevChat) =>
              prevChat.id === userChat.id ? userChat : prevChat,
            ),
          );
        }

        if (!findUserChat) {
          setUserChats((prev) => prev.concat(userChat));
          setMessages((prev) => prev.concat(message));
          setEndUsers((prev) => prev.concat(user));
        }
      }
    }

    if (ablyMessage.name === "removeFollower") {
      const {
        userChat,
        message,
        user,
      }: { userChat: UserChat; message: Message; user: EndUser } =
        ablyMessage.data;

      if (currentMenu?.key === "me") {
        setUserChats((prev) =>
          prev.filter((prevChat) => prevChat.id !== userChat.id),
        );
      }

      if (currentMenu?.key === "unassigned") {
        if (userChat.followerIds.length) return;

        const findUserChat = userChats.find((chat) => chat.id === userChat.id);

        if (findUserChat) {
          setUserChats((prev) =>
            prev.map((prevChat) =>
              prevChat.id === userChat.id ? userChat : prevChat,
            ),
          );
        }

        if (!findUserChat) {
          setUserChats((prev) => prev.concat(userChat));
          setMessages((prev) => prev.concat(message));
          setEndUsers((prev) => prev.concat(user));
        }
      }

      if (currentMenu?.key.startsWith("member-")) {
        const memberId = currentMenu.key.split("-")[1];

        if (
          userChat.assigneeId === memberId ||
          userChat.followerIds.includes(memberId)
        )
          return;

        setUserChats((prev) =>
          prev.filter((prevChat) => prevChat.id !== userChat.id),
        );
      }
    }

    if (ablyMessage.name === "updateEndUser") {
      const { user }: { user: EndUser } = ablyMessage.data;

      setEndUsers((prev) =>
        prev.map((prevUser) => (prevUser.id === user.id ? user : prevUser)),
      );
    }

    if (ablyMessage.name === "readEndUserChat") {
      const { session }: { session: Session } = ablyMessage.data;

      setSessions((prev) =>
        prev.map((prevSession) =>
          prevSession.id === session.id ? session : prevSession,
        ),
      );
    }

    if (ablyMessage.name === "createFollowUpForm") {
      const {
        userChat,
        currentMessage,
      }: { userChat: UserChat; currentMessage: Message } = ablyMessage.data;

      setUserChats((prev) =>
        prev.map((prevChat) =>
          prevChat.id === userChat.id ? userChat : prevChat,
        ),
      );
      setMessages((prev) => prev.concat(currentMessage));
    }
  });

  return <>{children}</>;
};
