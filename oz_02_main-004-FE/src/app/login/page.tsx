'use client';

import { useEffect, useState } from 'react';

const getCookieValue = (name: string) => {
  const value = `; ${document.cookie}`;
  //   console.log(value);
  const parts = value.split(`; ${name}=`);
  //   console.log(parts);
  if (parts.length === 2) return parts.pop()!.split(';').shift();
};
function deleteCookie(name: any, path: any, domain: any) {
  if (getCookieValue(name)) {
    document.cookie =
      name + '=; Max-Age=-99999999;' + (path ? '; path=' + path : '') + (domain ? '; domain=' + domain : '');
  }
}
const KakaoLogin = () => {
  const [token, setToken] = useState('');
  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://api.oz-02-main-04.xyz/api/v1/users/kakao/`;
    window.location.href = kakaoAuthUrl;
  };
  useEffect(() => {
    const test = async () => {
      try {
        const accessToken = await getCookieValue('access_token');
        console.log(accessToken);
      } catch (error) {
        console.error(error);
      }
    };
    test();
  }, []);

  const cookieDelete = () => {
    deleteCookie('access_token', '/', 'http://localhost:3000');
    deleteCookie('refresh_token', '/', 'http://localhost:3000');
    console.log('deleted');
  };
  return (
    <div>
      {' '}
      <button onClick={handleKakaoLogin}>로그인</button>
      <button onClick={cookieDelete}>cookie delete</button>
    </div>
  );
};

export default KakaoLogin;
