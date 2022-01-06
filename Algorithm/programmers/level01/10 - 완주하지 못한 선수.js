// 양측 정렬하고 비교
// 근데 모범 답안처럼 키(이름),값(1 || 2) 이렇게 두고 find 하는게 더 좋아보인다.

function solution(participant, completion) {
  const len = participant.length;
  let answer;

  // 정렬 알고리즘을 뭐를 쓰냐에 따라 시간 복잡도가 달라진다.
  completion.sort();
  participant.sort();

  for (let i = 0; i < len; i++) {
    if (participant[i] !== completion[i]) {
      answer = participant[i];
      break;
    }
  }

  return answer;
}

// 모범 답안
const solution2 = (part, comp) =>
  part.find(
    (name) => !comp[name]--,
    comp.map((name) => (comp[name] = (comp[name] | 0) + 1)) // 선행: (comp 배열에 새로운 키,값(1 | 2) 반환)
  );
