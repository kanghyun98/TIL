// 팩토리얼 0의 개수
/*
TODO: N!에서 뒤에서부터 처음 0이 아닌 숫자가 나올 때까지 0의 개수를 구하기
팩토리얼 뒤에 0이 나오려면 10이 곱해져야 한다. 
-> 다 곱해졌을 때 5와 2의 개수를 구하고, 그 중 작은 개수만큼 10이 곱해진다.
(힝싱 5가 적기 떄문에 5의 개수를 구하였다)
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().split('\n');

///////////////////////////////

let num = Number(inputList[0]);

let count5 = 0;

while (num >= 5) {
  count5 += Math.floor(num / 5);
  num /= 5;
}

console.log(count5);
/////////////////////////////

// 팩토리얼을 구하는 함수와 0을 카운트하는 함수를 추상화하여 해결 => n이 500까지 커질 수 있어 이 방식으론 불가능
///////////////////////////////

// const num = Number(inputList[0]);

// const getFactorial = (n) => {
//   if (n === 1 || n === 0) return 1;
//   return n * getFactorial(n - 1);
// };

// const checkZeroCount = (n, count) => {
//   const res = n / 10;
//   const last = n % 10;

//   if (last === 0) {
//     return checkZeroCount(res, count + 1);
//   } else {
//     return count;
//   }
// };

// const facNum = getFactorial(num);
// const result = checkZeroCount(facNum, 0);

// console.log(result);

/////////////////////////////
