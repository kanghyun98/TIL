function solution(n) {
  const fibo = [0, 1];

  for (let i = 2; i <= n; i++) {
    fibo[i] = (fibo[i - 1] + fibo[i - 2]) % 1234567; // 자료형 크기 제한 해결
  }

  return fibo[n];
}
