// 트리의 지름
/* 
TODO: 트리의 지름이란, 트리에서 임의의 두 점 사이의 거리 중 가장 긴 것을 말한다. 트리의 지름을 구하기
- 그래프로 주어졌음.
- bfs로 돌면서 최대 점수 구하기(with visited)

! 각 노드별로 bfs를 한번씩 돌려야되는줄 알았는데 그렇게하면 시간오류 뜸
-> 아무노드에서 bfs 돌려서 그 위치에서의 가장 먼 노드를 구하고, 그 노드와 가장 먼 노드와의 거리가 정답
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const [len, ...list] = inputList;
const nodeLen = Number(len);

// 그래프
const graph = {};
list.forEach((li) => {
  const [node, ...arr] = li.split(' ');
  for (let i = 0; i < arr.length - 1; i += 2) {
    const nodeInfo = [Number(arr[i]), Number(arr[i + 1])]; // Node, lenth
    if (!graph[node]) graph[node] = [];
    graph[node].push(nodeInfo);
  }
});

// bfs
const bfs = (initNode) => {
  const visited = Array(nodeLen + 1).fill(false);

  const queue = [];
  queue.push(initNode);
  visited[initNode] = 0;

  while (queue.length) {
    const node = queue.shift();

    graph[node].forEach((nextNodeInfo) => {
      const [nextNode, length] = nextNodeInfo;
      if (visited[nextNode] === false) {
        queue.push(nextNode);
        visited[nextNode] = visited[node] + length;
      }
    });
  }

  // 최대 거리와 해당 노드 구하기
  let maxNode = 0;
  let maxLength = 0;
  for (const node in visited) {
    if (visited[node] > maxLength) {
      maxNode = node;
      maxLength = visited[node];
    }
  }

  return [maxNode, maxLength];
};

const [anyNode, length] = bfs(1); // 아무거나
const [maxNode, maxLength] = bfs(anyNode);

console.log(maxLength);

/////////////////////////////
