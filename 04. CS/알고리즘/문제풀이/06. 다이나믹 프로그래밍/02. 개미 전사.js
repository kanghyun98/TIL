// 문제
// 일직선으로 존재하는 식량창고가 있을 때, 인접하지 않은 식량창고를 털었을 때 가장 많이 털 수 있는 양 구하기

// 아이디어
// dp[i] = storage[i] + Math.max(dp[i-2], dp[i-3])

function solve(...inputs) {
  const N = Number(inputs[0]);
  const storage = inputs[1].split(' ').map(Number);

  const dp = Array(N).fill(0);
  dp[1] = storage[1];
  dp[2] = storage[2];

  for (let i = 3; i < N; i++) {
    dp[i] = storage[i] + Math.max(dp[i - 2], dp[i - 3]);
  }

  return dp[N - 1];
}

// test
const answer1 = 8;
const test1 = solve('4', '1 3 1 5');
console.log(answer1 === test1);
