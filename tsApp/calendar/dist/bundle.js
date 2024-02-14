(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.MyCalendarLibrary = factory());
})(this, (function () { 'use strict';

  // calendar.ts
  // 캘린더 클래스 정의
  var Calendar = /** @class */ (function () {
      function Calendar(year, month) {
          this.year = year;
          this.month = month;
      }
      // 캘린더 데이터 생성 메서드
      Calendar.prototype.generateCalendarData = function () {
          var calendarData = []; // calendarData 배열 선언 및 초기화
          // 해당 월의 첫 번째 날짜 가져오기
          var firstDayOfMonth = new Date(this.year, this.month - 1, 1);
          // 해당 월의 일수 가져오기
          var lastDayOfMonth = new Date(this.year, this.month, 0).getDate();
          // 첫 번째 날짜가 속한 주의 일요일까지 null로 채우기
          for (var i = 0; i < firstDayOfMonth.getDay(); i++) {
              calendarData.push(null);
          }
          // 해당 월의 날짜 채우기
          for (var i = 1; i <= lastDayOfMonth; i++) {
              calendarData.push(i);
          }
          return calendarData;
      };
      return Calendar;
  }());

  // index.ts
  // 캘린더 라이브러리의 진입점 클래스
  var MyCalendarLibrary = /** @class */ (function () {
      function MyCalendarLibrary() {
      }
      // 캘린더 생성 메서드
      MyCalendarLibrary.createCalendar = function (year, month) {
          return new Calendar(year, month);
      };
      // 캘린더 데이터 생성 메서드
      MyCalendarLibrary.generateCalendarData = function (year, month) {
          var calendar = new Calendar(year, month);
          return calendar.generateCalendarData();
      };
      return MyCalendarLibrary;
  }());

  return MyCalendarLibrary;

}));
