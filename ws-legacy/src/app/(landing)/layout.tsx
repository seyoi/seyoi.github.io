import { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";
import DatadogProvider from "@/common/components/DatadogProvider";
import GoogleAnalyticsProvider from "@/common/components/GoogleAnalyticsProvider";
import EmbedPlugInScriptProvider from "@/common/components/EmbedPlugInScriptProvider";
import "@/common/styles/global.css";
import Script from "next/script";

const Pretendard = localFont({
  src: "../../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.docenty.ai/"),
  title: "Docenty - AI Chatbot For your website",
  description:
    "Docenty.ai is an AI-powered chatbot that helps your customers find the information they need.",
  verification: {
    google:
      "google-site-verification=i3ysVj3rUTjU6UgKUWlb3AKrgUOmPIc1DnLqlDxpwkQ",
    other: {
      "naver-site-verification": "a9932c55a98b4d6a6e12384662bfb332130f0e41",
    },
  },
  robots: {
    index: true,
    googleBot: {
      index: true,
    },
  },
  openGraph: {
    images: [
      {
        url: "/opengraph-image.png",
        alt: "docenty.ai og image",
        width: 1200,
        height: 600,
      },
    ],
  },
  twitter: {
    images: [
      {
        url: "/twitter-image.png",
        alt: "docenty.ai twitter image",
        width: 1200,
        height: 600,
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    url: "https://www.docenty.ai/",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "02-6269-2193",
        contactType: "Customer Service",
        areaServed: "KR",
      },
    ],
  };

  return (
    <html className={`${Pretendard.className} ${Pretendard.variable}`}>
      <Script
        id="json-LD"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <body>
        <Suspense>
          {children}
          <DatadogProvider />
          <GoogleAnalyticsProvider />
          <EmbedPlugInScriptProvider plugInKey="cly82tzge0001134mr4jqormc" />
        </Suspense>
      </body>
    </html>
  );
}
