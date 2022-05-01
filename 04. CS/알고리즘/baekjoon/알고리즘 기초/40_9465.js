// 스티커
/*
TODO: 각 스티커에 점수를 매기고, 점수의 합이 최대가 되게 스티커를 떼어내는 방법 구하기
(스티커는 2행 n열로 배치, 스티커와 변을 공유하는 스티커는 모두 찢어져서 사용할 수 없음)

우2하1 vs (우1하1 + 우2) 임을 이용해 아래 점화식을 만든다.
dp[r1][i] = arr[r1][i-1] + (dp[r2][i-1], dp[r2][i-2]) 
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const [testLen, ...list] = inputList;

for (let i = 0; i < list.length; i += 3) {
  const colLen = Number(list[i]);
  const row1 = list[i + 1].split(' ').map(Number);
  const row2 = list[i + 2].split(' ').map(Number);
  const arr = [row1, row2];

  const dp = [Array(colLen + 1).fill(0), Array(colLen + 1).fill(0)];
  dp[0][1] = arr[0][0];
  dp[1][1] = arr[1][0];

  for (let j = 0; j < 2; j++) {
    for (let k = 2; k <= colLen; k++) {
      dp[0][k] = arr[0][k - 1] + Math.max(dp[1][k - 1], dp[1][k - 2]);
      dp[1][k] = arr[1][k - 1] + Math.max(dp[0][k - 1], dp[0][k - 2]);
    }
  }

  const result = Math.max(dp[0][colLen], dp[1][colLen]);
  console.log(result);
}

/////////////////////////////
