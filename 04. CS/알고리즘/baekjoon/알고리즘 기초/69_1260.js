// DFS와 BFS

/* 
TODO: 그래프를 DFS로 탐색한 결과와 BFS로 탐색한 결과를 출력
조건) 방문할 수 있는 정점이 여러 개인 경우에는 정점 번호가 작은 것을 먼저 방문하고, 더 이상 방문할 수 있는 점이 없는 경우 종료
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const [info, ...list] = inputList;

// 정점 갯수: N, 간선의 갯수: M, 탐색 시작 정점 번호: V
const [N, M, V] = info.split(' ').map(Number);

const arr = [...Array(N + 1)].map(() => []);
list.forEach((str) => {
  const [i, j] = str.split(' ').map(Number);
  arr[i].push(j);
  arr[j].push(i);
});
arr.forEach((li) => li.sort((a, b) => a - b));

// DFS
const dfsVisited = Array(N + 1).fill(false);
const dfsLog = [];

const dfs = (nowNode) => {
  dfsVisited[nowNode] = true;
  dfsLog.push(nowNode);

  arr[nowNode].forEach((nextNode) => {
    if (!dfsVisited[nextNode]) {
      dfs(nextNode);
    }
  });
};

// BFS
const bfsVisited = Array(N + 1).fill(false);
const bfsLog = [];

const bfs = (nowNode) => {
  const queue = [];
  queue.push(nowNode);
  bfsLog.push(nowNode);

  while (queue.length) {
    const dequeuedVal = queue.shift();
    bfsVisited[dequeuedVal] = true;

    arr[dequeuedVal].forEach((nextNode) => {
      if (!bfsVisited[nextNode]) {
        queue.push(nextNode);
        bfsVisited[nextNode] = true;
        bfsLog.push(nextNode);
      }
    });
  }
};

dfs(V);
bfs(V);

console.log(dfsLog.join(' '));
console.log(bfsLog.join(' '));

/////////////////////////////
