'use client';
import NavBottom from '@/components/NavBottom';
import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom, accessTokenAtom, csrfTokenAtom } from '@/atoms/atoms';
import { useQuery } from '@tanstack/react-query';
import { fetchUserData, User } from '@/app/mypage/fetchUserData';

function Page() {
  const [user, setUser] = useAtom(userAtom);
  const [accessToken] = useAtom(accessTokenAtom);
  const [csrf] = useAtom(csrfTokenAtom);

  const { data, error, isLoading } = useQuery<User>({
    queryKey: ['userData', csrf, accessToken],
    queryFn: () => fetchUserData(csrf!, accessToken!),
    enabled: !!csrf && !!accessToken,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <main className="w-full h-full">
      <div>
        <p>{data?.닉네임}</p>
      </div>

      <div className="w-full fixed bottom-0">
        <NavBottom />
      </div>
    </main>
  );
}

export default Page;
