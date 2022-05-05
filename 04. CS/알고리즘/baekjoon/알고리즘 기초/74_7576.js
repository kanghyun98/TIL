// 토마토
/* 
TODO: 토마토를 창고에 보관하는 격자모양의 상자들의 크기와 익은 토마토들과 익지 않은 토마토들의 정보가 주어졌을 때, 며칠이 지나면 토마토들이 모두 익는지, 그 최소 일수를 구하기
bfs
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const [info, ...list] = inputList;

const [col, row] = info.split(' ').map(Number);
const box = list.map((li) => li.split(' ').map(Number));

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

const bfs = (startArr) => {
  const queue = startArr;
  let idx = 0;

  while (queue[idx]) {
    const [x, y] = queue[idx];
    idx++;

    // 상하좌우로 이동
    for (let i = 0; i < 4; i++) {
      const [nx, ny] = [x + dx[i], y + dy[i]];

      if (nx < 0 || nx >= row || ny < 0 || ny >= col) continue;

      if (box[nx][ny] === 0) {
        box[nx][ny] = box[x][y] + 1;
        queue.push([nx, ny]);
      }
    }
  }
};

const startArr = [];
for (let i = 0; i < row; i++) {
  for (let j = 0; j < col; j++) {
    if (box[i][j] === 1) startArr.push([i, j]);
  }
}

bfs(startArr);

let result = 1;
for (let i = 0; i < row; i++) {
  if (result === 0) break;

  for (let j = 0; j < col; j++) {
    if (box[i][j] === 0) {
      result = 0;
      break;
    } else {
      result = Math.max(result, box[i][j]);
    }
  }
}

console.log(result - 1);

///////////////////////////////
