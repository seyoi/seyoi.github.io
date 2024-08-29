import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { nextAuthService } from "@/common/libs/NextAuthService";
import YechangepaeContainer from "./YechangpaeContainer";

export default async function ChoChangpaePage() {
  const headersList = headers();
  const headerPathname = headersList.get("x-pathname");

  const session = await nextAuthService.getSession();

  if (!session) redirect(`/get-started?redirectTo=${headerPathname}`);

  return <YechangepaeContainer userId={session.user.id} />;
}
