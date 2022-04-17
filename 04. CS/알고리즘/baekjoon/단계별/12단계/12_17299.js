// 오등큰수
/*
TODO: adfs
- 각 숫자가 등장한 횟수를 구하기
- 등큰수와 같은 방식으로 진행하되, 값의 비교를 등장 횟수로 진행한다.
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().split('\n');

///////////////////////////////

const [len, ...list] = inputList;
const arr = list[0].split(' ');
const stack = [];
const result = Array(arr.length).fill(-1).map(Number);

// 각 숫자의 갯수 파악
const dict = {};
arr.forEach((num) => {
  dict[num] = (dict[num] || 0) + 1;
});

for (let i = 0; i < arr.length; i++) {
  while (stack.length && dict[arr[stack[stack.length - 1]]] < dict[arr[i]]) {
    result[stack.pop()] = arr[i];
  }

  stack.push(i);
}

console.log(result.join(' '));
/////////////////////////////
