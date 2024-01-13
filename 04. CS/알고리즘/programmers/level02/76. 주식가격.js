function solution(prices) {
  const answer = Array(prices.length)
    .fill()
    .map((_, idx) => prices.length - idx - 1);

  const stack = []; // item: [value, enterTime]

  for (let i = 0; i < prices.length; i++) {
    const thisPrice = prices[i];
    const thisTime = i;

    let idx = stack.length - 1;
    while (stack.length > 0) {
      const [targetPrice, targetEnterTime] = stack[idx];

      if (thisPrice < targetPrice) {
        stack.pop();
        const diffTime = thisTime - targetEnterTime;
        answer[targetEnterTime] = diffTime;
      } else {
        break;
      }

      idx--;
    }

    stack.push([thisPrice, thisTime]);
  }

  return answer;
}
