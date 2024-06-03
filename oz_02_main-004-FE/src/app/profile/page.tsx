'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  is_staff: boolean;
  is_down: boolean;
  created_at: string;
  updated_at: string;
}

export default function Page() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://api.oz-02-main-04.xyz/api/v1/users/myinfo', {
          withCredentials: true, // 쿠키를 함께 보냅니다
        });
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogin = () => {
    window.location.href = 'https://api.oz-02-main-04.xyz/api/v1/users/kakao';
  };

  return (
    <div>
      <h1>카카오 로그인</h1>
      {!user ? (
        <button onClick={handleLogin}>카카오로 로그인</button>
      ) : (
        <div>
          <h2>유저 정보</h2>
          <p>아이디: {user?.id}</p>
          <p>이메일: {user?.email}</p>
          <p>운영진: {user?.is_staff ? 'Yes' : 'No'}</p>
          <p>휴면회원: {user?.is_down ? 'Yes' : 'No'}</p>
          <p>가입일: {user?.created_at}</p>
          <p>수정일: {user?.updated_at}</p>
        </div>
      )}
    </div>
  );
}
