function solution(n, computers) {
  const visited = Array(n).fill(false);

  let count = 0;
  visited.forEach((bool, idx) => {
    if (visited[idx]) {
      return;
    }

    count++;

    // bfs
    const queue = [idx];
    while (queue.length > 0) {
      const currNode = queue.shift();
      visited[currNode] = true;

      const nextNodeConnectedList = computers[currNode];

      nextNodeConnectedList.forEach((connected, nextNode) => {
        if (nextNode === currNode || visited[nextNode] || !connected) {
          return;
        }

        queue.push(nextNode);
      });
    }
  });

  return count;
}
