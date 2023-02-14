const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

// 중앙값
const N = Number(inputList[0]);
const nums = inputList[1].split(' ').map(Number);

nums.sort((a, b) => a - b);
const middleIdx = Math.ceil(N / 2) - 1;
const answer = nums[middleIdx];

console.log(answer);

/////////////////////////////
