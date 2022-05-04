// N과 M (10)
/* 
TODO: 자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하기
- 슷지 리스트가 주어짐 (중복 포함)
- N개의 자연수 중에서 M개를 고른 수열
- 고른 수열은 비내림차순이어야 한다.
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

let result = '';
const [N, M] = inputList[0].split(' ').map(Number);
const numList = inputList[1]
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);

const arr = [];
const visited = Array(N).fill(false);

const dfs = (lev) => {
  if (arr.length === M) {
    result += arr.join(' ') + '\n';
    return;
  }

  let overlap = 0;
  for (let i = lev; i < N; i++) {
    if (!visited[i] && overlap !== numList[i]) {
      overlap = numList[i];
      visited[i] = true;
      arr.push(numList[i]);
      dfs(i + 1);
      arr.pop();
      visited[i] = false;
    }
  }
};

dfs(0);

console.log(result.trim());

/////////////////////////////
