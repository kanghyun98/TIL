// 이친수
/*
TODO: 
배열 [0으로 끝나는 개수(a), 1로 끝나는 개수(b)] 를 만들고,
0으로 끝난 수는 0,1 이 뒤에 올 수 있고, 1로 끝난 수는 0이 뒤에 올 수 있으므로,
N자리 수의 0으로 끝나는 수가 a개, 1로 끝나는 수가 b개이면
N+1자리 수의 0으로 끝나는 수가 a+b개, 1로 끝나는 수가 a개이다.

! BigInt 때문에 한 번 틀렸다. 일반 정수형으로 나타낼 수 있는 범위를 기억하자.
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const n = Number(inputList[0]);
const arr = [0, 1]; // [0으로 끝나는 개수, 1로 끝나는 개수]

for (let i = 1; i < n; i++) {
  let zeroNums = BigInt(arr[0]);
  let oneNums = BigInt(arr[1]);

  arr[0] = zeroNums + oneNums;
  arr[1] = zeroNums;
}

const result = String(arr[0] + arr[1]);
console.log(result);

/////////////////////////////
