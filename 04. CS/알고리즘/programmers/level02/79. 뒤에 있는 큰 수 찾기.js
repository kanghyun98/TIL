function solution(numbers) {
  const answer = Array(numbers.length);

  const stack = [];
  numbers.forEach((n, idx) => {
    while (stack.length > 0) {
      const last = stack[stack.length - 1][0];
      if (last < n) {
        const [lastN, lastIdx] = stack.pop();
        answer[lastIdx] = n;
      } else {
        break;
      }
    }

    stack.push([n, idx]);
  });

  // 남은거 처리
  stack.forEach((item) => {
    const [n, idx] = item;
    answer[idx] = -1;
  });

  return answer;
}

// time over O(N^2)
function solution(numbers) {
  const answer = [];

  for (let i = 0; i < numbers.length; i++) {
    const targetNumber = numbers[i];
    for (let j = i + 1; j <= numbers.length; j++) {
      if (j === numbers.length) {
        answer.push(-1);
      }

      if (targetNumber < numbers[j]) {
        answer.push(numbers[j]);
        break;
      }
    }
  }

  return answer;
}
