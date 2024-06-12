'use client';
import axios from 'axios';
import React, { useState } from 'react';
import { userAtom, csrfTokenAtom, accessTokenAtom } from '@/atoms/atoms';
import { useAtom } from 'jotai';
function Goal() {
  const [goal, setGoal] = useState<string>('');
  const [dDay, setDDay] = useState<string>('');
  const [user] = useAtom(userAtom);
  const [csrf] = useAtom(csrfTokenAtom);
  const [accessToken] = useAtom(accessTokenAtom);
  const handleSetGoal = async () => {
    if (!user) return;
    try {
      const response = await axios.post(
        `https://api.oz-02-main-04.xyz/api/v1/users/${user.id}/goal/`,
        { goal, d_day: dDay },
        {
          withCredentials: true,
          headers: {
            'x-csrftoken': csrf,
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <p>목표설정</p>
      <label htmlFor=""></label>
      <input type="text" value={goal} onChange={e => setGoal(e.target.value)} placeholder="목표 입력" />
      <input type="date" value={dDay} onChange={e => setDDay(e.target.value)} placeholder="d_day 선택" />
      <button onClick={handleSetGoal}>목표 설정하기</button> <hr />
    </>
  );
}

export default Goal;
