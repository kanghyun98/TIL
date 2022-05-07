// bfs
function solution(N, road, K) {
  const graph = {};
  const dist = Array(N + 1).fill(Number.MAX_SAFE_INTEGER);

  // graph 만들기
  for (let i = 0; i < road.length; i++) {
    const fromNode = road[i][0];
    const toNode = road[i][1];
    const cost = road[i][2];

    if (!graph[fromNode]) graph[fromNode] = [];
    if (!graph[toNode]) graph[toNode] = [];

    graph[fromNode].push([toNode, cost]);
    graph[toNode].push([fromNode, cost]);
  }

  dist[1] = 0;
  const queue = [[1, 0]];

  // 실행
  while (queue.length) {
    const [currentNode, cost] = queue.shift();

    graph[currentNode].forEach((node) => {
      const [nextNode, nextCost] = node;

      if (dist[nextNode] > dist[currentNode] + nextCost) {
        dist[nextNode] = dist[currentNode] + nextCost;
        queue.push([nextNode, nextCost]);
      }
    });
  }

  return dist.filter((val) => val <= K).length;
}
