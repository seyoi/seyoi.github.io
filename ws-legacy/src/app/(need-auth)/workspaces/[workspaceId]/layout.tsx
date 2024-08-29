import WorkspaceContextProvider from "@/domains/workspace/stores/WorkspaceContext";
import WorkspaceSidebar from "@/domains/workspace/components/WorkspaceSidebar";
import EmbedPlugInScriptProvider from "@/common/components/EmbedPlugInScriptProvider";

export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WorkspaceContextProvider>
      <div className="grid h-full grid-cols-[64px,minmax(0,1fr)]">
        <WorkspaceSidebar />
        {children}
      </div>
      <EmbedPlugInScriptProvider
        plugInKey="cly82w4rn0005134ml1vxte5s"
        bootOptions={{ hidePlugInButtonOnBoot: true }}
      />
    </WorkspaceContextProvider>
  );
}
