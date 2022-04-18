// 소수 찾기
/*
TODO: 주어진 수 N개 중에서 소수가 몇 개인지 찾아서 출력
num이 소수인지 확인하는 방법은 num^(1/2)까지 하나씩 나눠보고 나머지가 0인게 없으면 소수다
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().split('\n');

///////////////////////////////

const [len, list] = inputList;
const arr = list.split(' ').map(Number);

const checkPrime = (num) => {
  if (num < 2) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
};

let count = 0;
arr.forEach((n) => {
  count += checkPrime(n);
});

console.log(count);

/////////////////////////////
