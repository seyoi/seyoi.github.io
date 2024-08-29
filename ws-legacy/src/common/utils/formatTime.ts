export const formatTime = (date?: Date | string | null) => {
  if (!date) {
    console.error("formatTime: Undefined date");
    return;
  }

  let targetDate = date;

  if (targetDate instanceof Date) targetDate = targetDate.toISOString();
  if (!targetDate.endsWith("Z")) targetDate += "Z";

  const currentTime = new Date().getTime();
  const targetTime = new Date(targetDate).getTime();
  const timeElapsed = Math.floor(currentTime - targetTime);

  const A_SECOND = 1000;
  const A_MINUTE = A_SECOND * 60;
  const AN_HOUR = A_MINUTE * 60;
  const A_DAY = AN_HOUR * 24;
  const SEVEN_DAYS = A_DAY * 7;

  if (timeElapsed < A_MINUTE) {
    return `방금 전`;
  } else if (timeElapsed < AN_HOUR) {
    const minutes = Math.floor(timeElapsed / A_MINUTE);
    return `${minutes}분 전`;
  } else if (timeElapsed < A_DAY) {
    const hours = Math.floor(timeElapsed / AN_HOUR);
    return `${hours}시간 전`;
  } else if (timeElapsed < SEVEN_DAYS) {
    const days = Math.floor(timeElapsed / A_DAY);
    return `${days}일 전`;
  } else {
    // 일주일 이상 지난 아이템에 대해서는 YYYY-MM-DD로 표기
    return `${new Date(date).toISOString().slice(0, 10)}`;
  }
};
