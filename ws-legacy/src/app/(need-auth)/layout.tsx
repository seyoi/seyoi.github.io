import localFont from "next/font/local";
import { Suspense } from "react";
import AuthProvider from "@/common/components/AuthProvider";
import DatadogProvider from "@/common/components/DatadogProvider";
import GoogleAnalyticsProvider from "@/common/components/GoogleAnalyticsProvider";
import AlertContextProvider from "@/common/stores/AlertContext";
import PopUpContextProvider from "@/common/stores/PopUpContext";
import ModalContextProvider from "@/common/stores/ModalContext";
import SheetContextProvider from "@/common/stores/SheetContext";
import ImageGalleryModalContextProvider from "@/common/stores/ImageGalleryModalContext";
import "@/common/styles/global.css";

const Pretendard = localFont({
  src: "../../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export default async function NeedAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${Pretendard.className} ${Pretendard.variable}`}>
      <body>
        <Suspense>
          <AuthProvider>
            <AlertContextProvider>
              <PopUpContextProvider>
                <ModalContextProvider>
                  <SheetContextProvider>
                    <ImageGalleryModalContextProvider>
                      {children}
                    </ImageGalleryModalContextProvider>
                  </SheetContextProvider>
                </ModalContextProvider>
              </PopUpContextProvider>
            </AlertContextProvider>
          </AuthProvider>
          <DatadogProvider />
          <GoogleAnalyticsProvider />
        </Suspense>
      </body>
    </html>
  );
}
