const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const N = Number(inputList[0]);
const soldiers = inputList[1].split(' ').map(Number);

const dp = Array(N).fill(1);

// 매번 i 위치보다 낮은 위치 애들 중 값이 큰 애들의 내림차순 만족하는 개수 구하기
for (let i = 1; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (soldiers[j] > soldiers[i]) {
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
}

// 열외해야 하는 병사 최소수
const answer = N - Math.max(...dp);
console.log(answer);

/////////////////////////////
