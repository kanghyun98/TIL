// 링크와 스타트
/* 
TODO: 스타트 팀과 링크 팀의 능력치의 차이의 최솟값 구하기
두 팀으로 나누는 경우의 수 구하고 두 팀 간의 점수 비교
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const [len, ...list] = inputList;

const playerNum = Number(len);
const arr = list.map((str) => str.split(' ').map(Number));

const visited = Array(playerNum).fill(false);
let balancedScore = Number.MAX_SAFE_INTEGER;

const dps = (lev) => {
  if (lev === playerNum) {
    checkScore(); // 능력치 비교
    return;
  }

  visited[lev] = true;
  dps(lev + 1);
  visited[lev] = false;
  dps(lev + 1);
};

const checkScore = () => {
  let teamA = 0;
  let teamB = 0;
  for (let i = 0; i < playerNum - 1; i++) {
    for (let j = i + 1; j < playerNum; j++) {
      if (visited[i] && visited[j]) {
        teamA += arr[i][j] + arr[j][i];
      } else if (!visited[i] && !visited[j]) {
        teamB += arr[i][j] + arr[j][i];
      }
    }
  }

  const score = Math.abs(teamA - teamB);

  if (score < balancedScore) {
    balancedScore = score;
  }
};

dps(0);

console.log(balancedScore);

/////////////////////////////
