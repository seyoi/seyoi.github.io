'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface User {
  email: string;
  id: number;
  nickname: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    if (token) {
      localStorage.setItem('auth_token', token);
      window.history.replaceState(null, '', '/profile'); // Remove token from URL
    }

    const storedToken = localStorage.getItem('auth_token');
    if (!storedToken) {
      router.push('/login');
      return;
    }

    axios
      .get<User>('http://54.180.86.80/api/v1/users/myinfo', {
        headers: {
          Authorization: `Token ${storedToken}`,
        },
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch user:', error);
        router.push('/login');
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>안녕하세요, {user.id}님</h2>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default Profile;
