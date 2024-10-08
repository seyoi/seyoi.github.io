export function FooterSection() {
  return (
    <section className="flex h-[420px] items-end justify-center bg-blue-normal mobile:h-fit">
      <footer className="mb-[40px] flex h-[300px] w-[1200px] justify-between rounded-[20px] bg-white-normal p-10 mobile:mx-[14px] mobile:mb-[30px] mobile:h-fit mobile:w-full mobile:px-5 mobile:pb-[30px] mobile:pt-12">
        <div className="flex flex-col">
          <p className="text-lg text-black-normal mobile:text-boldmd">
            주식회사 도슨티(Docenty) | 대표 이일구
          </p>
          <p className="mt-1 text-sm text-black-normal">
            Copyright © Docenty Privacy Terms Policy
          </p>
          <p className="mt-10 text-md text-black-normal">
            경기도 성남시 분당구 성남대로 779번길 6,1층
            경기벤처창업지원센터(이매동, 케이티이분당빌딩)
          </p>
          <p className="mt-10 text-md text-black-normal">
            사업자등록번호 127-87-02847 | 통신판매업 신고번호 : 제
            2024-성남분당A-0015호
          </p>
          <p className="mt-4 text-md text-black-normal">
            고객센터: 02-6269-2193 | 이메일: contact+landing@docenty.ai
          </p>
        </div>
        <div className="flex items-end text-3xl text-black-light mobile:hidden">
          <div className="flex items-center gap-1">
            <svg
              width="40"
              height="37"
              viewBox="0 0 40 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5775 19.9517H15.8603C15.5766 19.9517 15.3467 20.1769 15.3467 20.4547V23.1774C15.3467 23.4552 15.5766 23.6804 15.8603 23.6804H17.5775C17.8612 23.6804 18.0911 23.4552 18.0911 23.1774V20.4547C18.0911 20.1769 17.8612 19.9517 17.5775 19.9517Z"
                fill="#416BFF"
              />
              <path
                d="M23.7201 19.9517H22.0029C21.7192 19.9517 21.4893 20.1769 21.4893 20.4547V23.1774C21.4893 23.4552 21.7192 23.6804 22.0029 23.6804H23.7201C24.0037 23.6804 24.2337 23.4552 24.2337 23.1774V20.4547C24.2337 20.1769 24.0037 19.9517 23.7201 19.9517Z"
                fill="#416BFF"
              />
              <path
                d="M34.7485 20.2765H33.5809C33.1478 18.2089 32.0638 16.1675 30.3437 14.4859C30.3437 14.4859 26.6645 10.3565 20.9068 9.87101C20.8919 9.87101 20.8769 9.87101 20.862 9.86809C20.7007 9.85639 20.5395 9.84469 20.3752 9.83592C20.1871 9.82714 19.999 9.82422 19.8108 9.82422C19.6227 9.82422 19.4315 9.83007 19.2464 9.83592C19.0821 9.84177 18.9209 9.85346 18.7596 9.86809C18.7447 9.86809 18.7268 9.86809 18.7118 9.87101C12.9542 10.3565 9.28096 14.4859 9.28096 14.4859C7.56381 16.1675 6.47678 18.2089 6.04376 20.2765H4.86714C4.15937 20.2765 3.58301 20.838 3.58301 21.5341V24.6224C3.58301 25.3155 4.15639 25.8799 4.86714 25.8799H5.88249C6.27968 29.17 9.13462 31.7231 12.6018 31.7231H19.9601L28.6713 36.3351C30.263 37.3295 32.3505 36.2094 32.3505 34.3611V29.1905C33.1 28.2576 33.5988 27.1228 33.7481 25.8828H34.7515C35.4593 25.8828 36.0356 25.3213 36.0356 24.6253V21.537C36.0356 20.8439 35.4622 20.2794 34.7515 20.2794L34.7485 20.2765ZM29.0924 25.4237C29.0924 26.5116 28.1935 27.3919 27.0826 27.3919H26.9362V30.062C26.9362 30.3135 26.6525 30.4656 26.4375 30.3281L21.8146 27.3919H12.5331C11.4222 27.3919 10.5233 26.5116 10.5233 25.4237V18.9429C10.5233 17.855 11.4222 16.9747 12.5331 16.9747H27.0826C28.1935 16.9747 29.0924 17.855 29.0924 18.9429V25.4237Z"
                fill="#416BFF"
              />
              <path
                d="M15.7627 9.18082C16.6676 8.89421 17.6531 8.68365 18.7102 8.59299C18.7252 8.59299 18.7431 8.59298 18.758 8.59006C18.9193 8.57836 19.0805 8.56666 19.2448 8.55789C19.4329 8.54912 19.6211 8.54619 19.8092 8.54619C19.9973 8.54619 20.1885 8.55204 20.3736 8.55789C20.5379 8.56374 20.6991 8.57544 20.8604 8.59006C20.8753 8.59006 20.8903 8.59006 20.9052 8.59299C21.9594 8.68072 22.9449 8.89421 23.8527 9.18082C23.6198 7.43487 22.2401 6.04279 20.4751 5.75911V4.01534C21.162 3.75213 21.6518 3.09996 21.6518 2.33373C21.6518 1.33647 20.8275 0.529297 19.8092 0.529297C18.7908 0.529297 17.9666 1.33647 17.9666 2.33373C17.9666 3.09996 18.4534 3.75213 19.1432 4.01534V5.75911C17.3783 6.04279 15.9956 7.43487 15.7657 9.18082H15.7627Z"
                fill="#416BFF"
              />
            </svg>
            Docenty
          </div>
        </div>
      </footer>
    </section>
  );
}
