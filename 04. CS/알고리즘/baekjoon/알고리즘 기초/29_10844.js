// 쉬운 계단 수

/*
계단 수: 인접한 모든 자리의 차이가 1이 나는 수
TODO: 길이가 N인 계단 수가 총 몇 개 있는지 구하기
이전 자릿수의 경우의 수를 받아와서 문제를 해결한다.
N=3이라면,
100의 자리: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
10의 자리: [1, 1, 2, 2, 2, 2, 2, 2, 2, 1]
1의 자리: [1, 3, 3, 4, 4, 4, 4, 4, 3, 2]
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const MOD = 1000000000;
const n = Number(inputList[0]);

const initArr = Array(10).fill(1);
initArr[0] = 0;

const arr = [initArr];

for (i = 1; i < n; i++) {
  arr.push(Array(10).fill(0));

  for (j = 0; j <= 9; j++) {
    if (j >= 1) arr[i][j] += arr[i - 1][j - 1] % MOD;
    if (j <= 8) arr[i][j] += arr[i - 1][j + 1] % MOD;
  }
}

const targetArr = arr[arr.length - 1];
const result = targetArr.reduce((prev, cur) => prev + cur) % MOD;
console.log(result);
