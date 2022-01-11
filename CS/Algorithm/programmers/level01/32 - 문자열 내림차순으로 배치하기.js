// reverse도 있었다..! 깜빡했넿
function solution(s) {
  return s
    .split('')
    .sort((a, b) => (a < b ? 1 : a > b ? -1 : 0))
    .join('');
}
