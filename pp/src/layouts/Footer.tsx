function Footer() {
  return (
    <footer className="bg-ppLightGray text-white py-5">
      <div className="content">
        <p className="py-2 text-xl text-center font-medium">
          플랜픽 <span className="block">성장동행자</span>
        </p>
        <p className="my-3 text-center">
          고객센터
          <a href="mailto:help@planpeak.co.kr" className="block text-center">
            help@planpeak.co.kr
          </a>
        </p>
      </div>
      <a href="" className="block py-2 text-center">
        개인정보 처리방침
      </a>
    </footer>
  );
}

export default Footer;
