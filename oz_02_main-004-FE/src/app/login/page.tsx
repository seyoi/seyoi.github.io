'use client';

const KakaoLogin = () => {
  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://api.oz-02-main-04.xyz/api/v1/users/kakao/`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div>
      {' '}
      <button onClick={handleKakaoLogin}>로그인</button>
    </div>
  );
};

export default KakaoLogin;
