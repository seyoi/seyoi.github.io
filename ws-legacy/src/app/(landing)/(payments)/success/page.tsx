import { nextAuthService } from "@/common/libs/NextAuthService";
import { PaymentSuccessTemplate } from "@/domains/landing/components/PaymentSuccessTemplate";

export default async function PaymentsSuccessPage() {
  const session = await nextAuthService.getSession();

  return <PaymentSuccessTemplate session={session} />;
}
