import HelpdeskContextProvider from "@/domains/helpdesk/stores/HelpdeskContext";
import HelpdeskSidebar from "@/domains/helpdesk/components/HelpdeskSidebar";

export default function HelpDeskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HelpdeskContextProvider>
      <div className="grid h-full grid-cols-[550px,minmax(0,1fr)]">
        <HelpdeskSidebar />
        {children}
      </div>
    </HelpdeskContextProvider>
  );
}
