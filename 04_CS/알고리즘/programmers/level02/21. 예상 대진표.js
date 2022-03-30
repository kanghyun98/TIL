function solution(n, a, b) {
  const totalGamesRound = Math.log2(n);
  let round = 1;

  while (round <= totalGamesRound) {
    if (Math.ceil(a / 2) === Math.ceil(b / 2)) {
      return round;
    }

    a = Math.ceil(a / 2);
    b = Math.ceil(b / 2);
    round++;
  }
}

// 모범답안, 조금 더 간단한 풀이
function solution(n, a, b) {
  let round = 0;
  while (a !== b) {
    a = Math.ceil(a / 2);
    b = Math.ceil(b / 2);
    round++;
  }

  return round;
}
