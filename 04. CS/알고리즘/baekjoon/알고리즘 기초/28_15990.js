// 1, 2, 3 더하기 5
/*
TODO: 정수 n이 주어졌을 때, n을 1, 2, 3의 합으로 나타내는 방법의 수 구하기 (같은 수 연속 x)
1,2,3 으로 끝났을 때 나오는 경우의 수를 각각 배열로 만들어 연속되는 숫자가 없도록 만든다.
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const [len, ...list] = inputList.map(Number);

const maxNum = Math.max(...list);
const MOD = 1000000009;

const fin1 = [0, 1, 0, 1];
const fin2 = [0, 0, 1, 1];
const fin3 = [0, 0, 0, 1];

for (let i = 4; i <= maxNum; i++) {
  fin1[i] = (fin2[i - 1] + fin3[i - 1]) % MOD;
  fin2[i] = (fin1[i - 2] + fin3[i - 2]) % MOD;
  fin3[i] = (fin1[i - 3] + fin2[i - 3]) % MOD;
}

list.forEach((n) => {
  const result = (fin1[n] + fin2[n] + fin3[n]) % MOD;
  console.log(result);
});

/////////////////////////////
