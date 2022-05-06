// 숫자가 많이 나온게 앞에 있다는 원리 이용
function solution(s) {
  const numObj = {};

  const arr = s.match(/\d+/g);
  arr.forEach((n) => (numObj[n] = (numObj[n] || 0) + 1));

  const result = Object.keys(numObj).map(Number);
  result.sort((a, b) => numObj[b] - numObj[a]);

  return result;
}
