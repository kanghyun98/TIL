// 도전자: 전체 수 - 누적합(실패자)
// 실패자: 머무는 사람

function solution(N, stages) {
  // 각 stage별 인원 파악
  const eachStageUserCount = Array(N + 1).fill(0);

  stages.forEach((num) => {
    eachStageUserCount[num - 1] += 1;
  });

  // 계산
  eachStageUserCount.reduce((acc, cur, idx) => {
    eachStageUserCount[idx] = acc !== 0 ? eachStageUserCount[idx] / acc : 0;
    return acc - cur;
  }, stages.length);

  // 정렬
  const withoutClearUser = eachStageUserCount.slice(0, N);
  const sortedArr = [...withoutClearUser].sort((a, b) => b - a);
  const result = [];

  sortedArr.forEach((target) => {
    const idx = withoutClearUser.findIndex((num) => num === target);
    withoutClearUser[idx] = -1; // 중복 방지
    result.push(idx + 1);
  });

  return result;
}

// 모범 답안 (객체로 저장해서 정렬 보다 편리하게함)
function solution(N, stages) {
  let ans = [];

  for (let i = 1; i <= N; ++i) {
    let usersReachedCurrentStage = stages.reduce(
      (acc, curStage) => acc + (curStage >= i ? 1 : 0),
      0
    );
    let usersStagnatedCurrentStage = stages.reduce(
      (acc, curStage) => acc + (curStage == i ? 1 : 0),
      0
    );
    if (usersReachedCurrentStage === 0) {
      ans.push({ stage: i, failRate: 0 });
      continue;
    }

    ans.push({
      stage: i,
      failRate: usersStagnatedCurrentStage / usersReachedCurrentStage,
    });
  }

  return ans
    .sort((a, b) => {
      if (a.failRate > b.failRate) return -1;
      if (a.failRate < b.failRate) return 1;
      return a.stage - b.stage;
    })
    .map((entry) => entry.stage);
}
