// 도시 개수: N, 도로 개수: M, 거리 정보: K, 출발 도시: X
function solve(...inputs) {
  const [input1, ...input2] = inputs;

  const [N, M, K, X] = input1.split(' ').map(Number);
  const roadInfo = input2.map((s) => s.split(' ').map(Number));

  const dist = Array(M + 1).fill(Number.MAX_SAFE_INTEGER);

  // graph
  const graph = {};
  roadInfo.forEach((info) => {
    if (!graph[info[0]]) {
      graph[info[0]] = [];
    }

    graph[info[0]].push(info[1]);
  });

  // bfs
  const queue = [[X, 0]];
  dist[X] = 0;

  while (queue.length) {
    const [currNode, lev] = queue.shift();

    if (graph[currNode]) {
      graph[currNode].forEach((nextNode) => {
        if (dist[nextNode] > dist[currNode] + 1) {
          dist[nextNode] = dist[currNode] + 1;
          queue.push([nextNode, lev + 1]);
        }
      });
    }
  }

  // 개수 파악
  const answer = [];

  dist.forEach((d, idx) => {
    if (d === K) answer.push(idx);
  });

  return answer.length === 0 ? -1 : answer.join(' ');
}

// test
const answer1 = '4';
const test1 = solve('4 4 2 1', '1 2', '1 3', '2 3', '2 4');
console.log(answer1 === test1);

const answer2 = -1;
const test2 = solve('4 3 2 1', '1 2', '1 3', '1 4');
console.log(answer2 === test2);

const answer3 = '2 3';
const test3 = solve('4 4 1 1', '1 2', '1 3', '2 3', '2 4');
console.log(answer3 === test3);
