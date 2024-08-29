import MyProfileForm from "@/domains/workspace/components/MyProfileForm";

export default async function SettingsMePage() {
  return (
    <div className="grid grid-rows-[90px,minmax(0,1fr)] overflow-x-auto">
      <div className="flex items-center gap-[12px] border-b border-gray-lightest p-[20px]">
        <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[12px] bg-gray-lighter">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <path
              d="M12 14.5V22.5H4C4 18.0817 7.58172 14.5 12 14.5ZM12 13.5C8.685 13.5 6 10.815 6 7.5C6 4.185 8.685 1.5 12 1.5C15.315 1.5 18 4.185 18 7.5C18 10.815 15.315 13.5 12 13.5ZM14.5946 19.3115C14.5327 19.0511 14.5 18.7794 14.5 18.5C14.5 18.2207 14.5327 17.949 14.5945 17.6886L13.6029 17.1161L14.6029 15.384L15.5952 15.9569C15.9883 15.5851 16.4676 15.3034 17 15.1449V14H19V15.1449C19.5324 15.3034 20.0116 15.5851 20.4047 15.9569L21.3971 15.3839L22.3972 17.116L21.4055 17.6885C21.4673 17.949 21.5 18.2207 21.5 18.5C21.5 18.7793 21.4673 19.051 21.4055 19.3114L22.3972 19.8839L21.3972 21.616L20.4048 21.043C20.0117 21.4149 19.5325 21.6966 19.0001 21.855V23H17.0001V21.8551C16.4677 21.6967 15.9884 21.415 15.5953 21.0431L14.603 21.6161L13.6029 19.884L14.5946 19.3115ZM18 17.5C17.4477 17.5 17 17.9477 17 18.5C17 19.0523 17.4477 19.5 18 19.5C18.5523 19.5 19 19.0523 19 18.5C19 17.9477 18.5523 17.5 18 17.5Z"
              fill="#5C5C5C"
            />
          </svg>
        </div>
        <div className="flex flex-col">
          <div className="text-lg">워크스페이스 내 프로필 설정</div>
          <div className="whitespace-nowrap text-sm text-gray-normal">
            워크스페이스 내에서 사용할 프로필을 수정해보세요.
          </div>
        </div>
      </div>
      <div className="flex h-full w-full items-center justify-center">
        <div className="w-[420px]">
          <MyProfileForm />
        </div>
      </div>
    </div>
  );
}
