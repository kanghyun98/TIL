//카잉 달력
/* 
TODO: 네 개의 정수 M, N, x와 y가 주어질 때, <M:N>이 카잉 달력의 마지막 해라고 하면 <x:y>는 몇 번째 해를 나타내는지 구하기
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const [len, ...list] = inputList;

list.forEach((str) => {
  let [M, N, x, y] = str.split(' ').map(Number);
  const last = lcm(M, N);

  while (true) {
    if (x > last || y > last) {
      console.log(-1);
      break;
    } else if (x > y) {
      y += N;
    } else if (x < y) {
      x += M;
    } else if (x === y) {
      console.log(x);
      break;
    }
  }
});

function gcd(x, y) {
  while (y) {
    [x, y] = x > y ? [y, x % y] : [x, y % x];
  }
  return x;
}

function lcm(x, y) {
  return (x * y) / gcd(x, y);
}
/////////////////////////////
