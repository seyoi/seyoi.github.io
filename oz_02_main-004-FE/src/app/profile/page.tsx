'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

interface User {
  id: number;
  계정: string;
}

export default function Page() {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      setAccessToken(token);
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
      const csrfToken = Cookies.get('csrftoken');
      const response = await axios.post(
        'https://api.oz-02-main-04.xyz/api/v1/users/kakao/logout/',
        {},
        {
          withCredentials: true,
          headers: {
            'X-CSRFToken': csrfToken,
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
          <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
            로그아웃
          </button>
        </>
      ) : (
        <p>로그인 해주세요.</p>
      )}
    </div>
  );
}
