// 동물원
/*
TODO: 0,1,2로 N자리 수를 만드는데, 1,2는 연속되게 올 수 없게 만드는 경우의 수 구하는 문제로 변경해서 생각
dp는 0,1,2로 끝나는 각각의 경우의 수

const [a, b, c] = dp;
dp = [a + b + c, a + c, a + b];
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const N = Number(inputList[0]);
const MOD = 9901;

let dp = [1, 1, 1];

for (let i = 0; i < N - 1; i++) {
  const [a, b, c] = dp;

  const count0 = (a + b + c) % MOD;
  const count1 = (a + c) % MOD;
  const count2 = (a + b) % MOD;

  dp = [count0, count1, count2];
}

const result = dp.reduce((acc, cur) => (acc + cur) % 9901);

console.log(result);

/////////////////////////////
