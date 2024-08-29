import { useRouter } from "next/navigation";
import { CustomError, CustomErrorType } from "@/common/utils/customError";

const useFailRouter = () => {
  const router = useRouter();

  const route = (error: CustomError | CustomErrorType) => {
    let url = `${process.env.NEXT_PUBLIC_APPLICATION_URL}/fail?code=${error.code}&message=${error.message}`;
    if (error.data?.orderId) {
      url += `&orderId=${error.data.orderId}`;
    }

    router.replace(url);
  };

  return route;
};

export default useFailRouter;
