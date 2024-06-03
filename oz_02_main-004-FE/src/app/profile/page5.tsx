'use client';
import React, { useEffect, useState } from 'react';
import axiosInstance from './axiosInstance';
import axios from 'axios';
interface UserData {
  id: number | null;
  계정: string;
  닉네임: string;
  운영진: boolean;
  휴면회원: boolean;
  활동회원: boolean;
  가입일: string;
  변동일: string;
  로그인: string;
}

const Profile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [retry, setRetry] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/users/myinfo');
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        console.log('Unauthorized, setting retry to true');
        setRetry(true);
      } else {
        console.log('Other error', error);
      }
    }
  };

  useEffect(() => {
    if (!userData && !retry) {
      console.log('Initial data fetch');
      fetchData();
    } else if (retry) {
      console.log('Retrying data fetch');
      const retryFetch = setTimeout(() => {
        fetchData();
        setRetry(false);
      }, 2000); // 2-second delay to ensure token setting

      return () => clearTimeout(retryFetch);
    }
  }, [userData, retry]);

  if (!userData) {
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
