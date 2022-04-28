// 2×n 타일링 2
/*
TODO: 2×n 타일링 2
n크기의 직사각형을 채우는 방법 = n-1 크기의 직사각형을 채우는 방법 + (n-2 크기의 직사각형을 채우는 방법 x 2)
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().split('\n');

///////////////////////////////

let inputLen = Number(inputList[0]);

const arr = Array(inputLen + 1);

arr[0] = 0;
arr[1] = 1;
arr[2] = 3;

for (let i = 3; i <= inputLen; i++) {
  arr[i] = (arr[i - 1] + arr[i - 2] * 2) % 10007;
}

console.log(arr[inputLen]);

/////////////////////////////
