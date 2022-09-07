function solution(queue1, queue2) {
  let q1Sum = queue1.reduce((acc, cur) => acc + cur, 0);
  let q2Sum = queue2.reduce((acc, cur) => acc + cur, 0);

  const totalSum = q1Sum + q2Sum;
  const targetSum = totalSum / 2;
  const maxCount = queue1.length + queue2.length + 1;

  const q1 = [...queue1, ...queue2];
  const q2 = [...queue2, ...queue1];

  let count = 0;
  let i = 0;
  let j = 0;

  while (true) {
    if (q1Sum === targetSum) {
      break;
    }

    if (count > maxCount) {
      count = -1;
      break;
    }

    if (q1Sum > targetSum) {
      const popNum = q1[i];
      q1Sum -= popNum;
      q2Sum += popNum;
      i++;
    } else if (q2Sum > targetSum) {
      const popNum = q2[j];
      q2Sum -= popNum;
      q1Sum += popNum;
      j++;
    }

    count++;
  }

  return count;
}
