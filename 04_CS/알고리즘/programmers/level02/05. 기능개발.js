// 내가 구현한건 성능면에서 부족한 것 같다, O(n^2)
function solution(progresses, speeds) {
  const answer = [];
  let targetIdx = 0;

  while (targetIdx !== -1) {
    const workDay = Math.ceil(
      (100 - progresses[targetIdx]) / speeds[targetIdx]
    );

    progresses.forEach((_, idx) => {
      progresses[idx] += speeds[idx] * workDay;
    });

    const stopIdx = progresses.findIndex((val) => val < 100);

    stopIdx !== -1
      ? answer.push(stopIdx - targetIdx)
      : answer.push(progresses.length - targetIdx);

    targetIdx = stopIdx;
  }

  return answer;
}

// 모범 답안, O(n)
function solution(progresses, speeds) {
  let answer = [0];
  let days = progresses.map((progress, index) =>
    Math.ceil((100 - progress) / speeds[index])
  );

  let maxDay = days[0];

  for (let i = 0, j = 0; i < days.length; i++) {
    if (days[i] <= maxDay) {
      answer[j] += 1;
    } else {
      maxDay = days[i];
      answer[++j] = 1;
    }
  }

  return answer;
}
