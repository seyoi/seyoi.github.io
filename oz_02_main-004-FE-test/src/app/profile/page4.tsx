'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
interface User {
  id: number;
}
function Profile() {
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

  return (
    <div>
      <h2>안녕하세요, {user?.id}님</h2>
    </div>
  );
}

export default Profile;
