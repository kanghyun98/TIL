// 연속합
/*
TODO: 임의의 수열에서 연속된 몇 개의 수를 선택해서 구할 수 있는 합 중 가장 큰 합을 구하기
수열의 각각의 요소에 해당 요소까지의 최대합을 저장한다.
( 이전 요소의 최대합 + 현재 요소 vs 현재 요소 ) 비교를 통해 현재 요소까지의 최대합을 구할 수 있다.
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const len = Number(inputList[0]);
const numList = inputList[1].split(' ').map(Number);

const sumArr = [numList[0]];

for (let i = 1; i < len; i++) {
  const sumNum = sumArr[i - 1] + numList[i];
  sumArr[i] = sumNum > numList[i] ? sumNum : numList[i];
}

console.log(Math.max(...sumArr));

/////////////////////////////
