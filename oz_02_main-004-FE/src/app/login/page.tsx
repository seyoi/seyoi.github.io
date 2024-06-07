'use client';

import { useEffect, useState } from 'react';

function getCookie(name: string): string | null {
  return null;
}
const KakaoLogin = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const value = `; ${document.cookie}`;
  //   console.log('value', value);
  const parts = value.split(`; ${'csrftoken'}=`);
  //   if (parts.length === 2) {
  //     parts.pop()!.split(';').shift()!;
  //     console.log(parts);
  //   }
  //   if (parts.length === 2) return parts.pop()!.split(';').shift()!;
  if (parts.length === 1) parts.pop()!.split(';').shift()!;
  //   console.log(parts[1]);
  //   console.log(parts);

  useEffect(() => {
    const getCookieValue = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()!.split(';').shift();
    };
    // console.log(document.cookie);
    const token = getCookieValue('csrftoken');
    console.log(token);
    // console.log(token);
    if (token) {
      setAccessToken(token);
    }
  }, []);
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
