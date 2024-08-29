"use client";

import Link from "next/link";
import { useContext } from "react";
import { AlertContext } from "@/common/stores/AlertContext";

export default function PlugInButtonInstallForm({
  plugInId,
}: {
  plugInId: string;
}) {
  const externalLink = `${process.env.NEXT_PUBLIC_APPLICATION_URL}/plug-in/${plugInId}`;
  const script = String.raw`<script>
  (function () { const w = window; const dcty = function () { dcty.c(arguments); }; dcty.params = []; dcty.c = function (args) { dcty.params.push(args); }; w.Docenty = dcty; function l() { if (w.DocentyInitialized) { return; } w.DocentyInitialized = true; if (!document.getElementById('dcty-plug-in')) { var n = document.createElement('div'); (n.id = 'dcty-plug-in'), document.body.appendChild(n); } var e; var i = document.getElementById('dcty-plug-in'); i.style.position = "relative"; i.style.zIndex = 9999; i.innerHTML += '<div id="dcty-plug-in-button-wrapper"><\/div><div id="dcty-plug-in-iframe-wrapper" style="display:none;"><iframe id="dcty-plug-in-iframe" title="Docenty chat" style="position:relative!important;height:100%!important;width:100%!important;border:none!important;"></iframe></div>'; var t = document.getElementById('dcty-plug-in-iframe'); (r = !1), (o = function () { var e = t.contentDocument || t.contentWindow.document; e.open(), e.write('<!DOCTYPE html><script async type="text/javascript" src="https://cdn.docenty.ai/dcty-plug-in.js" charset="UTF-8">'+'<\/script>',), e.write('<html lang="en"><body><div id="dcty-root"></div><\/body><\/html>',), e.close(), (r = !0); }); t.onload || o(), (t.onload = function () { r || o(); }); } if (document.readyState === 'complete') { l(); } else { w.addEventListener('DOMContentLoaded', l); w.addEventListener('load', l); } })();

  Docenty({
    plugInKey: '${plugInId}',
  });
</script>`;

  const { addAlert } = useContext(AlertContext);

  const handleClickCopyExternalLink = async () => {
    await window.navigator.clipboard.writeText(externalLink);
    addAlert({ type: "ok", text: "클립보드에 복사했습니다." });
  };

  const handleClickCopyScript = async () => {
    await window.navigator.clipboard.writeText(script);
    addAlert({ type: "ok", text: "클립보드에 복사했습니다." });
  };

  return (
    <div className="flex flex-col gap-[8px] rounded-[12px] border border-gray-lighter bg-white-normal p-[20px]">
      <div className="text-lg">챗봇 버튼 설치</div>
      <div className="flex flex-col gap-[12px]">
        <div className="flex flex-col gap-[8px]">
          <div className="flex flex-col">
            <div className="text-md">챗봇 외부 링크</div>
            <div className="text-sm text-gray-normal">
              외부 링크로 실제처럼 사용해보고 공유해보세요.
            </div>
          </div>
          <div className="group flex max-w-[600px] items-center rounded-[8px] border-[1.5px] border-gray-lighter bg-blue-lighter px-[12px] py-[8px] text-md placeholder:text-gray-light">
            <button
              type="button"
              className="flex items-center justify-center p-[4px]"
              onClick={handleClickCopyExternalLink}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
              >
                <path
                  d="M11.5 12V13.75C11.5 14.2141 11.3156 14.6592 10.9874 14.9874C10.6592 15.3156 10.2141 15.5 9.75 15.5H2.75C2.28587 15.5 1.84075 15.3156 1.51256 14.9874C1.18437 14.6592 1 14.2141 1 13.75V6.75C1 6.28587 1.18437 5.84075 1.51256 5.51256C1.84075 5.18437 2.28587 5 2.75 5H4.5M4.5 3.25C4.5 2.78587 4.68437 2.34075 5.01256 2.01256C5.34075 1.68437 5.78587 1.5 6.25 1.5H13.25C13.7141 1.5 14.1592 1.68437 14.4874 2.01256C14.8156 2.34075 15 2.78587 15 3.25V10.25C15 10.7141 14.8156 11.1592 14.4874 11.4874C14.1592 11.8156 13.7141 12 13.25 12H6.25C5.78587 12 5.34075 11.8156 5.01256 11.4874C4.68437 11.1592 4.5 10.7141 4.5 10.25V3.25Z"
                  stroke="#A6A6A6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <input
              className="flex-1"
              placeholder="Docenty Bot"
              disabled
              value={externalLink}
            />
            <Link
              href={externalLink}
              target="_blank"
              className="trainsition-[visibility] invisible flex items-center justify-center rounded-[4px] bg-gray-normal p-[4px] text-white-normal group-hover:visible"
            >
              새창으로 열기
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-[8px]">
          <div className="flex flex-col">
            <div className="text-md">챗봇 설치</div>
            <div className="text-sm text-gray-normal">
              {`아래 스크립트를 적용할 사이트의 테그 </body> 안에 삽입해주세요.`}
            </div>
          </div>
          <div className="relative flex max-w-[600px] rounded-[8px] border-[1.5px] border-gray-lighter bg-blue-lighter px-[12px] py-[8px] text-md placeholder:text-gray-light">
            <div className="overflow-x-auto">
              <pre>{script}</pre>
            </div>
            <div className="absolute bottom-[12px] right-[12px]">
              <button
                type="button"
                className="flex items-center justify-center p-[4px]"
                onClick={handleClickCopyScript}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                >
                  <path
                    d="M11.5 12V13.75C11.5 14.2141 11.3156 14.6592 10.9874 14.9874C10.6592 15.3156 10.2141 15.5 9.75 15.5H2.75C2.28587 15.5 1.84075 15.3156 1.51256 14.9874C1.18437 14.6592 1 14.2141 1 13.75V6.75C1 6.28587 1.18437 5.84075 1.51256 5.51256C1.84075 5.18437 2.28587 5 2.75 5H4.5M4.5 3.25C4.5 2.78587 4.68437 2.34075 5.01256 2.01256C5.34075 1.68437 5.78587 1.5 6.25 1.5H13.25C13.7141 1.5 14.1592 1.68437 14.4874 2.01256C14.8156 2.34075 15 2.78587 15 3.25V10.25C15 10.7141 14.8156 11.1592 14.4874 11.4874C14.1592 11.8156 13.7141 12 13.25 12H6.25C5.78587 12 5.34075 11.8156 5.01256 11.4874C4.68437 11.1592 4.5 10.7141 4.5 10.25V3.25Z"
                    stroke="#A6A6A6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
