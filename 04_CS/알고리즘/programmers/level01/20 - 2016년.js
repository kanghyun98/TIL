// Date.prototype.getDay(): Date 객체의 요일을 나타내는 정수 반환 (일요일(0) ~ 토요일(6))

function solution(a, b) {
  const dayArr = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const targetDate = new Date(`2016-${a}-${b}`);
  const dayNumber = targetDate.getDay();

  return dayArr[dayNumber];
}
