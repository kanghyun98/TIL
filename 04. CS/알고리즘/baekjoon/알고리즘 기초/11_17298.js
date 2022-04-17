// 오큰수
/*
TODO: 각 숫자의 우측에 있는 값들 중 가장 가까우며 큰 값 구하기
시간초과된 for문에서는 기준이 오큰수를 찾는 대상이었다면,
stack을 이용한 방식은 기준이 오큰수가 될 대상이다.

- stack에는 기준값보다 왼쪽에 있는 숫자들의 idx가 들어가고, 
- while문에서는 stack의 top에 해당하는 값과 오큰수가 될 대상을 비교하여 
  - top이 더 작다면, stack에서 pop하여 해당 위치에 오큰수를 넣어준다. -> 반복

stack에는 자연스럽게 top에 오큰수를 찾지 못한 값들 중 가장 작은 값이 위치하므로, 
top에 위치하는 값이 못찾았다면 그 아래에 있는 값들도 당연히 못찾은 것이므로
비교 횟수가 매우 줄어든다!
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().split('\n');

///////////////////////////////

const [len, ...list] = inputList;
const arr = list[0].split(' ').map(Number);
const stack = []; // idx값 들어감 (아직 오큰수 못찾은)
const result = Array(arr.length).fill(-1);

for (let i = 0; i < arr.length; i++) {
  while (stack.length && arr[stack[stack.length - 1]] < arr[i]) {
    result[stack.pop()] = arr[i];
  }

  stack.push(i);
}

console.log(result.join(' '));

///////////////////////////////

//! 시간 초과
// 우측에 큰 값 나오면 반복문 종료, 끝까지 비교한 경우 -1 반환
///////////////////////////////

// const [len, ...list] = inputList;
// let result = '';

// const arr = list[0].split(' ');

// arr.forEach((num, idx) => {
//   while (idx < len) {
//     idx++;
//     const before = Number(arr[idx - 2]);
//     const curr = Number(num);
//     const right = Number(arr[idx]);
//     if (right > curr || idx === Number(len)) {
//       result += (right || -1) + ' ';
//       break;
//     }
//   }
// });

// console.log(result);

/////////////////////////////
