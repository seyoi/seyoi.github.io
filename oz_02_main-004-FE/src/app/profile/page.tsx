'use client';
import React, { useEffect, useState } from 'react';
import axiosInstance from './axiosInstance';
import axios from 'axios';
const Profile = () => {
  const [userData, setUserData] = useState({
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
        const response = await axiosInstance.get('/api/v1/users/myinfo');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle token expiration or other errors
        if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
          // Token refresh is handled in axiosInstance interceptors
        }
      }
    };

    fetchData();
  }, []);

  if (!userData.계정) {
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
