// bfs
function solution(n, wires) {
  const tree = {};
  for (const [a, b] of wires) {
    tree[a] ? tree[a].push(b) : (tree[a] = [b]);
    tree[b] ? tree[b].push(a) : (tree[b] = [a]);
  }

  const bfs = (root, parent) => {
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

  let answer = n;
  for (const [a, b] of wires) {
    const diff = Math.abs(n - bfs(a, b) * 2);
    answer = answer > diff ? diff : answer;
  }

  return answer;
}
