function solution(priorities, location) {
  const queue = [...priorities];
  let targetIdx = location;
  let time = 1;

  while (queue.length > 0) {
    const item = queue.shift();

    // 1) 출력
    if (item >= Math.max(...queue)) {
      if (targetIdx === 0) break; // 타겟인 경우

      targetIdx -= 1;
      time += 1;
    } else {
      // 2) 뒤로 밀기
      if (targetIdx === 0) targetIdx += queue.length; // 타겟인 경우
      else targetIdx -= 1;

      queue.push(item);
    }
  }

  return time;
}
