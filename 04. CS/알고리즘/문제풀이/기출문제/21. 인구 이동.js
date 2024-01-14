const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const [info, ...list] = inputList;
const [N, L, R] = info.split(' ').map(Number);
const countries = list.map((li) => li.split(' ').map(Number));

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

let answer = 0;

while (1) {
  let isThereUnion = false;
  const visited = Array(N)
    .fill()
    .map(() => Array(N).fill(false));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (visited[i][j]) continue;

      // BFS
      const queue = [[i, j]];
      visited[i][j] = true;

      let count = 1;
      let sum = countries[i][j];
      const unionCountries = [[i, j]];

      while (queue.length) {
        const [x, y] = queue.shift();

        for (let d = 0; d < 4; d++) {
          const [nx, ny] = [x + dx[d], y + dy[d]];

          if (nx < 0 || ny < 0 || nx >= N || ny >= N || visited[nx][ny]) {
            continue;
          }

          const diff = Math.abs(countries[x][y] - countries[nx][ny]);
          if (diff >= L && diff <= R) {
            visited[nx][ny] = true;
            queue.push([nx, ny]);

            count += 1;
            sum += countries[nx][ny];
            unionCountries.push([nx, ny]);
            isThereUnion = true;
          }
        }
      }

      const targetPopulation = Math.floor(sum / count);
      unionCountries.forEach((country) => {
        const [x, y] = country;
        countries[x][y] = targetPopulation;
      });
    }
  }

  if (!isThereUnion) break;
  answer += 1;
}

console.log(answer);

/////////////////////////////
