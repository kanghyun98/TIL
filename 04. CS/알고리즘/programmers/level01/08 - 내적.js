function solution(a, b) {
  let answer = 0;
  const len = a.length;

  for (let i = 0; i < len; i++) {
    answer += a[i] * b[i];
  }

  return answer;
}
