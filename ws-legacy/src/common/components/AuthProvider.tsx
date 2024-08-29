import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { nextAuthService } from "../libs/NextAuthService";

export default async function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const headerPathname = headersList.get("x-pathname");

  const session = await nextAuthService.getSession();

  if (!session) redirect(`/get-started?redirectTo=${headerPathname}`);

  return <>{children}</>;
}
