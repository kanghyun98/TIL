// https://school.programmers.co.kr/learn/courses/30/lessons/42891
function solution(food_times, k) {
  let lastTime = k;
  let lastFoodsLen = food_times.length;
  let prevTime = 0;
  let thisIdx = 0;

  // 1. 시간 기준 오름차순 정렬
  const foodInfoArr = food_times.map((time, idx) => [time, idx]); // [시간, 기존 순서]를 요소로 갖는 새로운 배열 생성
  foodInfoArr.sort((a, b) => a[0] - b[0]); // 시간 기준 오름차순 정렬

  // 2. 시간이 낮은 순으로 다 먹는데 걸리는 시간 구하기
  while (true) {
    // 먹을 음식 없으면 -1 반환
    if (lastFoodsLen === 0) {
      return -1;
    }

    const eatTime = lastFoodsLen * (foodInfoArr[thisIdx][0] - prevTime);
    lastTime -= eatTime;
    lastFoodsLen -= 1;
    prevTime = foodInfoArr[thisIdx][0];
    thisIdx += 1;

    // 네트워크 오류가 발생한 시점을 넘어서면 정지
    if (lastTime < 0) {
      lastTime += eatTime;
      lastFoodsLen += 1;
      thisIdx -= 1;
      break;
    }
  }

  // 3. 다음 순서 식사 구하기
  const arr = foodInfoArr.slice(thisIdx).sort((a, b) => a[1] - b[1]);
  const tmp = Math.floor((lastTime + 1) % lastFoodsLen);
  const nextTurnPoint = tmp === 0 ? lastFoodsLen : tmp;

  return arr[nextTurnPoint - 1][1] + 1;
}
