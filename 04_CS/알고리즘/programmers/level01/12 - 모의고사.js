function solution(answers) {
  const len = answers.length;

  const user2Rule = [1, 3, 4, 5];
  const user3Rule = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  const score = [0, 0, 0];

  let user1Answer, user2Answer, user3Answer;

  for (let i = 0; i < len; i++) {
    user1Answer = (i + 1) % 5 === 0 ? 5 : (i + 1) % 5;
    user2Answer = i % 2 === 0 ? 2 : user2Rule[((i - 1) / 2) % 4];
    user3Answer = user3Rule[i % 10];

    if (user1Answer === answers[i]) score[0] += 1;
    if (user2Answer === answers[i]) score[1] += 1;
    if (user3Answer === answers[i]) score[2] += 1;
  }

  const answer = [];
  const maxNum = Math.max(...score);

  score.map((a, idx) => {
    if (a === maxNum) answer.push(idx + 1);
  });

  return answer;
}
