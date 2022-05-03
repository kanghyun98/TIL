// 리모컨
/* 0 ~ 9, +, -
TODO: 어떤 버튼이 고장났는지 주어졌을 때, 채널 N으로 이동하기 위해서 버튼을 최소 몇 번 눌러야하는지 구하가
브루트포스 알고리즘
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

target = Number(inputList[0]);
brokenLen = Number(inputList[1]);

const brokenList = brokenLen > 0 ? inputList[2].split(' ') : [];

let answer = Math.abs(100 - target);

for (let num = 0; num <= 1000000; num++) {
  let flag = true;
  for (numEle of String(num)) {
    if (brokenList.find((el) => el === numEle)) {
      flag = false;
    }
  }

  if (flag) {
    answer = Math.min(answer, String(num).length + Math.abs(num - target));
  }
}

console.log(answer);

/////////////////////////////
