// 골드바흐 파티션
/*
TODO: 골드바흐 파티션의 갯수 구하기
골드바흐의 추측: 2보다 큰 짝수는 두 소수의 합으로 나타낼 수 있다.
골드바흐 파티션: 짝수 N을 두 소수의 합으로 나타내는 표현
-> 소수를 판단할 수 있는 배열을 하나 만들고, 숫자를 넣어가면서 골드바흐 파티션의 갯수를 파악한다.

! inputList를 만들 때 .trim() 안해줬다고 계속 오류가 났었다...!!!!!
*/

const fs = require('fs');
const inputList = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

///////////////////////////////

const [len, ...list] = inputList;

const getPrimeArr = (num) => {
  const arr = Array(num + 1).fill(true);
  arr[0] = arr[1] = 0;

  for (let i = 2; i <= num; i++) {
    if (arr[i]) {
      for (let k = i * i; k <= num; k += i) {
        arr[k] = false;
      }
    }
  }

  return arr;
};

// 소수 판단하는 배열 생성
const primeArr = getPrimeArr(Math.max(...list));

const result = [];
list.forEach((num) => {
  let count = 0;

  for (let i = 3; i <= Math.ceil(num / 2); i += 2) {
    if (primeArr[i] && primeArr[num - i]) {
      count++;
    }
  }

  if (num === 4) count = 1;

  result.push(count);
});

console.log(result.join('\n'));

/////////////////////////////
