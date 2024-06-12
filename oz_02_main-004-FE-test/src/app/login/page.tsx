'use client';
import Image from 'next/image';
const KakaoLogin = () => {
  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://api.oz-02-main-04.xyz/api/v1/users/kakao/`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {' '}
      {/* <button onClick={handleKakaoLogin}>
        <img src="kakaoLogin.png" alt="" />
      </button> */}
      <button>
        <Image
          onClick={handleKakaoLogin}
          src={'/images/kakaoLogin.png'}
          alt="kakao-login"
          width={200}
          height={200}></Image>
      </button>
    </div>
  );
};

export default KakaoLogin;
