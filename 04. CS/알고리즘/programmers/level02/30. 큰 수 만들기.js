// stack
function solution(number, k) {
  const stack = [];

  for (const num of number) {
    while (k > 0 && stack.length && stack[stack.length - 1] < num) {
      stack.pop();
      k--;
    }

    stack.push(num);
  }

  return stack.slice(0, stack.length - k).join('');
}

// 점진적으로 제거하는 방식
function solution(number, k) {
  let len = number.length - k;
  let startIdx = 0;
  let finIdx = number.length - len + 1;
  let answer = '';

  while (answer.length < number.length - k) {
    const [maxNum, maxIdx] = getMaxNumInfo(
      number.slice(startIdx, finIdx).split('')
    );

    answer += maxNum;
    len--;
    startIdx += maxIdx + 1;
    finIdx = number.length - len + 1;
  }

  return answer;
}

function getMaxNumInfo(arr) {
  let maxNum = arr[0];
  let maxIdx = 0;
  arr.forEach((num, idx) => {
    if (num > maxNum) {
      maxNum = num;
      maxIdx = idx;
    }
  });

  return [maxNum, maxIdx];
}

// n-k개의 조합 구하고 가장 큰 수 구하기
function solution(number, k) {
  const n = number.length - k;
  const numArr = number.split('');

  const combArr = [];
  const dfs = (arr, res, lev, count, max) => {
    if (count === max) {
      combArr.push(res);
      return;
    }

    if (lev > arr.length - 1) return;

    dfs(arr, res + arr[lev], lev + 1, count + 1, max);
    dfs(arr, res, lev + 1, count, max);
  };

  dfs(numArr, '', 0, 0, n);

  return String(Math.max(...combArr));
}
