'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  계정: string;
}
export const getCookieValue = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(';').shift();
};
export default function Page() {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [csrf, setCsrf] = useState('');
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
      //   if (!accessToken) return;
      console.log(accessToken);
      try {
        const response = await axios.get('https://api.oz-02-main-04.xyz/api/v1/users/myinfo', {
          withCredentials: true,
          headers: {
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
      console.log(accessToken);
      console.log(csrf);

      const response = await axios.post(
        'https://api.oz-02-main-04.xyz/api/v1/users/kakao/logout/',
        {},
        {
          withCredentials: true,
          headers: {
            'X-CSRFToken': csrf,
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (response.status === 200) {
        setUser(null);
        window.location.href = '/login';
      } else {
        console.error('Logout failed with status:', response.status);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {user ? (
        <>
          <p>안녕하세요! {user.계정} 님 </p>
          <button onClick={handleLogout}>로그아웃</button>
        </>
      ) : (
        <p>로그인 해주세요.</p>
      )}
    </div>
  );
}
