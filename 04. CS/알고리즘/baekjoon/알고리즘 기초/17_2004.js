// 조합 0의 개수
/*
TODO: 첫째 줄에 nCm의 끝자리 0의 개수
0의 갯수를 count하는 함수를 추상화
nCm = n!/(n-m)!m!
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().split('\n');

///////////////////////////////

const [n, m] = inputList[0].split(' ').map(Number);

let count5 = 0;
let count2 = 0;

const addCount = (num) => {
  let num1 = num;
  while (num1 >= 5) {
    count5 += Math.floor(num1 / 5);
    num1 /= 5;
  }

  let num2 = num;
  while (num2 >= 2) {
    count2 += Math.floor(num2 / 2);
    num2 /= 2;
  }
};

const delCount = (num) => {
  let num1 = num;
  while (num1 >= 5) {
    count5 -= Math.floor(num1 / 5);
    num1 /= 5;
  }

  let num2 = num;
  while (num2 >= 2) {
    count2 -= Math.floor(num2 / 2);
    num2 /= 2;
  }
};

addCount(n);
delCount(n - m);
delCount(m);

const result = Math.min(count5, count2);
console.log(result);

/////////////////////////////
