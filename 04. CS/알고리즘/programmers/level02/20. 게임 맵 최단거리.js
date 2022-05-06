// bfs를 이용한 방식
function solution(maps) {
  const dRow = [0, 0, 1, -1];
  const dCol = [1, -1, 0, 0];
  const [r, c] = [maps.length, maps[0].length];

  // 이동 거리 기록
  const visited = Array(r)
    .fill()
    .map(() => Array(c).fill(0));
  visited[0][0] = 1;

  const queue = [[0, 0]];

  while (queue.length > 0) {
    const [row, col] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const [nextRow, nextCol] = [row + dRow[i], col + dCol[i]];

      if (nextRow < 0 || nextCol < 0 || nextRow >= r || nextCol >= c) {
        continue;
      }

      if (maps[nextRow][nextCol] && !visited[nextRow][nextCol]) {
        visited[nextRow][nextCol] = visited[row][col] + 1;
        queue.push([nextRow, nextCol]);
      }
    }
  }

  return visited[r - 1][c - 1] || -1;
}
