function solution(n) {
  return Math.sqrt(n) === Math.floor(Math.sqrt(n))
    ? (Math.sqrt(n) + 1) ** 2
    : -1;
}
