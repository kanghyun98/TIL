// 이분 탐색법
function solution(stones, k) {
  let min = 1;
  let max = 200000000;

  while (min <= max) {
    const mid = Math.floor((min + max) / 2);

    if (checkTooBig(stones, k, mid)) {
      max = mid - 1;
    } else {
      min = mid + 1;
    }
  }

  return min;
}

function checkTooBig(stones, k, mid) {
  let count = 0;

  for (let i = 0; i < stones.length; i++) {
    count = stones[i] <= mid ? count + 1 : 0; // +1 or 초기화

    if (count >= k) {
      return true;
    }
  }

  return false;
}

// 틀린방식: k개씩 합을 구하며 제일 작은 부분이 무너지는 시점을 구하고, 그 부분의 제일 큰 값이 건널 수 있는 사람의 수이다.
// 이유) 합이 크더라도 편차가 작은 묶음이 먼저 빠질 수 있음
function solution(stones, k) {
  let sum = stones.slice(0, k).reduce((acc, cur) => acc + cur, 0); // k개씩 합

  // 최소합, 시작 idx
  let minSum = sum;
  let minIdx = 0;

  for (let i = 0; i < stones.length - k; i++) {
    sum = sum - stones[i] + stones[i + k];

    if (sum < minSum) {
      minSum = sum;
      minIdx = i + 1;
    }
  }

  return Math.max(...stones.slice(minIdx, minIdx + k));
}
