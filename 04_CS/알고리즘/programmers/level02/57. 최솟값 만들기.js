function solution(A, B) {
  A.sort((a, b) => a - b);
  B.sort((a, b) => b - a);

  const answer = A.reduce((acc, cur, idx) => {
    return acc + cur * B[idx];
  }, 0);

  return answer;
}
