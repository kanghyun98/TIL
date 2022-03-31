function solution(msg) {
  const answer = [];
  const voca = {};
  let number = 1;

  const basic = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; // prettier-ignore
  basic.forEach((v) => (voca[v] = number++)); // basic settings

  let i = 0;
  let now = msg[i];
  let next = msg[++i];

  while (now || next) {
    while (true) {
      if (voca[now + next]) {
        now = now + next;
        next = msg[++i];
      } else {
        voca[now + next] = number++;
        break;
      }
    }

    answer.push(voca[now]);

    now = next;
    next = msg[++i];
  }
  return answer;
}

// 다음 스펠링을 포함한 단어가 없을 때
// -> 다음 스펠링 포함한 것을 voca에 추가
// -> answer 배열에 포함 이전의 값 push
