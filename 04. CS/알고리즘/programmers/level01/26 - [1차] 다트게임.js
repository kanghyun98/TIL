function solution(dartResult) {
  const gameScores = dartResult.match(/\d+/g).map(Number);
  const gamePluses = dartResult.split(/\d+/g).slice(1);

  gamePluses.forEach((plus, idx) => {
    // bouns
    gameScores[idx] = plus.includes('D')
      ? gameScores[idx] ** 2
      : plus.includes('T')
      ? gameScores[idx] ** 3
      : gameScores[idx];

    // option
    if (idx > 0) {
      gameScores[idx - 1] = plus.includes('*')
        ? gameScores[idx - 1] * 2
        : gameScores[idx - 1];
    }
    gameScores[idx] = plus.includes('*')
      ? gameScores[idx] * 2
      : gameScores[idx];
    gameScores[idx] = plus.includes('#')
      ? gameScores[idx] * -1
      : gameScores[idx];
  });

  return gameScores.reduce((acc, cur) => acc + cur);
}
