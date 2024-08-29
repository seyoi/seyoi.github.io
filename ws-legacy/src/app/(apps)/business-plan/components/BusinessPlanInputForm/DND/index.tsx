"use client";

import { useDND } from "./useDND";
import { LoadingSpinner } from "../../../../../../common/components/LoadingSpinner";

export function DND() {
  const {
    isDrag,
    inputRef,
    files,
    handleDeleteFile,
    handleFileDrop,
    handleFileChange,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleLabelKeyDown,
  } = useDND();

  return (
    <div className="flex flex-col">
      <label
        htmlFor="dnd"
        className="flex min-h-[12.5rem] flex-col items-center justify-center rounded-[4px] border border-dashed border-[#0D0B33] bg-[#F7F9FC] p-[2rem] transition-colors hover:cursor-pointer hover:bg-[#FFFFFF]"
        style={{ backgroundColor: isDrag ? "#1fd8b611" : "#F7F9FC" }}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleFileDrop}
        tabIndex={0}
        onKeyDown={handleLabelKeyDown}
      >
        <input
          ref={inputRef}
          id="dnd"
          type="file"
          accept="application/pdf, .hwp, .hwpx"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
        {!isDrag && (
          <div className="flex select-none flex-col items-center justify-center gap-[0.25rem]">
            {/* <DragIcon className="shrink-0" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="31"
              viewBox="0 0 30 31"
              fill="none"
            >
              <path
                d="M13.75 20.5V10.3125L10.5 13.5625L8.75 11.75L15 5.5L21.25 11.75L19.5 13.5625L16.25 10.3125V20.5H13.75ZM7.5 25.5C6.8125 25.5 6.22396 25.2552 5.73438 24.7656C5.24479 24.276 5 23.6875 5 23V19.25H7.5V23H22.5V19.25H25V23C25 23.6875 24.7552 24.276 24.2656 24.7656C23.776 25.2552 23.1875 25.5 22.5 25.5H7.5Z"
                fill="#0D0B33"
              />
            </svg>{" "}
            <p className="text-[1rem] font-[500] text-[#0D0B33]">
              드래그 앤 드롭, 클릭으로 10개 이내의 파일을 업로드 해주세요
            </p>
          </div>
        )}
        {isDrag && (
          <div className="flex select-none flex-col items-center justify-center gap-[0.25rem]">
            {/* <DropIcon className="shrink-0" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="31"
              viewBox="0 0 30 31"
              fill="none"
            >
              <g clip-path="url(#clip0_84_2920)">
                <path
                  d="M6.25 26.75C5.5625 26.75 4.97396 26.5052 4.48438 26.0156C3.99479 25.526 3.75 24.9375 3.75 24.25V11.75C3.75 11.0625 3.99479 10.474 4.48438 9.98438C4.97396 9.49479 5.5625 9.25 6.25 9.25H11.25V11.75H6.25V24.25H23.75V11.75H18.75V9.25H23.75C24.4375 9.25 25.026 9.49479 25.5156 9.98438C26.0052 10.474 26.25 11.0625 26.25 11.75V24.25C26.25 24.9375 26.0052 25.526 25.5156 26.0156C25.026 26.5052 24.4375 26.75 23.75 26.75H6.25ZM15 20.5L10 15.5L11.75 13.75L13.75 15.7188V0.5H16.25V15.7188L18.25 13.75L20 15.5L15 20.5Z"
                  fill="#1FD8B6"
                />
              </g>
              <defs>
                <clipPath id="clip0_84_2920">
                  <rect
                    width="30"
                    height="30"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            <p className="text-[1rem] font-[500] text-[#1FD8B6]">Drop here</p>
          </div>
        )}
      </label>
      <div
        className={`${
          files.length === 0
            ? "m-0 h-0 p-0 opacity-0"
            : "mt-[1.25rem] p-[1rem] opacity-100 transition-opacity duration-500"
        } flex flex-col gap-[0.25rem] rounded-[0.25rem] border border-[#0D0B33] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)]`}
      >
        {files.map(({ id, type, name, size, progress, filePath, status }) => (
          <div
            key={id}
            className="relative flex gap-[0.5rem] p-[0.5rem] hover:bg-[#F7F9FC]"
          >
            <div className="flex min-w-[77px] items-center rounded-[0.25rem] bg-[#A2AAB8] px-[0.75rem] py-[0.5rem] text-[#0D0B33]">
              {/* <DocumentIcon className="shrink-0" /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M6.66659 15.5003H13.3333V13.8337H6.66659V15.5003ZM6.66659 12.167H13.3333V10.5003H6.66659V12.167ZM4.99992 18.8337C4.54159 18.8337 4.14922 18.6705 3.82284 18.3441C3.49645 18.0177 3.33325 17.6253 3.33325 17.167V3.83366C3.33325 3.37533 3.49645 2.98296 3.82284 2.65658C4.14922 2.33019 4.54159 2.16699 4.99992 2.16699H11.6666L16.6666 7.16699V17.167C16.6666 17.6253 16.5034 18.0177 16.177 18.3441C15.8506 18.6705 15.4583 18.8337 14.9999 18.8337H4.99992ZM10.8333 8.00033V3.83366H4.99992V17.167H14.9999V8.00033H10.8333Z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-[0.875rem]">{type.toUpperCase()}</span>
            </div>
            <div className="flex flex-1 flex-col gap-[0.25rem]">
              <div className="flex items-center justify-between">
                <span className="text-[1rem] text-[#0D0B33]">{name}</span>
                <span className="text-[0.8125rem] text-[#0D0B33]">{size}</span>
              </div>
              <div className="relative h-[0.75rem] rounded-[6.25rem] bg-[#E7E7E7]">
                <div
                  className="absoulte left-0 top-0 h-full w-1/2 rounded-[6.25rem] bg-[#1FD8B6] transition-[width] duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <button
              type="button"
              className="flex items-center justify-center rounded-[0.5rem] bg-[#FA5252] px-[1rem] py-[0.5rem] text-[1rem] font-[600] text-[#0D0B33]"
              onClick={() => handleDeleteFile({ fileID: id, status, filePath })}
            >
              {status === "DELETING" && (
                <LoadingSpinner
                  color="#FFFFFF"
                  size="20px"
                  borderWidth="3.5px"
                />
              )}
              {(status === "UPLOADING" || status === "UPLOADED") && "제거"}
            </button>
            <div
              className={`${
                status === "UPLOADING" ? "block" : "hidden"
              } absolute left-0 top-0 z-10 h-full w-full bg-[#ffffffbf]`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
