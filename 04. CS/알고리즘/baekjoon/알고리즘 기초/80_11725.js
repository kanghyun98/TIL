// 트리의 부모 찾기
/* 
TODO: 루트 없는 트리가 주어진다. 이때, 트리의 루트를 1이라고 정했을 때, 각 노드의 부모를 구하기
그래프를 만들고, 루트부터 돌면서 visited에 부모 노드 저장
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const [len, ...list] = inputList;
const nodeLen = Number(len);

const graph = [...Array(Number(nodeLen + 1))].map(() => []);
list.forEach((str) => {
  const [i, j] = str.split(' ').map(Number);
  graph[i].push(j);
  graph[j].push(i);
});

const visited = Array(nodeLen + 1).fill(0);

const dfs = (node) => {
  graph[node].forEach((nextNode) => {
    if (!visited[nextNode]) {
      visited[nextNode] = node;
      dfs(nextNode);
    }
  });
};

dfs(1);

let result = '';
for (let i = 2; i <= nodeLen; i++) {
  result += visited[i] + '\n';
}
console.log(result.trim());

/////////////////////////////
