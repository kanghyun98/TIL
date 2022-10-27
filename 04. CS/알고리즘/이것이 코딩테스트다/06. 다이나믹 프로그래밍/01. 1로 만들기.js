// 문제
// 정수 X가 가주어질 때 정수 X에 사용할 수 있는 연산은 다음과 같이 4가지이다.
// 1. X가 5로 나누어 떨어지면, 5로 나눈다.
// 2. X가 3으로 나누어 떨어지면, 3으로 나눈다.
// 3. X가 2로 나누어 떨어지면, 2로 나눈다.
// 4. X에서 1을 뺀다.
// -> X를 1로 만들기 위한 연산의 최소 사용 횟수 구하기 (1 <= X <= 30,000)

// 아이디어
// DP의 메모이제이션 사용

function solve(input) {
  const x = Number(input);

  const dp = Array(30001).fill(0); // i: 숫자 i, dpTable[i]: 숫자 i를 1로 만들기 위한 최소 연산 횟수

  for (let i = 2; i <= x; i++) {
    // 4. X에서 1을 뺀다.
    dp[i] = dp[i - 1] + 1;

    // 3. X가 2로 나누어 떨어지면, 2로 나눈다.
    if (i % 2 === 0) {
      dp[i] = Math.min(dp[i], dp[i / 2] + 1);
    }

    // 2. X가 3으로 나누어 떨어지면, 3으로 나눈다.
    if (i % 3 === 0) {
      dp[i] = Math.min(dp[i], dp[i / 3] + 1);
    }

    // 1. X가 5로 나누어 떨어지면, 5로 나눈다.
    if (i % 5 === 0) {
      dp[i] = Math.min(dp[i], dp[i / 5] + 1);
    }
  }

  return dp[x];
}

// test
const answer1 = 3;
const test1 = solve(26);
console.log(answer1 === test1);
