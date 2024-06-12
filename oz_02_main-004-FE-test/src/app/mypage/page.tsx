'use client';
import React from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '@/atoms/atoms';

export default function AnotherPage() {
  const [user] = useAtom(userAtom);
  console.log(user);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {user ? (
        <>
          <p>안녕하세요! {user.닉네임} 님 </p>
        </>
      ) : (
        <p>로그인 해주세요.</p>
      )}
    </div>
  );
}
