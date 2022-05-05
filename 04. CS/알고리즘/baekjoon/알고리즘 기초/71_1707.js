// 이분 그래프
/* 
그래프의 정점의 집합을 둘로 분할하여, 각 집합에 속한 정점끼리는 서로 인접하지 않도록 분할할 수 있을 때, 그러한 그래프를 특별히 이분 그래프 (Bipartite Graph) 라 부른다.
TODO: 그래프가 입력으로 주어졌을 때, 이 그래프가 이분 그래프인지 아닌지 판별하기
dfs나 bfs로 visited를 1,2 채워가면서 돌다가, 연속된 색상을 마주치면 아닌것으로 판별
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

/////////////////////////////
// dfs 방식
const [len, ...list] = inputList;
let testcase = Number(len);
let startIdx = 0;

let result = true;
const dfs = (nowNode, color, visited, nodeList) => {
  visited[nowNode] = color;

  const nextColor = color === 1 ? 2 : 1;
  nodeList[nowNode].forEach((nextNode) => {
    if (visited[nextNode] === visited[nowNode]) result = false;
    if (!visited[nextNode]) {
      dfs(nextNode, nextColor, visited, nodeList);
    }
  });
};

while (testcase) {
  const [V, E] = list[startIdx].split(' ').map(Number);
  const graphArr = [...Array(V + 1)].map(() => []);

  const targetArr = list.slice(startIdx + 1, startIdx + E + 1);
  targetArr.forEach((str) => {
    const [i, j] = str.split(' ').map(Number);
    graphArr[i].push(j);
    graphArr[j].push(i);
  });

  const visited = Array(V).fill(0);
  for (let k = 1; k <= V; k++) {
    if (!visited[k]) {
      dfs(k, 1, visited, graphArr);
    }
  }

  console.log(result ? 'YES' : 'NO');

  result = true;
  startIdx += E + 1;
  testcase--;
}

///////////////////////////

// /////////////////////////////
// // bfs 방식
// const [len, ...list] = inputList;
// let testcase = Number(len);
// let startIdx = 0;

// let result = true;
// const bfs = (nowNode, color, visited, nodeList) => {
//   const queue = [];
//   queue.push(nowNode);
//   visited[nowNode] = color;

//   while (queue.length) {
//     const dequeuedVal = queue.shift();
//     color = visited[dequeuedVal] === 1 ? 2 : 1;

//     nodeList[dequeuedVal].forEach((nextNode) => {
//       if (visited[nextNode] === visited[dequeuedVal]) result = false;
//       if (!visited[nextNode]) {
//         queue.push(nextNode);
//         visited[nextNode] = color;
//       }
//     });
//   }
// };

// while (testcase) {
//   const [V, E] = list[startIdx].split(' ').map(Number);
//   const graphArr = [...Array(V + 1)].map(() => []);

//   const targetArr = list.slice(startIdx + 1, startIdx + E + 1);
//   targetArr.forEach((str) => {
//     const [i, j] = str.split(' ').map(Number);
//     graphArr[i].push(j);
//     graphArr[j].push(i);
//   });

//   const visited = Array(V + 1).fill(0);
//   for (let k = 1; k <= V; k++) {
//     if (!visited[k]) {
//       bfs(k, 1, visited, graphArr);
//     }
//   }

//   console.log(result ? 'YES' : 'NO');

//   result = true;
//   startIdx += E + 1;
//   testcase--;
// }

// /////////////////////////////
