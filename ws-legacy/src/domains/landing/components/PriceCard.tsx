import { PaymentPlanType } from "@prisma/client";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { Session } from "next-auth";
import {
  CustomError,
  serializeError,
  toCustomError,
} from "@/common/utils/customError";
import { validateUserPayments } from "@/domains/landing/actions/validateUserPayments";
import { useRouter } from "next/navigation";
import { requestSubscriptionStart } from "@/domains/landing/actions/requestSubscription";
import useFailRouter from "@/domains/landing/hooks/useFailRouter";
import { DemoForm } from "./DemoForm";

const clientKey = process.env.NEXT_PUBLIC_TOSS_LIVE_CLIENT_KEY!;

export function PriceCard({
  title,
  desc,
  price,
  plan,
  userPlan,
  session,
  feature,
}: PriceCardType) {
  const isEnterprise = title === "엔터프라이즈";
  const isSubscribe = userPlan !== PaymentPlanType.NO_PLAN;

  const userId = session?.user?.id;
  const email = session?.user?.email;

  // Split the price for the 엔터프라이즈 plan
  const priceParts = price.split("+");
  const mainPrice = priceParts[0];
  const additionalPrice = priceParts.length > 1 ? priceParts[1] : "";

  const failRouter = useFailRouter();
  const router = useRouter();

  const startSubscribe = async () => {
    if (userId && email) {
      let subscriptionData;

      try {
        // 중복 체크
        const validResult = await validateUserPayments(userId);
        const validData = validResult.result.data as { isValid: boolean };
        if (!validData?.isValid) {
          failRouter(toCustomError(validResult.error));
        }

        // 신규 구독 요청
        const requestSubscriptionRes = await requestSubscriptionStart(
          userId,
          email,
          plan!,
        );
        subscriptionData = requestSubscriptionRes.result.data as {
          customerKey: string;
          orderId: string;
        };

        if (requestSubscriptionRes.result.isSuccess) {
          // 토스 결제창 호출
          const tossPayments = await loadTossPayments(clientKey);
          await tossPayments.requestBillingAuth("카드", {
            customerKey: subscriptionData.customerKey,
            successUrl: `${process.env.NEXT_PUBLIC_APPLICATION_URL}/success?plan=${plan}&orderId=${subscriptionData.orderId}`,
            failUrl: `${process.env.NEXT_PUBLIC_APPLICATION_URL}/fail?orderId=${subscriptionData.orderId}`,
          });
        } else {
          failRouter(toCustomError(requestSubscriptionRes.error));
        }
      } catch (error) {
        failRouter(convertUnknownTossError(error, subscriptionData?.orderId));
      }
    } else {
      router.push("/get-started");
    }
  };

  return (
    <div
      className={`flex flex-col items-start rounded-[20px] border px-6 py-10 mobile:drop-shadow-blue ${title === "프로" && "bg-[#F3F5F7]"} ${title === "엔터프라이즈" && "bg-[#E6F0FF]"}`}
    >
      <div className="mx-auto flex flex-col items-center gap-2 mobile:order-1 mobile:mx-0 mobile:flex-row">
        <p className="text-lg text-black-normal">{title}</p>
        <span className="text-md text-gray-normal">{desc}</span>
      </div>

      <div className="my-[40px] w-[336px] rounded-xl border border-gray-lightest bg-white py-7 text-center mobile:order-2 mobile:my-4 mobile:w-full mobile:bg-blue-lightest mobile:px-5 mobile:py-4 mobile:text-start">
        {isEnterprise ? (
          <>
            <span className="text-lg text-black-light">약 </span>
            <span className="text-xl text-black-normal">{mainPrice}</span>
            <span className="text-lg text-black-light">+월</span>
            <span className="text-xl text-black-normal">
              {additionalPrice}~
            </span>
          </>
        ) : (
          <>
            <span className="text-lg text-black-light">월 </span>
            <span className="text-xl text-black-normal">{price}</span>
          </>
        )}
      </div>
      <div className="flex h-[300px] flex-col gap-4 mobile:order-4 mobile:mt-6 mobile:h-fit">
        {feature.map((item, index) => (
          <p key={index} className="flex items-center gap-3 text-boldmd">
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.3846 14L1 8.50008L3.15384 6.30011L6.3846 9.60006L12.8462 3L15 5.19997L6.3846 14Z"
                fill="#416BFF"
              />
            </svg>
            {item}
          </p>
        ))}
      </div>
      <div
        className={`mt-[40px] flex w-full flex-col items-center mobile:order-3 mobile:mt-0 ${isEnterprise ? "pt-0" : ""}`}
      >
        {isEnterprise ? (
          <DemoForm variant="blue" title="문의하기" />
        ) : (
          <button
            disabled={isSubscribe}
            onClick={() => startSubscribe()}
            className="group flex w-full items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-[#416BFF] to-[#3658D1] py-4 text-lg text-white-normal transition duration-700 ease-linear hover:from-[#416BFF] hover:to-[#89A3FF] hover:transition-all"
          >
            {isSubscribe
              ? userPlan === plan
                ? "구독중인 플랜입니다"
                : "다른 플랜을 구독중입니다"
              : "카드로 결제하기"}
            <svg
              width="15"
              height="10"
              viewBox="0 0 15 10"
              fill="none"
              className="transition-transform duration-300 ease-out group-hover:translate-x-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 5.0001H13.5M13.5 5.0001L10.0714 8.42868M13.5 5.0001L10.0714 1.57153"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

const convertUnknownTossError = (error: unknown, orderId?: string) => {
  if (error instanceof CustomError) {
    return error;
  }

  const parseError = error as SdkError;
  if (parseError?.code) {
    const parsedOrderId = parseError?.orderId ? parseError.orderId : orderId;

    return new CustomError(
      parseError.code,
      parseError?.message || serializeError(error),
      parsedOrderId ? { orderId: parsedOrderId } : undefined,
    );
  }

  return toCustomError(error);
};

type PriceCardType = {
  title: string;
  desc: string;
  price: string;
  plan: PaymentPlanType;
  userPlan: PaymentPlanType;
  session?: Session | null;
  feature: string[];
  payment?: () => void;
};

type SdkError = {
  code?: string;
  message?: string;
  orderId?: string;
};
