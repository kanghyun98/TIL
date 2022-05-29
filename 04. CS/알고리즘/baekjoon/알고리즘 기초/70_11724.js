// 연결 요소의 개수
/* 
TODO: 방향 없는 그래프가 주어졌을 때, 연결 요소 (Connected Component)의 개수를 구하기
그래프, DFS 이용
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const [info, ...list] = inputList;

// 정점 개수: N, 간선의 개수: M
const [N, M] = info.split(' ').map(Number);

const arr = [...Array(N + 1)].map(() => []);
list.forEach((str) => {
  const [i, j] = str.split(' ').map(Number);
  arr[i].push(j);
  arr[j].push(i);
});

const visited = Array(N + 1).fill(false);

const dfs = (nowNode) => {
  visited[nowNode] = true;

  arr[nowNode].forEach((nextNode) => {
    if (!visited[nextNode]) {
      dfs(nextNode);
    }
  });
};

let count = 0;
for (let i = 1; i < N + 1; i++) {
  if (!visited[i]) {
    count++;
    dfs(i);
  }
}

console.log(count);

/////////////////////////////
