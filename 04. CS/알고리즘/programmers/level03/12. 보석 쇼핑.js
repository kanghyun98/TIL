function solution(gems) {
  const gemsSize = new Set(gems).size;
  const answer = [1, gems.length];

  let left = 0;
  let right = 0;

  const gemInfo = new Map();
  gemInfo.set(gems[0], 1);

  while (right < gems.length) {
    // 범위 내 보석 종류가 전체 보석 종류와 같은 경우: left 증가
    if (gemInfo.size === gemsSize) {
      // 정답 업데이트
      if (right - left < answer[1] - answer[0]) {
        answer[0] = left + 1;
        answer[1] = right + 1;
      }

      const gemCount = gemInfo.get(gems[left]);
      gemInfo.set(gems[left], gemCount - 1);

      if (gemCount === 1) {
        gemInfo.delete(gems[left]); // 0개 되면 해당 보석은 삭제
      }

      left++;
    } else {
      // 범위 내 보석 종류가 전체 보석 종류 보다 작은 경우: right 증가
      right++;

      const gemCount = gemInfo.get(gems[right]) || 0;
      gemInfo.set(gems[right], gemCount + 1);
    }
  }

  return answer;
}
