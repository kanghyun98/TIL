function solution(n, edge) {
  // 그래프 만들기
  const graph = {};

  for (let i = 0; i < edge.length; i++) {
    const [fromNode, toNode] = edge[i];

    if (!graph[fromNode]) graph[fromNode] = [];
    if (!graph[toNode]) graph[toNode] = [];

    graph[fromNode].push(toNode);
    graph[toNode].push(fromNode);
  }

  // 최단 거리 이동 기록
  const dist = Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
  dist[0] = 0;
  dist[1] = 0; // 1번 노드 (시작 노드)

  const queue = [1];
  while (queue.length) {
    const currNode = queue.shift();

    graph[currNode].forEach((nextNode) => {
      // 업데이트 (최단 기록 갱신)
      if (dist[nextNode] > dist[currNode] + 1) {
        dist[nextNode] = dist[currNode] + 1;
        queue.push(nextNode);
      }
    });
  }

  // 가장 멀리 떨어진 노드 개수 구하기
  let count = 0;
  let maxVal = 0;

  dist.forEach((d) => {
    if (d > maxVal) {
      count = 0;
      maxVal = d;
    }

    if (d === maxVal) {
      count += 1;
    }
  });

  return count;
}
