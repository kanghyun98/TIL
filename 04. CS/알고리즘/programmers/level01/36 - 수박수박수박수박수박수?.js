function solution(n) {
  const len = Math.floor(n / 2);

  return n % 2 ? '수박'.repeat(len) + '수' : '수박'.repeat(len);
}
