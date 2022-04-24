// -2진수
/*
TODO: 10진수로 주어진 숫자를 -2진수로 표현하기
진수계산법을 이용하여 해결할 수 있다. 
주어진 숫자(or 몫)를 -2로 계속 나누고, 나머지(0 or 1)를 배열에 push해서 나머지들로 -2진수를 구할 수 있다.
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().split('\n');

///////////////////////////////

let num = Number(inputList[0]);
const resArr = [];

while (num) {
  const quotient = Math.ceil(num / -2); // 몫
  const remainder = num < 0 ? -(num % -2) : num % -2; // 나머지

  num = quotient;
  resArr.unshift(remainder);
}

const result = resArr.join('') || '0';
console.log(result);

/////////////////////////////
