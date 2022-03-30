function solution(s) {
  let target = s;
  let deletedZeroCount = 0;
  let changedCount = 0;

  while (target !== '1') {
    const targetLen = target.length;
    const zeroLen = (target.match(/0/g) || []).length;

    deletedZeroCount += zeroLen;
    changedCount += 1;

    target = (targetLen - zeroLen).toString(2);
  }

  return [changedCount, deletedZeroCount];
}
