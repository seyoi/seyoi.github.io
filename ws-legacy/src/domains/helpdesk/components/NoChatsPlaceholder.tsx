export function NoChatsPlaceholder() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="221"
        height="147"
        viewBox="0 0 221 147"
        fill="none"
      >
        <circle cx="27" cy="31" r="3" fill="#D8D8D8" />
        <circle
          cx="215.5"
          cy="136.5"
          r="4.5"
          stroke="#D8D8D8"
          strokeWidth="2"
        />
        <path
          d="M178.5 1L178.5 5.76667"
          stroke="#D8D8D8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M178.5 9.2334L178.5 14.0001"
          stroke="#D8D8D8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M172 7.5L176.767 7.5"
          stroke="#D8D8D8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M180.233 7.5L185 7.5"
          stroke="#D8D8D8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M4.5 96L4.5 98.5667" stroke="#D8D8D8" strokeLinecap="round" />
        <path d="M4.5 100.434L4.5 103" stroke="#D8D8D8" strokeLinecap="round" />
        <path d="M1 99.5L3.56667 99.5" stroke="#D8D8D8" strokeLinecap="round" />
        <path
          d="M5.43347 99.5L8.00014 99.5"
          stroke="#D8D8D8"
          strokeLinecap="round"
        />
        <rect x="44" y="46" width="160" height="65" rx="8" fill="#F1F1F1" />
        <g filter="url(#filter0_d_552_2306)">
          <rect x="21" y="72" width="160" height="65" rx="8" fill="white" />
        </g>
        <rect x="37" y="111" width="101" height="4" rx="2" fill="#D9D9D9" />
        <rect x="37" y="98" width="57" height="4" rx="2" fill="#B8B8B8" />
        <rect x="65" y="59" width="39" height="4" rx="2" fill="#E2E2E2" />
        <defs>
          <filter
            id="filter0_d_552_2306"
            x="11"
            y="62"
            width="180"
            height="85"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.408759 0 0 0 0 0.520112 0 0 0 0 0.736268 0 0 0 0.15 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_552_2306"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_552_2306"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
      <div className="text-[16px] font-[500] text-[#757575]">
        아직 상담기록이 없습니다.
      </div>
    </div>
  );
}
