function solution(array, commands) {
  const answer = commands.map((cmd) => {
    const [i, j, k] = cmd;
    return [...array].slice(i - 1, j).sort((a, b) => a - b)[k - 1];
  });

  return answer;
}
