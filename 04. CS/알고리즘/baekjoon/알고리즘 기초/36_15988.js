// 1, 2, 3 더하기 3
/*
TODO: 정수 n이 주어졌을 때, n을 1, 2, 3의 합으로 나타내는 방법의 수를 구하기
arr[n] = arr[n-1] + arr[n-2] + arr[n-3]
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const [len, ...list] = inputList.map(Number);

const MOD = 1000000009;
const maxNum = Math.max(...list);

const arr = Array(maxNum + 1);

arr[0] = 0;
arr[1] = 1;
arr[2] = 2;
arr[3] = 4;

for (let i = 4; i <= maxNum; i++) {
  arr[i] = (arr[i - 1] + arr[i - 2] + arr[i - 3]) % MOD;
}

list.forEach((n) => {
  console.log(arr[n]);
});

/////////////////////////////
