'use client';
import axios from 'axios';
import { GetServerSideProps } from 'next';

// 유저 데이터 타입 정의
interface UserData {
  id: number;
  계정: string;
  닉네임: string;
  운영진: boolean;
  휴면회원: boolean;
  활동회원: boolean;
  가입일: string;
  변동일: string;
  로그인: string;
}

// getServerSideProps 함수 정의
export const getServerSideProps: GetServerSideProps = async context => {
  const token = context.req.headers.cookie
    ?.split('; ')
    .find(row => row.startsWith('access_token'))
    ?.split('=')[1];

  const axiosInstance = axios.create({
    baseURL: 'www.oz-02-main-04.xyz',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  try {
    const response = await axiosInstance.get<UserData>('/api/v1/users/myinfo');
    return {
      props: {
        userData: response.data,
      },
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      props: {
        userData: null,
      },
    };
  }
};

// Profile 컴포넌트 정의
interface ProfileProps {
  userData: UserData | null;
}

const Profile: React.FC<ProfileProps> = ({ userData }) => {
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
