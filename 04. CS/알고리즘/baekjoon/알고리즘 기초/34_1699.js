// 제곱수의 합
/*
TODO: 자연수 N을 제곱수들의 합으로 표현할 때에 그 항의 최소 갯수 구하기
dp[N] : N을 제곱수들의 합으로 표현할 때에 그 항의 최소 갯수
dp[N] = dp[N - 제곱수] + 1
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

let n = Number(inputList[0]);

const dp = [...Array(n + 1)].map((_, i) => i);

for (let i = 1; i <= n; i++) {
  const list = [];
  for (let v = 1; v ** 2 <= i; v++) {
    if (v > i) break;

    list.push(dp[i - v ** 2]);
  }

  dp[i] = Math.min(...list) + 1;
}

console.log(dp[n]);

/////////////////////////////
