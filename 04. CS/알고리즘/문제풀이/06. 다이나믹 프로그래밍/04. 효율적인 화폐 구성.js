// 문제
// 화폐 종류 N가지, 이 화폐들의 개수를 최소한으로 이용해서 합이 M원이 되도록 만드는 방법 (1 <= N <= 100, 1 <= M <= 10,000)
// 불가능할 때는 -1 출력

// 아이디어

function solve(...inputs) {
  const [info, ...moneyTypesStr] = inputs;

  const [N, M] = info.split(' ').map(Number); // 화폐 종류: N, 목표 금액: M
  const moneyTypes = moneyTypesStr.map(Number);

  const dp = Array(M + 1).fill(10001); // dp[i]: i원을 만드는데 사용되는 화폐 개수
  dp[0] = 0;

  for (let i = 0; i <= M; i++) {
    for (let j = 0; j < N; j++) {
      const moneyType = moneyTypes[j];

      if (dp[i - moneyType] !== undefined && dp[i - moneyType] !== 10001) {
        dp[i] = Math.min(dp[i], dp[i - moneyType] + 1);
      }
    }
  }

  return dp[M] === 10001 ? -1 : dp[M];
}

// test
const answer1 = 5;
const test1 = solve('2 15', '2', '3');
console.log(answer1 === test1);

const answer2 = -1;
const test2 = solve('3 4', '3', '5', '7');
console.log(answer1 === test1);
