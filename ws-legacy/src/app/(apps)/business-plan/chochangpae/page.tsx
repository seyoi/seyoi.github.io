import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { nextAuthService } from "@/common/libs/NextAuthService";
import ChochangpaePageContainer from "./ChochanpaePageContainer";

export default async function ChochangpaePage() {
  const headersList = headers();
  const headerPathname = headersList.get("x-pathname");

  const session = await nextAuthService.getSession();

  if (!session) redirect(`/get-started?redirectTo=${headerPathname}`);

  return <ChochangpaePageContainer userId={session.user.id} />;
}
