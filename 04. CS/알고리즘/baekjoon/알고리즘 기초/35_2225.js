// 합분해
/*
TODO: 0부터 N까지의 정수 K개를 더해서 그 합이 N이 되는 경우의 수를 구하기
dp[K][N] = dp[K-1][0] + dp[K-1][1] + ... + dp[K-1][N]
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split(' ');

///////////////////////////////

const [N, K] = inputList.map(Number);
const MOD = 1000000000;

const dp = [...Array(K + 1)].map(() => Array(N + 1).fill(0));

for (let i = 0; i < N + 1; i++) {
  dp[1][i] = 1;
}

for (let i = 2; i <= K; i++) {
  for (let j = 0; j <= N; j++) {
    for (let l = 0; l <= j; l++) {
      dp[i][j] = (dp[i][j] + dp[i - 1][j - l]) % MOD;
    }
  }
}

console.log(dp[K][N]);

/////////////////////////////
