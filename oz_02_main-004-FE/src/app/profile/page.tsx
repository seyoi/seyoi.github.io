'use client';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (token) {
      axios
        .get('http://54.180.86.80/users/myinfo', {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Failed to fetch user:', error);
        });
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>안녕하세요, {user.first_name}님</h2>
    </div>
  );
};

export default Profile;
