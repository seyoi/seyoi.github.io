import { useState } from 'react';

import 'react-datepicker/dist/react-datepicker.css'; // CSS 파일 임포트

export interface MeetDateProps {
  schedule: {
    type: string;
    date: string;
    time: string;
  };
  onScheduleChange: (newSchedule: { type: string; date: string; time: string }) => void;
}

function MeetDate({ onScheduleChange }: MeetDateProps) {
  const [schedule, setSchedule] = useState({
    type: '',
    date: '',
    time: '',
  });
  const handleScheduleTypeChange = (e: any) => {
    const newSchedule = {
      ...schedule,
      type: e.target.value,
      date: '',
      time: '',
    };
    setSchedule(newSchedule);
    onScheduleChange(newSchedule);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSchedule = { ...schedule, date: e.target.value };
    setSchedule(newSchedule);
    onScheduleChange(newSchedule);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSchedule = { ...schedule, time: e.target.value };
    setSchedule(newSchedule);
    onScheduleChange(newSchedule);
  };

  return (
    <div>
      {' '}
      <br /> <br />
      <div className="mb-4">
        <h3 className="text-xl font-bold">일정</h3>
      </div>{' '}
      <div className="flex">
        {' '}
        <input
          type="radio"
          name="scheduleType"
          value="원데이"
          checked={schedule.type === '원데이'}
          onChange={handleScheduleTypeChange}
        />{' '}
        <label className="mr-2 ml-1" htmlFor="원데이">
          원데이
        </label>
        <input
          type="radio"
          name="scheduleType"
          value="정기모임"
          checked={schedule.type === '정기모임'}
          onChange={handleScheduleTypeChange}
        />
        <label htmlFor="정기모임" className="ml-1">
          정기모임
        </label>
      </div>
      <div className=" mt-5">
        {' '}
        {schedule.type === '원데이' && (
          <div className="flex flex-col space-y-4  p-10  bg-gray-100 rounded">
            <div className="flex flex-col mb-3">
              <label htmlFor="date" className="text-sm">
                날짜
              </label>
              <input
                type="date"
                id="date"
                value={schedule.date}
                onChange={handleDateChange}
                className="py-2 px-3 border border-red-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="time" className="text-sm">
                시간
              </label>
              <input
                type="time"
                id="time"
                value={schedule.time}
                onChange={handleTimeChange}
                className="py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}
      </div>
      {schedule.type === '정기모임' && (
        <div className="flex flex-col space-y-4 mt-5 p-10  bg-gray-100 rounded">
          <div className="flex flex-col mb-5">
            <label htmlFor="date" className="text-sm mb-1">
              날짜
            </label>
            <input
              type="date"
              id="date"
              value={schedule.date}
              onChange={handleDateChange}
              className="py-2 px-3 border-b border-gray-300 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="time" className="text-sm mb-1">
              시간
            </label>
            <input
              type="time"
              id="time"
              value={schedule.time}
              onChange={handleTimeChange}
              className="py-2 px-3 border-b border-gray-300 focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MeetDate;
