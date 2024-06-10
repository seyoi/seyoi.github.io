'use client';
import NavBottom from '@/components/NavBottom';
import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom, accessTokenAtom, csrfTokenAtom } from '@/atoms/atoms';
import { useQuery } from '@tanstack/react-query';
import { fetchUserData, getCookieValue, deleteCookie } from './fetchUserData';
import Image from 'next/image';

function Page() {
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
  }, [setAccessToken, setCsrf]);

  const { data, error, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchUserData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

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
          <button onClick={handleKakaoLogin}>
            <Image src={'/images/kakaoLogin.png'} alt="kakao-login" width={200} height={200} />
          </button>
        </>
      )}
    </div>
  );
}

export default Page;
