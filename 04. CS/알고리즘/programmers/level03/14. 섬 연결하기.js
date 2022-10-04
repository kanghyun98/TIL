// 크루스칼 알고리즘 (BST)
function solution(n, costs) {
  // 간선의 비용으로 오름차순으로 정렬
  costs.sort((a, b) => a[2] - b[2]);

  // 각 정점이 포함된 그래프가 어디인지 저장
  const set = [...Array(n)].map((_, i) => i);

  // 간선을 순서대로 선택
  let sum = 0;

  costs.forEach((cost) => {
    const nodeA = cost[0] - 1;
    const nodeB = cost[1] - 1;
    const dist = cost[2];

    // 선택한 간선을 추가했을 때 사이클이 생기지 않으면 BST에 포함
    if (!checkCycle(set, nodeA, nodeB)) {
      sum += dist;
      unionParent(set, nodeA, nodeB);
    }
  });

  return sum;
}

// union-find 사용
function checkCycle(set, a, b) {
  const aP = getParent(set, a);
  const bP = getParent(set, b);

  return aP === bP;
}

function unionParent(set, a, b) {
  const aP = getParent(set, a);
  const bP = getParent(set, b);

  aP < bP ? (set[bP] = aP) : (set[aP] = bP);
}

function getParent(set, x) {
  if (set[x] === x) return x;

  set[x] = getParent(set, set[x]);
  return set[x];
}
