import UserChatContextProvider from "@/domains/helpdesk/stores/UserChatContext";

export default function HelpDeskUserChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserChatContextProvider>
      <div className="grid grid-cols-[minmax(300px,1fr),300px]">{children}</div>
    </UserChatContextProvider>
  );
}
