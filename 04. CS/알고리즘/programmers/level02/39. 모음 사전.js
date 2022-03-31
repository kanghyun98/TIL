function solution(word) {
  const spell = { A: 0, E: 1, I: 2, O: 3, U: 4 };
  let answer = 0;
  let unit = (((5 + 1) * 5 + 1) * 5 + 1) * 5 + 1;

  for (const w of word) {
    answer += unit * spell[w] + 1;
    unit = (unit - 1) / 5;
  }

  return answer;
}
