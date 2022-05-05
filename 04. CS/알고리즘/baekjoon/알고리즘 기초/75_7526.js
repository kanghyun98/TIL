// 나이트의 이동
/* 
TODO: 나이트가 이동하려고 하는 칸이 주어진다. 나이트는 몇 번 움직이면 이 칸으로 이동할 수 있는지 구하기
bfs
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const [len, ...list] = inputList;
const testcase = Number(len);

const dx = [1, 2, 2, 1, -1, -2, -2, -1];
const dy = [2, 1, -1, -2, -2, -1, 1, 2];

const bfs = (board, initX, initY, targetX, targetY) => {
  const queue = [];
  queue.push([initX, initY]);

  let result = 0;
  while (queue.length) {
    const [x, y] = queue.shift();
    if (x === targetX && y === targetY) {
      result = board[x][y];
      break;
    }

    for (let i = 0; i < 8; i++) {
      const [nx, ny] = [x + dx[i], y + dy[i]];

      if (nx < 0 || nx >= board.length || ny < 0 || ny >= board.length) {
        continue;
      }

      if (!board[nx][ny]) {
        board[nx][ny] = board[x][y] + 1;
        queue.push([nx, ny]);
      }
    }
  }

  return result;
};

for (let i = 0; i < 3 * testcase; i += 3) {
  const boardLen = Number(list[i]);
  const [initX, initY] = list[i + 1].split(' ').map(Number);
  const [targetX, targetY] = list[i + 2].split(' ').map(Number);

  const board = Array(boardLen)
    .fill()
    .map(() => Array(boardLen).fill(0));

  const result = bfs(board, initX, initY, targetX, targetY);

  console.log(result);
}

/////////////////////////////
