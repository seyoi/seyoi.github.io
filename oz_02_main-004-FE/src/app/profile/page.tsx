'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { userAtom, accessTokenAtom, csrfTokenAtom } from '@/atoms/atoms';
import Image from 'next/image';
interface User {
  id: number;
  계정: string;
  닉네임: string;
}
const getCookieValue = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(';').shift();
};
function deleteCookie(name: any, path: any, domain: any) {
  if (getCookieValue(name)) {
    document.cookie =
      name + '=; Max-Age=-99999999;' + (path ? '; path=' + path : '') + (domain ? '; domain=' + domain : '');
  }
}
export default function Page() {
  const [user, setUser] = useAtom(userAtom);
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [csrf, setCsrf] = useAtom(csrfTokenAtom);
  useEffect(() => {
    const csrfToken = getCookieValue('csrftoken');
    const token = getCookieValue('access_token');
    if (token) {
      setAccessToken(token);
    }
    if (csrfToken) {
      setCsrf(csrfToken);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!accessToken) return;
      console.log(accessToken);
      console.log(csrf);
      try {
        const response = await axios.get('https://api.oz-02-main-04.xyz/api/v1/users/myinfo', {
          withCredentials: true,
          headers: {
            'X-CSRFToken': csrf,
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [accessToken]);

  const handleLogout = async () => {
    try {
      deleteCookie('access_token', '/', 'oz-02-main-04.xyz');
      deleteCookie('refresh_token', '/', 'oz-02-main-04.xyz');
      deleteCookie('csrftoken', '/', 'oz-02-main-04.xyz');
      deleteCookie('csrftoken', '/', 'api.oz-02-main-04.xyz');
      deleteCookie('user_state', '/', 'oz-02-main-04.xyz');
      setUser(null);
      setAccessToken(null);
      setCsrf(null);
      //   console.log(accessToken);
      //   console.log(csrf);

      //   const response = await axios.post(
      //     'https://api.oz-02-main-04.xyz/api/v1/users/kakao/logout/',
      //     {},
      //     {
      //       withCredentials: true,
      //       headers: {
      //         'X-CSRFToken': csrf,
      //         Authorization: `Bearer ${accessToken}`,
      //       },
      //     },
      //   );
      //   if (response.status === 200) {
      //     setUser(null);
      //     window.location.href = '/login';
      //   } else {
      //     console.error(response.status);
      //   }
    } catch (error) {
      console.error(error);
    }
  };
  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://api.oz-02-main-04.xyz/api/v1/users/kakao/`;
    window.location.href = kakaoAuthUrl;
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {user ? (
        <>
          <p>안녕하세요! {user.닉네임} 님 </p>
          <button onClick={handleLogout}>로그아웃</button>
        </>
      ) : (
        <>
          <p>로그인 해주세요.</p>
          <button>
            <Image
              onClick={handleKakaoLogin}
              src={'/images/kakaoLogin.png'}
              alt="kakao-login"
              width={200}
              height={200}></Image>
          </button>
        </>
      )}
    </div>
  );
}
