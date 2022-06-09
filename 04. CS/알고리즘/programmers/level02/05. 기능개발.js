// 남은 작업일을 배열로 만든 뒤, 순회하며 결과 생성 O(N)
function solution(progresses, speeds) {
  const result = [0];
  const workDays = progresses.map((progress, index) =>
    Math.ceil((100 - progress) / speeds[index])
  );

  let maxDay = workDays[0];
  let deployDayIdx = 0;

  for (let i = 0; i < workDays.length; i++) {
    if (workDays[i] > maxDay) {
      maxDay = workDays[i];
      result[++deployDayIdx] = 0;
    }

    result[deployDayIdx] += 1;
  }

  return result;
}
