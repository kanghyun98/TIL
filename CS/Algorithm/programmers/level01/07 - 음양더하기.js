function solution(absolutes, signs) {
  const len = signs.length;
  let answer = 0;

  for (let i = 0; i < len; i++) {
    answer += signs[i] ? absolutes[i] : -1 * absolutes[i];
  }

  return answer;
}
