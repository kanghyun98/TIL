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

  const N = Number(inputList[0]);
  const K = Number(inputList[1]);
  const L = Number(inputList[K + 2]);
  const applePos = [];
  const turnInfo = {};
  for (let i = 2; i < K + 2; i++) {
    const [x, y] = inputList[i].split(' ').map(Number);
    applePos.push([x - 1, y - 1]);
  }
  for (let i = K + 3; i < inputList.length; i++) {
    const [time, lr] = inputList[i].split(' ');
    turnInfo[time] = lr;
  }

  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];

  const area = [...Array(N)].map(() => Array(N).fill(0)); // 맵

  applePos.forEach((pos) => {
    const [x, y] = pos;
    area[x][y] = 1; // 사과 위치는 1
  });

  // 초기값
  let time = 0;
  let snakeDir = 0; // 0: 동, 1: 남, 2: 서, 3: 북
  let [headx, heady] = [0, 0]; // 머리 위치
  area[headx][heady] = 10; // 뱀 위치는 10
  const snake = [[headx, heady]]; // 뱀이 위치하는 영역 (큐)

  // 이동
  while (true) {
    time += 1;
    const nx = headx + dx[snakeDir];
    const ny = heady + dy[snakeDir];

    // 벽이나 자기 몸에 부딪히는 경우 종료
    if (nx < 0 || nx >= N || ny < 0 || ny >= N || area[nx][ny] === 10) {
      break;
    }

    // 사과 없는 경우 꼬리 부분 제거
    if (area[nx][ny] === 0) {
      const [tx, ty] = snake.shift();
      area[tx][ty] = 0;
    }

    // 뱀 정보 업데이트
    area[nx][ny] = 10;
    snake.push([nx, ny]);
    headx = nx;
    heady = ny;

    // 방향 전환 (특정 시간)
    if (turnInfo[time]) {
      snakeDir = getDirAfterTurn(snakeDir, turnInfo[time]);
    }
  }

  console.log(time);

  /////////////////////////////
  process.exit();
});

function getDirAfterTurn(prevDir, lr) {
  const n = lr === 'D' ? 1 : -1;
  let newDir = (prevDir + n) % 4;

  return newDir === -1 ? 3 : newDir;
}
