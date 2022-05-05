// 숨바꼭질
/* 
X일 때 걷는다면 1초 후에 X-1 또는 X+1로 이동하게 된다. 순간이동을 하는 경우에는 1초 후에 2*X의 위치로 이동
TODO: 수빈이와 동생의 위치가 주어졌을 때, 수빈이가 동생을 찾을 수 있는 가장 빠른 시간이 몇 초 후인지 구하기
bfs
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const [initLoc, targetLoc] = inputList[0].split(' ').map(Number);
const visited = Array(100001).fill(0);

const dx = [1, -1, 2, -2];

const bfs = () => {
  const queue = [];
  queue.push(initLoc);
  let result;

  while (queue.length) {
    const x = queue.shift();

    if (x === targetLoc) {
      result = visited[x];
      break;
    }

    for (let i = 0; i < 4; i++) {
      const nx = Math.abs(dx[i]) > 1 ? x * dx[i] : x + dx[i]; // 순간이동, 걷기

      if (nx < 0 || nx >= visited.length) {
        continue;
      }

      if (!visited[nx]) {
        visited[nx] = visited[x] + 1;
        queue.push(nx);
      }
    }
  }

  return result;
};

const time = bfs();

console.log(time);

/////////////////////////////
