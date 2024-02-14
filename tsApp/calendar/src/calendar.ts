// calendar.ts

// 캘린더 클래스 정의
export default class Calendar {
    private year: number;
    private month: number;
  
    constructor(year: number, month: number) {
      this.year = year;
      this.month = month;
    }
  
    // 캘린더 데이터 생성 메서드
    generateCalendarData() {
      const calendarData: (number | null)[] = []; // calendarData 배열 선언 및 초기화
  
      // 해당 월의 첫 번째 날짜 가져오기
      const firstDayOfMonth = new Date(this.year, this.month - 1, 1);
  
      // 해당 월의 일수 가져오기
      const lastDayOfMonth = new Date(this.year, this.month, 0).getDate();
  
      // 첫 번째 날짜가 속한 주의 일요일까지 null로 채우기
      for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
        calendarData.push(null);
      }
  
      // 해당 월의 날짜 채우기
      for (let i = 1; i <= lastDayOfMonth; i++) {
        calendarData.push(i);
      }
  
      return calendarData;
    }
  }
  