import { nextAuthService } from "@/common/libs/NextAuthService";

const handler = nextAuthService.getHandler();

export { handler as GET, handler as POST };
