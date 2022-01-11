function solution(n) {
  return String(n).split('').reverse().map(Number);
}

// 숫자 풀이
function solution(n) {
  var arr = [];

  do {
    arr.push(n % 10);
    n = Math.floor(n / 10);
  } while (n > 0);

  return arr;
}
