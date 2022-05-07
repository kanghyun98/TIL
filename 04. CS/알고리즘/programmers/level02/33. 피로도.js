// dfs
function solution(k, dungeons) {
  const len = dungeons.length;
  const visited = Array(len).fill(0);

  let maxCount = 0;
  const dfs = (lastTired, count) => {
    if (count > maxCount) maxCount = count;

    for (let i = 0; i < len; i++) {
      if (!visited[i] && lastTired - dungeons[i][0] >= 0) {
        visited[i] = 1;
        dfs(lastTired - dungeons[i][1], count + 1);
        visited[i] = 0;
      }
    }
  };

  dfs(k, 0);

  return maxCount;
}
