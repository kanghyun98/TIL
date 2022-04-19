// GCD 합
/*
TODO: 양의 정수 n개가 주어졌을 때, 가능한 모든 쌍의 GCD의 합을 구하기
gcd 구하는 함수 추상화,
조합을 돌면서 gcd를 구하여 더한다.

! 테스트 케이스를 forEach문으로 돌렸을 때 계속 오류가 났다. 이유를 알 수 없다. (list.forEach(li) => ...)
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().split('\n');

///////////////////////////////

const [len, ...list] = inputList;
let result = '';

// 최대공약수 구하기
const calcGCD = (x, y) => {
  while (y) {
    [x, y] = x > y ? [y, x % y] : [x, y % x];
  }

  return x;
};

for (let k = 0; k < Number(len); k++) {
  const [n, ...nums] = list[k].split(' ').map(Number);
  let sum = 0;

  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      sum += calcGCD(nums[i], nums[j]);
    }
  }

  if (n === 1) sum += nums[0];

  result += sum + '\n';
}

console.log(result);

/////////////////////////////
