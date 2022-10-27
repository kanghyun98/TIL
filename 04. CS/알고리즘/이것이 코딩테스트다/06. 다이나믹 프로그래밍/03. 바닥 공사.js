// 문제
// 세로 2, 가로 N 길이의 바닥을 1 x 2 덮개, 2 x 1 덮개, 2 x 2 덮개로 채우는 모든 경우의 수 구하기

// 아이디어
// dp[i] = dp[i-1] + dp[i-2] * 2

function solve(input) {
  const N = Number(input);

  const dp = Array(N + 1).fill(0);
  dp[1] = 1;
  dp[2] = 3;

  for (let i = 3; i <= N; i++) {
    dp[i] = dp[i - 1] + dp[i - 2] * 2;
  }

  return dp[N];
}

// test
const answer1 = 5;
const test1 = solve(3);
console.log(answer1 === test1);
