import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarComponent() {
  const [date, setDate] = useState(new Date('2024-01-01'));

  useEffect(() => {}, []);

  const handleDateChange = (newDate: any) => {
    setDate(newDate);
  };

  return (
    <div className="calendar-container">
      <Calendar onChange={handleDateChange} value={date} />
      {/* <div className="selected-date">Selected Date: {date.toDateString()}</div> */}
    </div>
  );
}

export default CalendarComponent;
