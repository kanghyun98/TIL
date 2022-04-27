// 2×n 타일링
/*
TODO: 2×n 크기의 직사각형을 1×2, 2×1 타일로 채우는 방법의 수를 구하기
n크기의 직사각형을 채우는 방법 = n-1 크기의 직사각형을 채우는 방법 + n-2 크기의 직사각형을 채우는 방법
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().split('\n');

///////////////////////////////

let inputLen = Number(inputList[0]);

const arr = Array(inputLen + 1);

arr[0] = 0;
arr[1] = 1;
arr[2] = 2;

for (let i = 3; i <= inputLen; i++) {
  arr[i] = (arr[i - 1] + arr[i - 2]) % 10007;
}

console.log(arr[inputLen]);

/////////////////////////////

// ! 시간초과했던 방법 (dfs)
// ///////////////////////////////

// const [inputLen] = inputList.map(Number);
// let totalCount = 0;

// const dfs = (lastLen) => {
//   if (lastLen === 0) {
//     totalCount++;
//     return;
//   }

//   if (lastLen > 1) dfs(lastLen - 2);
//   dfs(lastLen - 1);
// };

// dfs(inputLen);

// console.log(totalCount % 10007);

// /////////////////////////////
