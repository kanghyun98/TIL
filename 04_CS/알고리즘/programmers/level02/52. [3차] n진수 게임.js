function solution(n, t, m, p) {
  let answer = '';
  let all = '';

  let num = 0;
  while (all.length < m * t) {
    const changedNum = num.toString(n).toUpperCase();
    all += changedNum;
    num++;
  }

  for (let i = p; i <= m * t; i += m) {
    answer += all[i - 1];
  }

  return answer;
}
