function solution(n, s) {
  // 예외 처리
  if (s < n) {
    return [-1];
  }

  // 최대한 같거나 근접한 숫자의 조합으로 만들어야 함
  const last = s % n;
  // 1. s가 n으로 나눠 떨어지는 경우
  if (last === 0) {
    return Array(n).fill(s / n);
  }

  // 2. 나눠 떨어지지 않는 경우, 나머지를 최대한 분산해서 가져간다.
  if (last !== 0) {
    const res = Array(n).fill(Math.floor(s / n));

    for (let i = 0; i < last; i++) {
      res[n - i - 1]++; // 오름차순
    }

    return res;
  }
}
