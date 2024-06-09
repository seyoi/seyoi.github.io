'use client';
import { useEffect } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { userAtom } from '@/atoms/atoms';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import NavBottom from '@/components/NavBottom';

const getCookieValue = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(';').shift();
  return null;
};

const deleteCookie = (name: string, path: string, domain: string) => {
  if (getCookieValue(name)) {
    document.cookie =
      name + '=; Max-Age=-99999999;' + (path ? '; path=' + path : '') + (domain ? '; domain=' + domain : '');
  }
};

const fetchUserData = async (csrf: string, accessToken: string) => {
  const response = await axios.get('https://api.oz-02-main-04.xyz/api/v1/users/myinfo', {
    withCredentials: true,
    headers: {
      'X-CSRFToken': csrf,
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export default function Page() {
  const [user, setUser] = useAtom(userAtom);
  const queryClient = useQueryClient();
  const csrf = getCookieValue('csrftoken');
  const accessToken = getCookieValue('access_token');

  const { data, error, isLoading } = useQuery(['userData'], fetchUserData);

  const handleLogout = async () => {
    try {
      deleteCookie('access_token', '/', 'oz-02-main-04.xyz');
      deleteCookie('refresh_token', '/', 'oz-02-main-04.xyz');
      deleteCookie('csrftoken', '/', 'oz-02-main-04.xyz');
      deleteCookie('csrftoken', '/', 'api.oz-02-main-04.xyz');
      deleteCookie('user_state', '/', 'oz-02-main-04.xyz');
      setUser(null);
      queryClient.clear();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {user ? (
        <>
          <p>안녕하세요! {user.닉네임} 님 </p>
          <button onClick={handleLogout}>로그아웃</button>
        </>
      ) : (
        <p>로그인 해주세요.</p>
      )}
      <div className="w-full fixed bottom-0">
        <NavBottom />
      </div>
    </div>
  );
}
