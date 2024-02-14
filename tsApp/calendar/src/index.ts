// index.ts

// 캘린더 클래스 가져오기
import Calendar from './calendar';

// 캘린더 라이브러리의 진입점 클래스
export default class MyCalendarLibrary {
  // 캘린더 생성 메서드
  static createCalendar(year: number, month: number) {
    return new Calendar(year, month);
  }

  // 캘린더 데이터 생성 메서드
  static generateCalendarData(year: number, month: number) {
    const calendar = new Calendar(year, month);
    return calendar.generateCalendarData();
  }
}

// 필요한 경우 추가적인 설정을 수행합니다.
function configureLibrary() {
  // 추가 설정 내용...
}
