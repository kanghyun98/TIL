// 골드바흐의 추측
/*
list의 가장 큰 수로 prime을 판단할 수 있는 배열 생성 (idx값으로 확인할 수 있게)
num = a + b 이면, b = num - a 이므로,
소수 판단 배열에 idx값으로 a, num - a를 넣어 둘 다 소수인지 판단
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().split('\n');

///////////////////////////////
const list = inputList.map(Number);
list.pop();

const getPrimeIdx = (num) => {
  const arr = Array(num + 1).fill(1);
  arr[0] = arr[1] = 0;

  for (let i = 2; i <= num; i++) {
    if (arr[i]) {
      for (let k = 2; k * i <= num; k++) {
        arr[k * i] = 0;
      }
    }
  }

  arr[2] = 0; // 홀수인 소수를 원하므로 추가!

  return arr;
};

// 소수 판단하는 배열 생성
const primeArr = getPrimeIdx(Math.max(...list));

list.forEach((num) => {
  for (let i = 3; i < num; i += 2) {
    if (primeArr[i] && primeArr[num - i]) {
      console.log(`${num} = ${i} + ${num - i}`);
      break;
    }
  }
});

/////////////////////////////
