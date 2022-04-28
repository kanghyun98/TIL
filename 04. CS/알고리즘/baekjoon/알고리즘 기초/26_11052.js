// 카드 구매하기
/*
TODO: 구매하려는 카드 갯수를 최대한 비싸게 사는 패키지 구성 방법
2개를 가장 비싸게 구매하는 방법, 3개를 가장 비싸게 구매하는 방법, ... 을 순차적으로 구한다.
다음 요소는 이전 요소들의 조합으로 가장 비싼 방법을 구할 수 있다.
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const targetNum = Number(inputList[0]);
const packageList = inputList[1].split(' ').map(Number);

const dp = [0, ...packageList]; // 카드팩 1개만 구매한 금액으로 초기화

for (let i = 2; i <= targetNum; i++) {
  for (let j = 1; j < i; j++) {
    dp[i] = Math.max(dp[i], dp[i - j] + dp[j]);
  }
}

console.log(dp[targetNum]);

/////////////////////////////
