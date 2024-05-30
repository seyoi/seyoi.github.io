'use client';
import { useState } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { Button } from '@/stories/Button';
import { nickNameAtom } from '../atoms';
import Link from 'next/link';

function Page() {
  const [nickName, setNickName] = useAtom(nickNameAtom);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const inputNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const saveNickName = () => {
    setError('');

    axios
      .post('/api/check-nickname', { nickname: inputValue })
      .then(response => {
        const { isDuplicate } = response.data;
        if (isDuplicate) {
          setError('이미 사용 중인 닉네임입니다.');
        } else {
          setNickName(inputValue);
          console.log(inputValue);

          axios
            .post('/api/save-nickname', { nickname: inputValue })
            .then(response => {
              setNickName(inputValue);
            })
            .catch(error => {
              console.error('Error submitting nickname:', error);
            });
        }
      })
      .catch(error => {
        console.error('Error checking nickname:', error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen mx-12">
      <form className="w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">닉네임을 입력해 주세요</h2>
        <input
          className="border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:border-blue-500 w-full"
          type="text"
          id="nickname"
          onChange={e => inputNickName(e)}
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="flex">
          <Link href="/" className="mr-2">
            <Button label="건너뛰기" />
          </Link>
          <Button label="완료" onClick={saveNickName} />
        </div>
      </form>
    </div>
  );
}

export default Page;
