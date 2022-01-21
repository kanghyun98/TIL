function solution(priorities, location) {
  const queue = [...priorities];
  let targetIdx = location;
  let count = 1;

  while (true) {
    const item = queue.shift();
    if (item >= Math.max(...queue)) {
      if (targetIdx) {
        count++;
        targetIdx--;
      } else return count;
    } else {
      targetIdx ? targetIdx-- : (targetIdx += queue.length);
      queue.push(item);
    }
  }
}
