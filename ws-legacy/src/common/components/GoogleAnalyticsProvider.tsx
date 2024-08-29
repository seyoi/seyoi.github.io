"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID as string;
const GADS_TRACKING_ID = process.env.NEXT_PUBLIC_GADS_TRACKING_ID as string;

export default function GoogleAnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;

    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }, [pathname, searchParams]);

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${GA_TRACKING_ID}', ${
                        process.env.NODE_ENV === "production"
                          ? "{'debug_mode': true}"
                          : ""
                      });
                      gtag('config', '${GADS_TRACKING_ID}', ${
                        process.env.NODE_ENV === "production"
                          ? "{'debug_mode': true}"
                          : ""
                      });
                      gtag('config', 'AW-11469707361');
                    `,
        }}
      />
    </>
  );
}
