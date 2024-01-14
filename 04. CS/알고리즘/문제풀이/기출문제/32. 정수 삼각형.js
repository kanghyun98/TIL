const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const [size, ...list] = inputList;
const N = Number(size);
const dp = list.map((r) => r.split(' ').map(Number));

for (let i = 1; i < N; i++) {
  for (let j = 0; j < i + 1; j++) {
    const lu = j === 0 ? 0 : dp[i - 1][j - 1]; // 왼쪽 위
    const ru = j === i ? 0 : dp[i - 1][j]; // 오른쪽 위

    // dp
    dp[i][j] = dp[i][j] + Math.max(lu, ru);
  }
}

const answer = Math.max(...dp[N - 1]);
console.log(answer);
/////////////////////////////
