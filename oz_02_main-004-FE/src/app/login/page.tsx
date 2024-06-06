'use client';

import { useEffect, useState } from 'react';

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  console.log('value', value);
  const parts = value.split(`; ${name}=`);
  console.log(parts);
  if (parts.length === 2) return parts.pop()!.split(';').shift()!;
  return null;
}
const KakaoLogin = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = getCookie('access_token');
    console.log(token);
    if (token) {
      setAccessToken(token);
    }
  }, []);
  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://54.180.86.80/api/v1/users/kakao/`;
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
