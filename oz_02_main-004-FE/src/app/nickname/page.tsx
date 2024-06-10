'use client';
import { useState } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { nicknameAtom } from '../../atoms/atoms';
import Link from 'next/link';
import React from 'react';

function Nickname() {
  const [nickName, setNickName] = useAtom(nicknameAtom);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const inputNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const saveNickname = () => {
    setError('');

    axios
      .post('https://api.oz-02-main-04.xyz/api/v1/users/myinfo', { action: 'change_nickname', nickname: inputValue })
      .then(response => {
        const { isDuplicate } = response.data;
        if (isDuplicate) {
          setError('이미 사용 중인 닉네임입니다.');
        } else {
          setNickName(inputValue);
          console.log(inputValue);

          //   axios
          //     .post('https://api.oz-02-main-04.xyz/api/v1/users/myinfo', { nickname: inputValue })
          //     .then(response => {
          //       setNickName(inputValue);
          //     })
          //     .catch(error => {
          //       console.error(error);
          //     });
        }
      })
      .catch(error => {
        console.error(error);
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
            <button>건너뛰기</button>
          </Link>

          <button onClick={saveNickname}>완료</button>
        </div>
      </form>
    </div>
  );
}

export default Nickname;
