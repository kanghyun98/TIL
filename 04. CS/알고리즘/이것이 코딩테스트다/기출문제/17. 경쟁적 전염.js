const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inputList = [];

rl.on('line', function (input) {
  inputList.push(input);
}).on('close', function () {
  ///////////////////////////////

  const [info, ...arr] = inputList;
  const [N, K] = info.split(' ').map(Number);
  const [S, X, Y] = arr.pop().split(' ').map(Number);
  const viruses = [];

  const board = arr.map((li, xIdx) =>
    li.split(' ').map((item, yIdx) => {
      const n = Number(item);
      if (n > 0) viruses.push([n, xIdx, yIdx, 0]); // [virus 번호, x, y, time]
      return n;
    })
  );

  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];

  const queue = viruses.sort((a, b) => a[0] - b[0]);

  while (queue.length > 0) {
    const [virusNum, x, y, time] = queue.shift();

    if (time === S) {
      break;
    }

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || nx >= N || ny < 0 || ny >= N) {
        continue;
      }

      if (board[nx][ny] === 0) {
        board[nx][ny] = virusNum;
        queue.push([virusNum, nx, ny, time + 1]);
      }
    }
  }

  console.log(board[X - 1][Y - 1]);

  /////////////////////////////
  process.exit();
});
