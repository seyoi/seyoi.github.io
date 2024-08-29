"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getPrivateFileSignedUrlInBin } from "@/domains/helpdesk/actions/getPrivateFileSignedUrlInBin";
import type { QaNode } from "@/server/types/FAQ";

export default function FAQList({
  nodes,
}: {
  nodes: (QaNode | undefined)[] | undefined;
}) {
  return (
    <div className="flex min-h-0 flex-col overflow-y-auto bg-blue-lighter">
      {nodes?.map((node, index) => (
        <FAQNode key={node?.qa_uid} node={node} index={index} />
      ))}
    </div>
  );
}

const FAQNode = ({ node, index }: { node?: QaNode; index: number }) => {
  const [signedUrls, setSignedUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchSignedUrls = async () => {
      const imagePaths = node?.contents?.[0].images_path;
      if (imagePaths) {
        const signedUrls: string[] = [];

        for (const imagePath of imagePaths) {
          const replacedPath = imagePath.replace("https://bin.docenty.ai/", "");
          const signedUrl = await getPrivateFileSignedUrlInBin({
            path: replacedPath,
          });

          signedUrls.push(signedUrl);
        }

        setSignedUrls(signedUrls);
      }
    };
    fetchSignedUrls();
  }, [node?.contents]);

  return (
    <div className="p-[20px]">
      <div className="flex flex-col gap-[10px] rounded-[12px] bg-blue-lighter p-[20px] shadow-card">
        <div className="flex h-[20px] w-[20px] items-center justify-center rounded-[20px] bg-yellow-dark p-[4px] text-sm">
          {index}
        </div>
        <div className="flex flex-col gap-[8px] rounded-[12px] border border-gray-lighter bg-white-normal p-[12px]">
          <div className="flex items-center gap-[8px]">
            <div className="flex items-center gap-[4px] rounded-[4px] bg-green-light p-[4px]">
              <div className="flex h-[16px] w-[16px] items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M10.0133 13.0131C8.45267 13.5038 6.68 13.4171 5.13333 12.6665L2 13.3331L2.86667 10.7331C1.31733 8.44181 1.916 5.48515 4.26667 3.81715C6.61733 2.14981 9.99333 2.28648 12.1633 4.13715C13.2627 5.07515 13.88 6.30581 13.9913 7.57181M12.6667 14.6665V14.6731M12.6667 12.6665C12.9655 12.6655 13.2554 12.5643 13.49 12.3791C13.7245 12.1939 13.8902 11.9353 13.9604 11.6448C14.0306 11.3543 14.0013 11.0487 13.8772 10.7768C13.7531 10.5049 13.5414 10.2825 13.276 10.1452C13.0108 10.0093 12.7074 9.96717 12.4152 10.0256C12.123 10.0841 11.8592 10.2397 11.6667 10.4671"
                    stroke="#0F7134"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-sm text-green-dark">질문</div>
            </div>
            <div className="text-md">{node?.question}</div>
          </div>
          <div className="flex items-center gap-[8px]">
            <div className="flex items-center gap-[4px] rounded-[4px] bg-red-light p-[4px]">
              <div className="flex h-[16px] w-[16px] items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M4.33333 4.99935H9.66667M4.33333 7.66602H8.33333M6.32667 11.8033L4.33333 12.9993V10.9993H3C2.46957 10.9993 1.96086 10.7886 1.58579 10.4136C1.21071 10.0385 1 9.52978 1 8.99935V3.66602C1 3.13558 1.21071 2.62687 1.58579 2.2518C1.96086 1.87673 2.46957 1.66602 3 1.66602H11C11.5304 1.66602 12.0391 1.87673 12.4142 2.2518C12.7893 2.62687 13 3.13558 13 3.66602V7.66602M9 11.666L10.3333 12.9993L13 10.3327"
                    stroke="#292929"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-sm">답변</div>
            </div>
            <div className="text-md">{node?.contents?.[0].answer}</div>
          </div>
          <div className="flex items-center gap-[8px]">
            {signedUrls.map((signedUrl) => (
              <div
                key={signedUrl}
                className="relative flex h-[64px] w-[64px] items-center justify-center overflow-hidden rounded-[12px] shadow-card"
              >
                <Image
                  className="object-cover"
                  src={signedUrl}
                  alt="faq image"
                  fill
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
