// RGB거리
/*
TODO: N개의 집을 연속된 색상 없이 칠하되, 비용이 최소가 되게 만들기
dp[i][0] += numArr[i][0] + Math.min(dp[i - 1][1], dp[i - 1][2]);
dp[i][1] += numArr[i][1] + Math.min(dp[i - 1][0], dp[i - 1][2]);
dp[i][2] += numArr[i][2] + Math.min(dp[i - 1][0], dp[i - 1][1]);
을 구하고, 이 중 최솟값을 구한다.
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const [len, ...list] = inputList;

const numArr = list.map((str) => str.split(' ').map(Number));
const dp = [...Array(list.length)].map(() => Array(3).fill(0));

for (let i = 0; i < 3; i++) {
  dp[0][i] = numArr[0][i];
}

for (let i = 1; i < list.length; i++) {
  dp[i][0] += numArr[i][0] + Math.min(dp[i - 1][1], dp[i - 1][2]);
  dp[i][1] += numArr[i][1] + Math.min(dp[i - 1][0], dp[i - 1][2]);
  dp[i][2] += numArr[i][2] + Math.min(dp[i - 1][0], dp[i - 1][1]);
}

const top = list.length - 1;
console.log(Math.min(dp[top][0], dp[top][1], dp[top][2]));

/////////////////////////////
