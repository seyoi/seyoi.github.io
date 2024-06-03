'use client';
const KakaoLogin = () => {
  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://54.180.86.80/api/v1/users/kakao/`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div>
      
      <button onClick={handleKakaoLogin}>로그인</button>
    </div>
  );
};

export default KakaoLogin;
