import Link from "next/link";
import { nextAuthService } from "@/common/libs/NextAuthService";
import { Menu } from "./Menu";

export async function DocAssistHeader() {
  const session = await nextAuthService.getSession();

  return (
    <header
      className={`shadow-[0px_2px_2px_0px_rgba(0, 0, 0.04)] sticky top-0 z-[10] flex items-center justify-center bg-white px-[1rem] py-[0.25rem]`}
    >
      <div className="flex h-[2.875rem] w-[60rem] items-center justify-between">
        <div className="relative flex items-center justify-start gap-[1.3125rem]">
          <Link href="/">
            <svg
              className="shrink-0"
              width="119"
              height="23"
              viewBox="0 0 119 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.78871 12.1055H7.93013C7.78829 12.1055 7.67331 12.2205 7.67331 12.3623V13.7524C7.67331 13.8943 7.78829 14.0093 7.93013 14.0093H8.78871C8.93055 14.0093 9.04554 13.8943 9.04554 13.7524V12.3623C9.04554 12.2205 8.93055 12.1055 8.78871 12.1055Z"
                fill="#1FD8B6"
              />
              <path
                d="M11.8604 12.1055H11.0018C10.86 12.1055 10.745 12.2205 10.745 12.3623V13.7524C10.745 13.8943 10.86 14.0093 11.0018 14.0093H11.8604C12.0022 14.0093 12.1172 13.8943 12.1172 13.7524V12.3623C12.1172 12.2205 12.0022 12.1055 11.8604 12.1055Z"
                fill="#1FD8B6"
              />
              <path
                d="M17.3745 12.2721H16.7906C16.5741 11.2165 16.0321 10.1742 15.172 9.31567C15.172 9.31567 13.3325 7.2073 10.4536 6.95944C10.4462 6.95944 10.4387 6.95944 10.4312 6.95794C10.3506 6.95197 10.27 6.946 10.1878 6.94152C10.0938 6.93704 9.99969 6.93555 9.90562 6.93555C9.81155 6.93555 9.71599 6.93853 9.62341 6.94152C9.54129 6.94451 9.46066 6.95048 9.38003 6.95794C9.37256 6.95794 9.3636 6.95794 9.35613 6.95944C6.4773 7.2073 4.64069 9.31567 4.64069 9.31567C3.78212 10.1742 3.2386 11.2165 3.02209 12.2721H2.43378C2.0799 12.2721 1.79172 12.5588 1.79172 12.9142V14.491C1.79172 14.8449 2.07841 15.1331 2.43378 15.1331H2.94146C3.14005 16.8129 4.56753 18.1164 6.3011 18.1164H9.98028L14.3359 20.4712C15.1317 20.9788 16.1755 20.407 16.1755 19.4633V16.8233C16.5502 16.347 16.7996 15.7677 16.8743 15.1346H17.376C17.7298 15.1346 18.018 14.8479 18.018 14.4925V12.9157C18.018 12.5618 17.7313 12.2736 17.376 12.2736L17.3745 12.2721ZM14.5464 14.9001C14.5464 15.4556 14.097 15.905 13.5415 15.905H13.4683V17.2683C13.4683 17.3967 13.3265 17.4744 13.219 17.4042L10.9075 15.905H6.26676C5.7113 15.905 5.26185 15.4556 5.26185 14.9001V11.5913C5.26185 11.0358 5.7113 10.5864 6.26676 10.5864H13.5415C14.097 10.5864 14.5464 11.0358 14.5464 11.5913V14.9001Z"
                fill="#1FD8B6"
              />
              <path
                d="M7.88098 6.60664C8.33341 6.46031 8.82616 6.3528 9.35474 6.30651C9.36221 6.30651 9.37117 6.30651 9.37863 6.30502C9.45927 6.29905 9.5399 6.29308 9.62202 6.2886C9.71609 6.28412 9.81016 6.28262 9.90423 6.28262C9.9983 6.28262 10.0939 6.28561 10.1864 6.2886C10.2686 6.29158 10.3492 6.29755 10.4298 6.30502C10.4373 6.30502 10.4448 6.30502 10.4522 6.30651C10.9793 6.35131 11.4721 6.46031 11.926 6.60664C11.8095 5.71522 11.1197 5.00447 10.2372 4.85963V3.96932C10.5806 3.83493 10.8255 3.50195 10.8255 3.11074C10.8255 2.60157 10.4134 2.18945 9.90423 2.18945C9.39506 2.18945 8.98294 2.60157 8.98294 3.11074C8.98294 3.50195 9.22633 3.83493 9.57125 3.96932V4.85963C8.68879 5.00447 7.99745 5.71522 7.88247 6.60664H7.88098Z"
                fill="#1FD8B6"
              />
              <path
                d="M27.7784 18.5H23.1378V5.40909H27.8168C29.1335 5.40909 30.267 5.67116 31.2173 6.19531C32.1676 6.7152 32.8984 7.46307 33.4098 8.43892C33.9254 9.41477 34.1832 10.5824 34.1832 11.9418C34.1832 13.3054 33.9254 14.4773 33.4098 15.4574C32.8984 16.4375 32.1634 17.1896 31.2045 17.7138C30.25 18.2379 29.108 18.5 27.7784 18.5ZM25.9055 16.1286H27.6634C28.4815 16.1286 29.1697 15.9837 29.728 15.6939C30.2905 15.3999 30.7124 14.946 30.9936 14.3324C31.2791 13.7145 31.4219 12.9176 31.4219 11.9418C31.4219 10.9744 31.2791 10.1839 30.9936 9.57031C30.7124 8.95668 30.2926 8.50497 29.7344 8.2152C29.1761 7.92543 28.4879 7.78054 27.6697 7.78054H25.9055V16.1286ZM40.6184 18.6918C39.6255 18.6918 38.7669 18.4808 38.0424 18.0589C37.3223 17.6328 36.7662 17.0405 36.3741 16.282C35.9821 15.5192 35.786 14.6349 35.786 13.6293C35.786 12.6151 35.9821 11.7287 36.3741 10.9702C36.7662 10.2074 37.3223 9.61506 38.0424 9.19318C38.7669 8.76705 39.6255 8.55398 40.6184 8.55398C41.6113 8.55398 42.4679 8.76705 43.188 9.19318C43.9125 9.61506 44.4707 10.2074 44.8627 10.9702C45.2548 11.7287 45.4508 12.6151 45.4508 13.6293C45.4508 14.6349 45.2548 15.5192 44.8627 16.282C44.4707 17.0405 43.9125 17.6328 43.188 18.0589C42.4679 18.4808 41.6113 18.6918 40.6184 18.6918ZM40.6312 16.5824C41.0829 16.5824 41.46 16.4545 41.7626 16.1989C42.0652 15.9389 42.2931 15.5852 42.4466 15.1378C42.6042 14.6903 42.6831 14.1811 42.6831 13.6101C42.6831 13.0391 42.6042 12.5298 42.4466 12.0824C42.2931 11.6349 42.0652 11.2812 41.7626 11.0213C41.46 10.7614 41.0829 10.6314 40.6312 10.6314C40.1752 10.6314 39.7917 10.7614 39.4806 11.0213C39.1738 11.2812 38.9416 11.6349 38.7839 12.0824C38.6305 12.5298 38.5538 13.0391 38.5538 13.6101C38.5538 14.1811 38.6305 14.6903 38.7839 15.1378C38.9416 15.5852 39.1738 15.9389 39.4806 16.1989C39.7917 16.4545 40.1752 16.5824 40.6312 16.5824ZM51.6575 18.6918C50.6518 18.6918 49.7868 18.4787 49.0623 18.0526C48.3422 17.6222 47.7882 17.0256 47.4004 16.2628C47.0169 15.5 46.8251 14.6222 46.8251 13.6293C46.8251 12.6236 47.019 11.7415 47.4068 10.983C47.7988 10.2202 48.3549 9.62571 49.0751 9.19957C49.7953 8.76918 50.6518 8.55398 51.6447 8.55398C52.5012 8.55398 53.2512 8.70952 53.8947 9.0206C54.5382 9.33168 55.0474 9.76847 55.4224 10.331C55.7974 10.8935 56.0041 11.554 56.0424 12.3125H53.4728C53.4004 11.8224 53.2086 11.4283 52.8976 11.13C52.5907 10.8274 52.188 10.6761 51.6895 10.6761C51.2676 10.6761 50.899 10.7912 50.5836 11.0213C50.2725 11.2472 50.0297 11.5774 49.8549 12.0121C49.6802 12.4467 49.5929 12.973 49.5929 13.5909C49.5929 14.2173 49.6781 14.75 49.8485 15.1889C50.0233 15.6278 50.2683 15.9624 50.5836 16.1925C50.899 16.4226 51.2676 16.5376 51.6895 16.5376C52.0005 16.5376 52.2797 16.4737 52.5268 16.3459C52.7782 16.218 52.9849 16.0327 53.1468 15.7898C53.313 15.5426 53.4217 15.2464 53.4728 14.9013H56.0424C55.9998 15.6513 55.7953 16.3118 55.4288 16.8828C55.0666 17.4496 54.5659 17.8928 53.9267 18.2124C53.2875 18.532 52.5311 18.6918 51.6575 18.6918ZM62.2603 18.6918C61.2504 18.6918 60.381 18.4872 59.6523 18.0781C58.9279 17.6648 58.3697 17.081 57.9776 16.3267C57.5856 15.5682 57.3896 14.6712 57.3896 13.6357C57.3896 12.6257 57.5856 11.7393 57.9776 10.9766C58.3697 10.2138 58.9215 9.61932 59.6332 9.19318C60.3491 8.76705 61.1886 8.55398 62.1516 8.55398C62.7994 8.55398 63.4023 8.65838 63.9606 8.86719C64.5231 9.07173 65.0131 9.38068 65.4308 9.79403C65.8526 10.2074 66.1808 10.7273 66.4151 11.3537C66.6495 11.9759 66.7667 12.7045 66.7667 13.5398V14.2876H58.4762V12.6001H64.2035C64.2035 12.2081 64.1183 11.8608 63.9478 11.5582C63.7773 11.2557 63.5408 11.0192 63.2383 10.8487C62.94 10.674 62.5927 10.5866 62.1964 10.5866C61.783 10.5866 61.4165 10.6825 61.0969 10.8743C60.7816 11.0618 60.5344 11.3153 60.3555 11.6349C60.1765 11.9503 60.0849 12.3018 60.0806 12.6896V14.294C60.0806 14.7798 60.1701 15.1996 60.3491 15.5533C60.5323 15.907 60.7901 16.1797 61.1225 16.3714C61.4549 16.5632 61.8491 16.6591 62.305 16.6591C62.6076 16.6591 62.8846 16.6165 63.136 16.5312C63.3874 16.446 63.6026 16.3182 63.7816 16.1477C63.9606 15.9773 64.0969 15.7685 64.1907 15.5213L66.7092 15.6875C66.5813 16.2926 66.3192 16.821 65.9229 17.2727C65.5309 17.7202 65.0238 18.0696 64.4016 18.321C63.7837 18.5682 63.07 18.6918 62.2603 18.6918ZM71.2667 12.8239V18.5H68.5437V8.68182H71.1388V10.4141H71.2539C71.4712 9.84304 71.8356 9.39133 72.3469 9.05895C72.8583 8.7223 73.4783 8.55398 74.207 8.55398C74.8888 8.55398 75.4833 8.70312 75.9904 9.00142C76.4975 9.29972 76.8917 9.72585 77.1729 10.2798C77.4542 10.8295 77.5948 11.4858 77.5948 12.2486V18.5H74.8718V12.7344C74.8761 12.1335 74.7227 11.6648 74.4116 11.3281C74.1005 10.9872 73.6722 10.8168 73.1268 10.8168C72.7603 10.8168 72.4364 10.8956 72.1552 11.0533C71.8782 11.2109 71.6609 11.4411 71.5032 11.7436C71.3498 12.0419 71.271 12.402 71.2667 12.8239ZM84.9632 8.68182V10.7273H79.0506V8.68182H84.9632ZM80.3929 6.32955H83.1159V15.483C83.1159 15.7344 83.1543 15.9304 83.231 16.071C83.3077 16.2074 83.4142 16.3033 83.5506 16.3587C83.6912 16.4141 83.8532 16.4418 84.0364 16.4418C84.1642 16.4418 84.2921 16.4311 84.4199 16.4098C84.5478 16.3842 84.6458 16.3651 84.714 16.3523L85.1422 18.3786C85.0059 18.4212 84.8141 18.4702 84.5669 18.5256C84.3198 18.5852 84.0194 18.6214 83.6657 18.6342C83.0094 18.6598 82.4341 18.5724 81.9398 18.3722C81.4498 18.1719 81.0684 17.8608 80.7956 17.4389C80.5229 17.017 80.3887 16.4844 80.3929 15.8409V6.32955ZM88.4181 22.1818C88.073 22.1818 87.7491 22.1541 87.4466 22.0987C87.1483 22.0476 86.9011 21.9815 86.7051 21.9006L87.3187 19.8679C87.6383 19.9659 87.926 20.0192 88.1816 20.0277C88.4416 20.0362 88.6653 19.9766 88.8528 19.8487C89.0446 19.7209 89.2001 19.5036 89.3194 19.1967L89.4792 18.7812L85.9572 8.68182H88.8208L90.8535 15.892H90.9558L93.0076 8.68182H95.8904L92.0744 19.5611C91.8912 20.0895 91.6419 20.5497 91.3265 20.9418C91.0154 21.3381 90.6213 21.6428 90.144 21.8558C89.6667 22.0732 89.0914 22.1818 88.4181 22.1818ZM106.72 18.6854C106.093 18.6854 105.535 18.5767 105.045 18.3594C104.555 18.1378 104.167 17.8118 103.882 17.3814C103.6 16.9467 103.46 16.4055 103.46 15.7578C103.46 15.2124 103.56 14.7543 103.76 14.3835C103.96 14.0128 104.233 13.7145 104.578 13.4886C104.924 13.2628 105.316 13.0923 105.755 12.9773C106.198 12.8622 106.662 12.7812 107.148 12.7344C107.719 12.6747 108.179 12.6193 108.529 12.5682C108.878 12.5128 109.132 12.4318 109.289 12.3253C109.447 12.2187 109.526 12.0611 109.526 11.8523V11.8139C109.526 11.4091 109.398 11.0959 109.142 10.8743C108.891 10.6527 108.533 10.5419 108.068 10.5419C107.578 10.5419 107.188 10.6506 106.899 10.8679C106.609 11.081 106.417 11.3494 106.323 11.6733L103.805 11.4688C103.933 10.8722 104.184 10.3565 104.559 9.92188C104.934 9.48295 105.418 9.14631 106.01 8.91193C106.607 8.6733 107.297 8.55398 108.081 8.55398C108.627 8.55398 109.149 8.6179 109.647 8.74574C110.15 8.87358 110.595 9.07173 110.983 9.3402C111.375 9.60866 111.684 9.95384 111.91 10.3757C112.136 10.7933 112.249 11.294 112.249 11.8778V18.5H109.666V17.1385H109.59C109.432 17.4453 109.221 17.7159 108.957 17.9503C108.693 18.1804 108.375 18.3615 108.005 18.4936C107.634 18.6214 107.206 18.6854 106.72 18.6854ZM107.5 16.8061C107.9 16.8061 108.254 16.7273 108.561 16.5696C108.867 16.4077 109.108 16.1903 109.283 15.9176C109.458 15.6449 109.545 15.3359 109.545 14.9908V13.9489C109.46 14.0043 109.343 14.0554 109.193 14.1023C109.049 14.1449 108.884 14.1854 108.701 14.2237C108.518 14.2578 108.335 14.2898 108.152 14.3196C107.968 14.3452 107.802 14.3686 107.653 14.3899C107.333 14.4368 107.054 14.5114 106.816 14.6136C106.577 14.7159 106.392 14.8544 106.259 15.0291C106.127 15.1996 106.061 15.4126 106.061 15.6683C106.061 16.0391 106.196 16.3224 106.464 16.5185C106.737 16.7102 107.082 16.8061 107.5 16.8061ZM114.361 18.5V8.68182H117.084V18.5H114.361ZM115.729 7.41619C115.324 7.41619 114.977 7.28196 114.687 7.01349C114.402 6.74077 114.259 6.41477 114.259 6.03551C114.259 5.66051 114.402 5.33878 114.687 5.07031C114.977 4.79758 115.324 4.66122 115.729 4.66122C116.134 4.66122 116.479 4.79758 116.765 5.07031C117.055 5.33878 117.199 5.66051 117.199 6.03551C117.199 6.41477 117.055 6.74077 116.765 7.01349C116.479 7.28196 116.134 7.41619 115.729 7.41619Z"
                fill="#0D0B33"
              />
              <path
                d="M98.2603 18.6662C97.8384 18.6662 97.4762 18.517 97.1737 18.2188C96.8754 17.9162 96.7262 17.554 96.7262 17.1321C96.7262 16.7145 96.8754 16.3565 97.1737 16.0582C97.4762 15.7599 97.8384 15.6108 98.2603 15.6108C98.6694 15.6108 99.0273 15.7599 99.3342 16.0582C99.641 16.3565 99.7944 16.7145 99.7944 17.1321C99.7944 17.4134 99.7219 17.6712 99.5771 17.9055C99.4364 18.1357 99.2511 18.321 99.021 18.4616C98.7908 18.598 98.5373 18.6662 98.2603 18.6662Z"
                fill="#1FD8B6"
              />
            </svg>
          </Link>
        </div>
        <Menu isLogin={!!session} />
      </div>
    </header>
  );
}
