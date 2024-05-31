'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const handleKakaoLogin = () => {
  window.location.href = 'http://54.180.86.80/users/kakao/';
};

const Login = () => {
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (token) {
      router.push('/profile');
    }
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      test{' '}
      <button onClick={handleKakaoLogin}>
        <img
          src="https://developers.kakao.com/assets/img/about/logos/kakaologin/logo/kakao_account_login_btn_medium_narrow.png"
          alt="카카오 로그인"
        />
      </button>
    </main>
  );
};

export default Login;
