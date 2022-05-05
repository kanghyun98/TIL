// 단지번호붙이기
/* 
TODO: 지도를 입력하여 단지수를 출력하고, 각 단지에 속하는 집의 수를 오름차순으로 정렬하여 출력
지도를 돌면서 1을 만나면 bfs 돌림 (bfs에서 붙어있는 집은 0으로 만듦)
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const [len, ...list] = inputList;
const n = Number(len);
const village = list.map((li) => li.split('').map(Number));

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

const bfs = (i, j) => {
  const queue = [];
  queue.push([i, j]);
  village[i][j] = 0;
  let count = 1;

  while (queue.length) {
    const [x, y] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const [nx, ny] = [x + dx[i], y + dy[i]];

      if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;

      if (village[nx][ny]) {
        queue.push([nx, ny]);
        village[nx][ny] = 0;
        count++;
      }
    }
  }

  return count;
};

const arr = [];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (village[i][j]) {
      arr.push(bfs(i, j));
    }
  }
}
arr.sort((a, b) => a - b);

console.log(arr.length);
arr.forEach((len) => console.log(len));

/////////////////////////////
