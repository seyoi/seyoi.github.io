import localFont from "next/font/local";
import { Suspense } from "react";
import DatadogProvider from "@/common/components/DatadogProvider";
import GoogleAnalyticsProvider from "@/common/components/GoogleAnalyticsProvider";
import "@/common/styles/global.css";

const Pretendard = localFont({
  src: "../../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export default async function AppsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${Pretendard.className} ${Pretendard.variable}`}>
      <body>
        <Suspense>
          {children}
          <DatadogProvider />
          <GoogleAnalyticsProvider />
        </Suspense>
      </body>
    </html>
  );
}
