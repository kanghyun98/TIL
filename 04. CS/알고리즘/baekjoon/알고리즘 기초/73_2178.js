// 미로 탐색
/* 
TODO: 미로가 주어졌을 때, (1, 1)에서 출발하여 (N, M)의 위치로 이동할 때 지나야 하는 최소의 칸 수를 구하기
bfs
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const [info, ...list] = inputList;

const [row, col] = info.split(' ').map(Number);
const maze = list.map((li) => li.split('').map(Number));
const scoreBoard = Array(row)
  .fill()
  .map(() => Array(col).fill(0));

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

const bfs = () => {
  const queue = [];
  queue.push([0, 0]);
  scoreBoard[0][0] = 1;

  while (queue.length) {
    const [x, y] = queue.shift();

    // 상하좌우로 이동
    for (let i = 0; i < 4; i++) {
      const [nx, ny] = [x + dx[i], y + dy[i]];

      if (nx < 0 || nx >= row || ny < 0 || ny >= col) continue;

      if (maze[nx][ny] && !scoreBoard[nx][ny]) {
        scoreBoard[nx][ny] = scoreBoard[x][y] + 1;
        queue.push([nx, ny]);
      }
    }
  }
};

bfs();

console.log(scoreBoard[row - 1][col - 1]);

///////////////////////////////

// ///////////////////////////////
// dfs 방식 (시간 초과)

// const [info, ...list] = inputList;

// const [row, col] = info.split(' ').map(Number);
// const maze = list.map((li) => li.split('').map(Number));

// const dx = [0, 0, 1, -1];
// const dy = [1, -1, 0, 0];

// let shortestCount = Number.MAX_SAFE_INTEGER;
// const dfs = (x, y, count, maze) => {
//   // 도착
//   if (x === row - 1 && y === col - 1) {
//     shortestCount = count < shortestCount ? count : shortestCount;
//     return;
//   }

//   // 이미 기존보다 길면 종료
//   if (count > shortestCount) return;

//   // 상하좌우로 이동
//   for (let i = 0; i < 4; i++) {
//     const [nx, ny] = [x + dx[i], y + dy[i]];

//     if (nx < 0 || nx >= row || ny < 0 || ny >= col) continue;

//     if (maze[nx][ny]) {
//       maze[nx][ny] = 0;
//       dfs(nx, ny, count + 1, maze);
//       maze[nx][ny] = 1;
//     }
//   }
// };

// maze[0][0] = 0;
// dfs(0, 0, 1, maze);
// maze[0][0] = 1;

// console.log(shortestCount);

// /////////////////////////////
