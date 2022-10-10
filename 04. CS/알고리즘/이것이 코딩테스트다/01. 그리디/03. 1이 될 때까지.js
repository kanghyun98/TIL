// 문제
// 어떠한 수 N이 1이 될 때까지 다음의 두 과정을 반복적으로 선택하여 수행 (단, 두번쨰 연산은 N이 K로 나눠떨어질 때만 선택 가능)
// N이 1이 될떄까지 1번 혹은 2번의 과정을 수행해야 하는 최소 횟수
// 1. N에서 1을 뺀다.
// 2. N을 K로 나눈다.
// 2 <= N, K <= 100,000

// 아이디어
// N을 K로 계속 나누며, (N = N // K)
// 1번 수행 횟수 += 나머지 값
// 2번 수행 횟수 += 나눈 횟수

function solve(input1) {
  let [N, K] = input1.split(' ').map(Number);

  let count1 = 0;
  let count2 = 0;

  // N이 K보다 작아질 때까지 반복
  while (N >= K) {
    const quotient = Math.floor(N / K);
    const remainder = N % K;

    count1 += remainder;
    count2 += 1;

    N = quotient;
  }

  count2 += N - 1; // 나머지 빼야 하는 횟수 (N이 1이 되기 위함)

  const answer = count1 + count2;
  return answer;
}

// test
const answer1 = 2;
const test1 = solve('25 5');
console.log(test1 === answer1);

const answer2 = 6;
const test2 = solve('25 3');
console.log(test2 === answer2);
