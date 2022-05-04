// 외판원 순회 2
/*
외판원 순회 문제는 영어로 Traveling Salesman problem (TSP) 라고 불리는 문제로 computer science 분야에서 가장 중요하게 취급되는 문제 중 하나이다.  
TODO: N과 비용 행렬이 주어졌을 때, 가장 적은 비용을 들이는 외판원의 순회 여행 경로를 구하기
dfs 방식으로 집들을 순회하는 루트의 비용을 계산한다.
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const [lenStr, ...list] = inputList;

const len = Number(lenStr);
const arr = list.map((str) => str.split(' ').map(Number));
const visited = Array(len).fill(0);

let result = Number.MAX_SAFE_INTEGER;

const dfs = (lev, init, now, score) => {
  if (lev === len) {
    if (arr[now][init]) {
      score += arr[now][init];
      result = score < result ? score : result;
    }
    return;
  }

  for (let next = 0; next < len; next++) {
    if (!visited[next] && arr[now][next]) {
      visited[next] = 1;
      dfs(lev + 1, init, next, score + arr[now][next]);
      visited[next] = 0;
    }
  }
};

// 시작 포인트를 한번씩 순회
for (let i = 0; i < len; i++) {
  visited[i] = 1;
  dfs(1, i, i, 0);
  visited[i] = 0;
}

console.log(result);

/////////////////////////////
