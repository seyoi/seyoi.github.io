import AuthProvider from "@/common/components/AuthProvider";

export default async function NeedAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
    </>
  );
}
