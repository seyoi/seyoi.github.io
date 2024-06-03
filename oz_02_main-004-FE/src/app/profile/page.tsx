'use client';
import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState({
    id: null,
    계정: '',
    닉네임: '',
    운영진: false,
    휴면회원: false,
    활동회원: false,
    가입일: '',
    변동일: '',
    로그인: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://54.180.86.80/api/v1/users/myinfo', {
          withCredentials: true,
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  if (userData.id === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>계정: {userData.계정}</p>
      <p>닉네임: {userData.닉네임}</p>
      <p>운영진: {userData.운영진 ? 'Yes' : 'No'}</p>
      <p>휴면회원: {userData.휴면회원 ? 'Yes' : 'No'}</p>
      <p>활동회원: {userData.활동회원 ? 'Yes' : 'No'}</p>
      <p>가입일: {userData.가입일}</p>
      <p>변동일: {userData.변동일}</p>
      <p>로그인: {userData.로그인}</p>
    </div>
  );
};

export default Profile;
