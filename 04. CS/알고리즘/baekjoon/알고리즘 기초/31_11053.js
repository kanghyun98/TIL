// 가장 긴 증가하는 부분 수열
/*
TODO: 수열 A가 주어졌을 때, 가장 긴 증가하는 부분 수열의 길이 구하기
ex) A = {10, 20, 10, 30, 20, 50} -> {10, 20, 30, 50} -> 4

수열의 요소마다 각 요소까지의 수열 길이를 저장한다.
수열 요소를 하나씩 돌면서 현재 숫자의 왼쪽에 위치한 숫자들 중 현재 숫자보다 작으면서 수열 길이가 가장 긴 요소을 찾고,
(해당 요소의 수열 길이 + 1) 이 현재 숫자에 해당하는 수열 길이인 것이다.
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const len = Number(inputList[0]);
const numList = inputList[1].split(' ').map(Number);

const arrList = [[numList[0]]]; // 각각의 수열이 저장됨
const lengthList = [1];

let longestIdx = 0;

for (let i = 1; i < len; i++) {
  let longIdx = -1;
  let longLen = 0;
  for (let j = 0; j < i; j++) {
    if (numList[j] < numList[i] && lengthList[j] > longLen) {
      longIdx = j;
      longLen = lengthList[j];
    }
  }

  lengthList[i] = longLen + 1;
  arrList[i] =
    longIdx !== -1 ? [...arrList[longIdx], numList[i]] : [numList[i]];

  longestIdx = lengthList[i] > lengthList[longestIdx] ? i : longestIdx;
}

const resLen = arrList[longestIdx].length;
const resArr = arrList[longestIdx].join(' ');

console.log(resLen + '\n' + resArr);

/////////////////////////////
