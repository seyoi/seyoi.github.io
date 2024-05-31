'use client';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
interface User {
  email: string;
  id: number;
}
const Profile = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (token) {
      axios
        .get('http://54.180.86.80/api/v1/users/myinfo', {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then(response => {
          setUser(response.data);
          console.log(user);
        })
        .catch(error => {
          console.error('Failed to fetch user:', error);
        });
    }
  }, []);

  if (!user) {
    return <div>wth</div>;
  }

  return (
    <div>
      <h2>안녕하세요, {user.id}님</h2>
    </div>
  );
};

export default Profile;
