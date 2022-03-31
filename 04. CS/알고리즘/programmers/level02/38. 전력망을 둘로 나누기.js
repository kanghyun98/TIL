function solution(n, wires) {
  const tree = {};
  for (const [a, b] of wires) {
    tree[a] ? tree[a].push(b) : (tree[a] = [b]);
    tree[b] ? tree[b].push(a) : (tree[b] = [a]);
  }

  const searchTree = (root, parent) => {
    let count = 0;
    const queue = [root];
    const isVisited = [];
    isVisited[root] = true;

    while (queue.length) {
      const cur = queue.pop();
      tree[cur].map((child) => {
        if (child !== parent && !isVisited[child]) {
          isVisited[child] = true;
          queue.push(child);
        }
      });
      count++;
    }
    return count;
  };

  // 완전 탐색
  let answer = n;
  for (const [a, b] of wires) {
    const diff = Math.abs(searchTree(a, b) - searchTree(b, a));
    answer = answer > diff ? diff : answer;
  }

  return answer;
}
