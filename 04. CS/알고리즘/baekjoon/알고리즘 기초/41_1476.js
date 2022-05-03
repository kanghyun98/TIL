// 날짜 계산
/*
1 ≤ E ≤ 15, 1 ≤ S ≤ 28, 1 ≤ M ≤ 19
TODO: E S M이 우리가 알고 있는 연도로 몇 년인지 구하기
브루트포스 알고리즘
! 메모리 초과가 계속 뜨길래 파이썬으로 풀어서 제출했다.
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const [E, S, M] = inputList[0].split(' ').map(Number);
const [maxE, maxS, maxM] = [15, 28, 19];

let i = 1;
while (true) {
  if ((i - E) % maxE === 0 && (i - S) % maxS === 0 && (i - M) % maxM === 0) {
    console.log(i);
    break;
  }

  i++;
}

/////////////////////////////
