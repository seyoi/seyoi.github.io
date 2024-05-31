'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
interface User {
  id: number;
}
const handleKakaoLogin = () => {
  window.location.href = 'http://54.180.86.80/api/v1/users/kakao/';
};

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    if (token) {
      localStorage.setItem('auth_token', token);
      window.history.replaceState(null, '', '/login');

      axios
        .get('http://54.180.86.80/api/v1/users/myinfo', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          setUser(response.data);
          setIsLoggedIn(true);
        })
        .catch(error => {
          console.error('Failed to fetch user:', error);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setIsLoggedIn(false);
    setUser(null);
    router.push('/login');
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {!isLoggedIn ? (
          <>
            xx
            <button onClick={handleKakaoLogin}>
              <img
                src="https://developers.kakao.com/assets/img/about/logos/kakaologin/logo/kakao_account_login_btn_medium_narrow.png"
                alt="카카오 로그인"
              />
            </button>
          </>
        ) : (
          <>
            <div>
              <h2>안녕하세요, {user?.id}님</h2>
              <button onClick={handleLogout}>로그아웃</button>
            </div>
          </>
        )}
      </main>{' '}
    </>
  );
};

export default Login;
