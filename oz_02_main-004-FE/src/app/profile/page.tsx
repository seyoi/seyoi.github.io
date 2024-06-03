'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  이메일: string;
}

export default function Page() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://api.oz-02-main-04.xyz/api/v1/users/myinfo', {
          withCredentials: true,
        });
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h2>유저 정보</h2>
      <p>아이디: {user?.id}</p>
      <p>이메일: {user?.이메일}</p>
    </div>
  );
}
