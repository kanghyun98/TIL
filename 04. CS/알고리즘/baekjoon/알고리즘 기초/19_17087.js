// 숨바꼭질 6
/*
TODO: 수빈이는 현재 점 S에 있고, 동생은 A1, A2, ..., AN에 있을 때, 
      1초에 D만큼 이동 가능, 위치가 같으면 칮았다고 했을 때, D의 최댓값

동생들 위치 - 수빈이 위치 (음수면 양수로 변경)
최대공약수
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().split('\n');

///////////////////////////////

const [firstLine, secLine] = inputList;
const [N, S] = firstLine.split(' ').map(Number);
const broLocs = secLine.split(' ').map(Number);

// 동생들 위치 - 수빈이 위치 (음수면 양수로 변경)
const list = broLocs.map((n) => {
  const diff = n - S < 0 ? S - n : n - S;
  return diff;
});

const calcGCD = (a, b) => {
  if (a === b) {
    return a;
  }

  while (b) {
    [a, b] = a > b ? [b, a % b] : [a, b % a];
  }

  return a;
};

let gcd = list[0];
for (let i = 1; i < N; i++) {
  gcd = calcGCD(gcd, list[i]);
}

console.log(gcd);

/////////////////////////////
