const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const [n, ...arr] = inputList;
const N = Number(n);

// 순서: 위 -> 왼 -> 우 -> 아래
const dr = [-1, 0, 0, 1];
const dc = [0, -1, 1, 0];

// 상어 초기 상태
let size = 2;
let location = [0, 0]; // [r, c]
let time = 0;
let ate = 0;

// 공간
const space = arr.map((li, rIdx) =>
  li.split(' ').map((n, cIdx) => {
    const num = Number(n);

    // 상어 초기 위치
    if (num === 9) {
      location = [rIdx, cIdx];
    }

    return num;
  })
);

space[location[0]][location[1]] = 0;

while (true) {
  // bfs
  const queue = [[...location, 0]]; // [r, c, dist]
  const foods = [];

  const visited = Array(N)
    .fill()
    .map(() => Array(N).fill(false));

  while (queue.length) {
    const [x, y, dist] = queue.shift();

    // 먹이 찾음! (bfs 초기화)
    if (space[x][y] > 0 && space[x][y] < size) {
      foods.push([x, y, dist]);
    }

    for (let d = 0; d < 4; d++) {
      const [nx, ny] = [x + dr[d], y + dc[d]];

      if (nx < 0 || ny < 0 || nx >= N || ny >= N) {
        continue;
      }

      if (visited[nx][ny] || space[nx][ny] > size) {
        continue;
      }

      queue.push([nx, ny, dist + 1]);
      visited[nx][ny] = true;
    }
  }

  if (!foods.length) {
    break;
  }

  foods.sort((a, b) => {
    // 가까운 순서
    if (a[2] !== b[2]) {
      return a[2] - b[2];
    }

    // 위 먼저
    const rDiff = a[0] - b[0];
    if (rDiff) {
      return rDiff;
    }

    // 왼쪽 먼저
    const cDiff = a[1] - b[1];
    return cDiff;
  });

  const [fx, fy, fDist] = foods[0];
  space[fx][fy] = 0;
  ate += 1;
  if (ate >= size) {
    size += 1;
    ate = 0;
  }

  location = [fx, fy];
  time += fDist;
}

console.log(time);

/////////////////////////////
