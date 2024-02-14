// src/App.js

import React from 'react';
import MyCalendarLibrary from './Users/youngmatias/Documents/GitHub/oz/tsApp'; // 로컬 경로로 라이브러리 임포트

function App() {
  // MyCalendarLibrary를 사용하여 캘린더 데이터 생성
  const calendarData = MyCalendarLibrary.generateCalendarData(2024, 2);

  return (
    <div>
      <h1>My React App with Local Library</h1>
      {/* 라이브러리를 사용한 JSX */}
      <ul>
        {calendarData.map((day, index) => (
          <li key={index}>{day !== null ? day : 'Empty'}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
