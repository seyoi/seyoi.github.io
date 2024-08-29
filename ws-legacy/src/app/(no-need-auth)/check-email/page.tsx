import Link from "next/link";

export default function CheckEmailPage({
  searchParams,
}: {
  searchParams: { email: string };
}) {
  const { email } = searchParams;

  return (
    <div className="flex flex-col gap-[80px]">
      <div className="mx-auto w-[min(1200px,100%)] p-[16px]">
        <div className="flex">
          <Link href="/">
            <svg
              width="151"
              height="34"
              viewBox="0 0 151 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8197 17.8477H14.2742C14.0189 17.8477 13.812 18.0546 13.812 18.3099V20.8122C13.812 21.0675 14.0189 21.2745 14.2742 21.2745H15.8197C16.075 21.2745 16.282 21.0675 16.282 20.8122V18.3099C16.282 18.0546 16.075 17.8477 15.8197 17.8477Z"
                fill="#416BFF"
              />
              <path
                d="M21.3485 17.8477H19.8031C19.5478 17.8477 19.3408 18.0546 19.3408 18.3099V20.8122C19.3408 21.0675 19.5478 21.2745 19.8031 21.2745H21.3485C21.6039 21.2745 21.8108 21.0675 21.8108 20.8122V18.3099C21.8108 18.0546 21.6039 17.8477 21.3485 17.8477Z"
                fill="#416BFF"
              />
              <path
                d="M31.274 18.1489H30.2231C29.8334 16.2486 28.8577 14.3726 27.3096 12.8272C27.3096 12.8272 23.9984 9.03213 18.8165 8.58597C18.803 8.58597 18.7896 8.58597 18.7761 8.58328C18.631 8.57253 18.4859 8.56178 18.338 8.55372C18.1687 8.54566 17.9994 8.54297 17.8301 8.54297C17.6607 8.54297 17.4887 8.54834 17.3221 8.55372C17.1743 8.5591 17.0291 8.56985 16.884 8.58328C16.8706 8.58328 16.8544 8.58328 16.841 8.58597C11.6591 9.03213 8.35319 12.8272 8.35319 12.8272C6.80776 14.3726 5.82943 16.2486 5.43971 18.1489H4.38075C3.74376 18.1489 3.22504 18.6649 3.22504 19.3046V22.1428C3.22504 22.7798 3.74108 23.2985 4.38075 23.2985H5.29457C5.65204 26.3222 8.22149 28.6686 11.3419 28.6686H17.9644L25.8045 32.9071C27.2371 33.8209 29.1158 32.7915 29.1158 31.0929V26.341C29.7904 25.4836 30.2392 24.4408 30.3736 23.3012H31.2767C31.9137 23.3012 32.4324 22.7852 32.4324 22.1455V19.3073C32.4324 18.6703 31.9164 18.1515 31.2767 18.1515L31.274 18.1489ZM26.1835 22.8792C26.1835 23.8791 25.3745 24.6881 24.3746 24.6881H24.2429V27.1419C24.2429 27.3731 23.9876 27.5128 23.7941 27.3865L19.6335 24.6881H11.2801C10.2803 24.6881 9.47128 23.8791 9.47128 22.8792V16.9233C9.47128 15.9234 10.2803 15.1144 11.2801 15.1144H24.3746C25.3745 15.1144 26.1835 15.9234 26.1835 16.9233V22.8792Z"
                fill="#416BFF"
              />
              <path
                d="M14.1861 7.95094C15.0005 7.68754 15.8874 7.49403 16.8389 7.41071C16.8523 7.41071 16.8684 7.41071 16.8819 7.40802C17.027 7.39727 17.1721 7.38652 17.32 7.37846C17.4893 7.37039 17.6586 7.36771 17.8279 7.36771C17.9973 7.36771 18.1693 7.37308 18.3359 7.37846C18.4837 7.38383 18.6289 7.39458 18.774 7.40802C18.7875 7.40802 18.8009 7.40802 18.8143 7.41071C19.7631 7.49134 20.65 7.68754 21.4671 7.95094C21.2575 6.34638 20.0157 5.06703 18.4273 4.80632V3.20375C19.0455 2.96186 19.4863 2.3625 19.4863 1.65832C19.4863 0.741808 18.7445 0 17.8279 0C16.9114 0 16.1696 0.741808 16.1696 1.65832C16.1696 2.3625 16.6077 2.96186 17.2286 3.20375V4.80632C15.6401 5.06703 14.3957 6.34638 14.1888 7.95094H14.1861Z"
                fill="#416BFF"
              />
              <path
                d="M41.668 26.7585V6.96167H48.7227C50.7005 6.96167 52.4095 7.35815 53.8496 8.15112C55.2897 8.93498 56.3926 10.0697 57.1582 11.5554C57.9329 13.0411 58.3203 14.8002 58.3203 16.8328C58.3203 18.8835 57.9329 20.6563 57.1582 22.1511C56.3835 23.6368 55.2715 24.7761 53.8223 25.5691C52.373 26.3621 50.6458 26.7585 48.6406 26.7585H41.668ZM48.4766 23.2312C50.3906 23.2312 51.8262 22.7117 52.7832 21.6726C53.7402 20.6335 54.2188 19.0203 54.2188 16.8328C54.2188 14.6635 53.7402 13.0639 52.7832 12.0339C51.8353 11.004 50.4089 10.489 48.5039 10.489H45.7695V23.2312H48.4766ZM67.8906 27.0593C66.4141 27.0593 65.1289 26.7403 64.0352 26.1023C62.9414 25.4643 62.0983 24.5665 61.5059 23.4089C60.9134 22.2423 60.6172 20.8979 60.6172 19.3757C60.6172 17.8536 60.9089 16.5138 61.4922 15.3562C62.0846 14.1986 62.9277 13.3054 64.0215 12.6765C65.1243 12.0385 66.4141 11.7195 67.8906 11.7195C69.3672 11.7195 70.6569 12.0385 71.7598 12.6765C72.8626 13.3054 73.7103 14.1986 74.3027 15.3562C74.8952 16.5138 75.1914 17.8536 75.1914 19.3757C75.1914 20.8979 74.8952 22.2423 74.3027 23.4089C73.7103 24.5665 72.8626 25.4643 71.7598 26.1023C70.6569 26.7403 69.3672 27.0593 67.8906 27.0593ZM67.918 23.9148C68.5924 23.9148 69.1667 23.7234 69.6406 23.3406C70.1146 22.9486 70.4701 22.4109 70.707 21.7273C70.944 21.0437 71.0625 20.2598 71.0625 19.3757C71.0625 18.4916 70.944 17.7078 70.707 17.0242C70.4701 16.3315 70.1146 15.7891 69.6406 15.3972C69.1667 15.0053 68.5924 14.8093 67.918 14.8093C67.2344 14.8093 66.651 15.0053 66.168 15.3972C65.694 15.7891 65.334 16.3315 65.0879 17.0242C64.8418 17.7078 64.7188 18.4916 64.7188 19.3757C64.7188 20.2507 64.8418 21.0346 65.0879 21.7273C65.334 22.4109 65.694 22.9486 66.168 23.3406C66.651 23.7234 67.2344 23.9148 67.918 23.9148ZM84.4062 27.0593C82.9206 27.0593 81.6263 26.7358 80.5234 26.0886C79.4297 25.4415 78.5911 24.5391 78.0078 23.3816C77.4245 22.224 77.1328 20.8888 77.1328 19.3757C77.1328 17.8627 77.4245 16.532 78.0078 15.3835C78.6003 14.226 79.4434 13.3282 80.5371 12.6902C81.64 12.0431 82.9297 11.7195 84.4062 11.7195C85.6732 11.7195 86.7943 11.9519 87.7695 12.4167C88.7448 12.8816 89.5104 13.5424 90.0664 14.3992C90.6315 15.2468 90.9414 16.2312 90.9961 17.3523H87.1953C87.0677 16.5958 86.7669 15.9942 86.293 15.5476C85.819 15.0919 85.2083 14.864 84.4609 14.864C83.8138 14.864 83.2441 15.0417 82.752 15.3972C82.2689 15.7436 81.8952 16.254 81.6309 16.9285C81.3665 17.6029 81.2344 18.4005 81.2344 19.321C81.2344 20.269 81.3665 21.0802 81.6309 21.7546C81.8952 22.4291 82.2689 22.9441 82.752 23.2996C83.235 23.655 83.8047 23.8328 84.4609 23.8328C85.181 23.8328 85.7871 23.6186 86.2793 23.1902C86.7715 22.7618 87.0768 22.1557 87.1953 21.3718H90.9961C90.9323 22.4929 90.627 23.4819 90.0801 24.3386C89.5332 25.1954 88.7721 25.8653 87.7969 26.3484C86.8307 26.8223 85.7005 27.0593 84.4062 27.0593ZM100.238 27.0593C98.7344 27.0593 97.431 26.7494 96.3281 26.1296C95.2344 25.5098 94.3913 24.6257 93.7988 23.4773C93.2064 22.3197 92.9102 20.9617 92.9102 19.4031C92.9102 17.8809 93.2018 16.5411 93.7852 15.3835C94.3776 14.2169 95.2161 13.3145 96.3008 12.6765C97.3854 12.0385 98.6432 11.7195 100.074 11.7195C101.405 11.7195 102.594 12.002 103.643 12.5671C104.7 13.1231 105.529 13.9662 106.131 15.0964C106.742 16.2266 107.047 17.6075 107.047 19.239V20.3875H96.9023C96.9023 21.1257 97.0391 21.7683 97.3125 22.3152C97.5951 22.8621 97.9915 23.2859 98.502 23.5867C99.0215 23.8783 99.6276 24.0242 100.32 24.0242C100.986 24.0242 101.56 23.892 102.043 23.6277C102.526 23.3542 102.872 22.9851 103.082 22.5203H106.938C106.746 23.4317 106.354 24.2292 105.762 24.9128C105.169 25.5964 104.399 26.1251 103.451 26.4988C102.512 26.8725 101.441 27.0593 100.238 27.0593ZM103.219 17.8445C103.219 17.252 103.087 16.7234 102.822 16.2585C102.567 15.7846 102.207 15.4154 101.742 15.1511C101.277 14.8868 100.749 14.7546 100.156 14.7546C99.5547 14.7546 99.0078 14.8914 98.5156 15.1648C98.0326 15.4382 97.6452 15.8119 97.3535 16.2859C97.071 16.7598 96.9206 17.2794 96.9023 17.8445H103.219ZM113.637 26.7585H109.59V11.9109H113.445V14.5085H113.609C113.956 13.6335 114.516 12.95 115.291 12.4578C116.066 11.9656 116.991 11.7195 118.066 11.7195C119.096 11.7195 119.999 11.9428 120.773 12.3894C121.548 12.836 122.145 13.4832 122.564 14.3308C122.984 15.1694 123.189 16.1583 123.18 17.2976V26.7585H119.16V18.0085C119.16 17.0971 118.923 16.3816 118.449 15.8621C117.975 15.3425 117.319 15.0828 116.48 15.0828C115.615 15.0828 114.922 15.3562 114.402 15.9031C113.892 16.45 113.637 17.2065 113.637 18.1726V26.7585ZM134.145 14.946H131.355V22.1921C131.355 22.739 131.474 23.1218 131.711 23.3406C131.948 23.5593 132.294 23.6778 132.75 23.696C133.333 23.696 133.871 23.6687 134.363 23.614V26.8132C133.88 26.9044 133.16 26.95 132.203 26.95C130.681 26.95 129.482 26.599 128.607 25.8972C127.732 25.1954 127.299 24.1518 127.309 22.7664V14.946H125.258V11.9109H127.309V8.3562H131.355V11.9109H134.145V14.946ZM139.066 32.3367C138.219 32.3367 137.535 32.3093 137.016 32.2546V29.1101C137.708 29.1466 138.255 29.1648 138.656 29.1648C138.975 29.1648 139.24 29.1375 139.449 29.0828C139.668 29.0281 139.873 28.9005 140.064 28.7C140.265 28.4994 140.443 28.1986 140.598 27.7976L140.844 27.1687L135.512 11.9109H139.75L142.867 22.8484H143.031L146.176 11.9109H150.469L144.672 28.3992C144.225 29.6661 143.555 30.6368 142.662 31.3113C141.769 31.9949 140.57 32.3367 139.066 32.3367Z"
                fill="#0D0B33"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className="mx-auto flex w-[min(500px,100%)] flex-col">
        <div className="flex flex-col gap-[44px]">
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="112"
              height="113"
              viewBox="0 0 112 113"
              fill="none"
            >
              <circle
                cx="56"
                cy="56.5173"
                r="56"
                fill="#416BFF"
                fillOpacity="0.12"
              />
              <circle
                cx="56.5"
                cy="56.0173"
                r="46.5"
                fill="#416BFF"
                fillOpacity="0.3"
              />
              <circle cx="56" cy="56.5173" r="36" fill="#416BFF" />
              <path
                d="M56 68.3997H44.3333C43.4493 68.3997 42.6014 68.0402 41.9763 67.4004C41.3512 66.7606 41 65.8928 41 64.9879V47.9291M41 47.9291C41 47.0242 41.3512 46.1564 41.9763 45.5166C42.6014 44.8768 43.4493 44.5173 44.3333 44.5173H67.6667C68.5507 44.5173 69.3986 44.8768 70.0237 45.5166C70.6488 46.1564 71 47.0242 71 47.9291M41 47.9291L56 58.1644L71 47.9291M71 47.9291V60.7232"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <mask id="path-5-inside-1_812_1188" fill="white">
                <path d="M59.291 65.7547C58.9032 65.6252 58.9001 65.4164 59.299 65.2832L73.4649 60.5553C73.8571 60.4244 74.082 60.6442 73.9722 61.0294L69.9248 75.2133C69.8127 75.606 69.5866 75.6196 69.4208 75.2463L66.7531 69.2361L71.2063 63.2908L65.2687 67.7498L59.291 65.7547Z" />
              </mask>
              <path
                d="M59.291 65.7547C58.9032 65.6252 58.9001 65.4164 59.299 65.2832L73.4649 60.5553C73.8571 60.4244 74.082 60.6442 73.9722 61.0294L69.9248 75.2133C69.8127 75.606 69.5866 75.6196 69.4208 75.2463L66.7531 69.2361L71.2063 63.2908L65.2687 67.7498L59.291 65.7547Z"
                fill="white"
              />
              <path
                d="M59.291 65.7547L59.6076 64.8061L59.6076 64.8061L59.291 65.7547ZM59.299 65.2832L58.9824 64.3347L58.9824 64.3347L59.299 65.2832ZM73.4649 60.5553L73.7815 61.5038L73.7815 61.5038L73.4649 60.5553ZM73.9722 61.0294L74.9338 61.3038L74.9338 61.3036L73.9722 61.0294ZM69.9248 75.2133L70.8864 75.4877L69.9248 75.2133ZM69.4208 75.2463L68.5068 75.652L68.5068 75.652L69.4208 75.2463ZM66.7531 69.2361L65.9527 68.6365L65.6012 69.1058L65.8391 69.6418L66.7531 69.2361ZM71.2063 63.2908L72.0067 63.8904L70.6058 62.4912L71.2063 63.2908ZM65.2687 67.7498L64.9521 68.6983L65.4497 68.8644L65.8691 68.5494L65.2687 67.7498ZM59.6076 64.8061C59.573 64.7945 59.6256 64.8054 59.7068 64.872C59.7837 64.9351 60.0027 65.1517 60 65.5276C59.9973 65.9009 59.7778 66.1124 59.7047 66.1717C59.626 66.2354 59.577 66.2447 59.6156 66.2318L58.9824 64.3347C58.8216 64.3884 58.6233 64.4737 58.4452 64.618C58.2726 64.758 58.0033 65.0547 58 65.5131C57.9967 65.974 58.2642 66.2754 58.4383 66.4183C58.6167 66.5646 58.8152 66.6501 58.9744 66.7032L59.6076 64.8061ZM59.6156 66.2318L73.7815 61.5038L73.1483 59.6067L58.9824 64.3347L59.6156 66.2318ZM73.7815 61.5038C73.7776 61.5051 73.7174 61.5252 73.6154 61.5139C73.5062 61.5019 73.3541 61.4527 73.2189 61.3247C73.0836 61.1964 73.0253 61.046 73.0073 60.9342C72.9903 60.8297 73.0079 60.7645 73.0105 60.7551L74.9338 61.3036C75.0414 60.9266 75.0666 60.3202 74.5946 59.8729C74.1241 59.427 73.5207 59.4824 73.1483 59.6067L73.7815 61.5038ZM73.0106 60.755L68.9632 74.9389L70.8864 75.4877L74.9338 61.3038L73.0106 60.755ZM68.9632 74.9389C68.9554 74.966 68.9663 74.9078 69.0338 74.8213C69.1032 74.7323 69.2969 74.5403 69.6292 74.5191C69.9595 74.498 70.174 74.662 70.2518 74.7378C70.3284 74.8125 70.3464 74.8666 70.3348 74.8405L68.5068 75.652C68.5781 75.8126 68.6866 76.0051 68.8557 76.1699C69.026 76.3359 69.3351 76.5419 69.7566 76.515C70.1802 76.488 70.4618 76.2423 70.6104 76.0519C70.757 75.8641 70.8381 75.6569 70.8864 75.4877L68.9632 74.9389ZM70.3348 74.8406L67.6671 68.8304L65.8391 69.6418L68.5068 75.652L70.3348 74.8406ZM67.5534 69.8356L72.0067 63.8904L70.4059 62.6913L65.9527 68.6365L67.5534 69.8356ZM70.6058 62.4912L64.6682 66.9501L65.8691 68.5494L71.8068 64.0905L70.6058 62.4912ZM65.5852 66.8012L59.6076 64.8061L58.9744 66.7032L64.9521 68.6983L65.5852 66.8012Z"
                fill="white"
                mask="url(#path-5-inside-1_812_1188)"
              />
            </svg>
          </div>
          <div className="flex flex-col items-center gap-[24px]">
            <div className="text-3xl">이메일로 링크를 보냈습니다.</div>
            <div className="text-center text-lg text-gray-normal">
              {`이메일 ${email}를 확인해주세요.`}
              <br />
              로그인 할 수 있는 매직 링크를 보냈습니다.
            </div>
          </div>
          <Link
            href="/get-started"
            className="rounded-[8px] p-[8px] text-center text-lg hover:underline"
          >
            다른 계정 사용하기
          </Link>
        </div>
      </div>
    </div>
  );
}
