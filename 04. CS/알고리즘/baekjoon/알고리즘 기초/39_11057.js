// 오르막 수
/*
오르막 수: 수의 자리가 오름차순을 이루는 수
TODO: 수의 길이 N이 주어졌을 때, 오르막 수의 개수를 구하기

0~9가 사용된 경우의 수를 하나의 배열로 만들고,
점화식 dp[N][i] = dp[N-1][i] + ... + dp[n-1][9]을 이용하여 문제를 해결한다.
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const N = Number(inputList[0]);
const MOD = 10007;

const dpArr2 = Array(10)
  .fill(0)
  .map((n, i) => n + 10 - i);
const dp = [Array(10).fill(0), Array(10).fill(1), dpArr2];

for (let i = 3; i <= N; i++) {
  const newArr = Array(10).fill(0);
  for (let j = 0; j < 10; j++) {
    let sum = 0;
    for (let k = j; k < 10; k++) {
      sum = (sum + dp[i - 1][k]) % MOD;
    }

    newArr[j] = sum;
  }

  dp.push(newArr);
}

const result = dp[N].reduce((acc, cur) => (acc + cur) % MOD);
console.log(result);

/////////////////////////////
