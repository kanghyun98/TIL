// 괴몰이 없음: 1, 괴물이 있음: 0
// 시작 위치: (1,1)
// 괴물 피해서 최소 이동 칸 수 구하기
// bfs

function solve(input1, ...input2) {
  const [N, M] = input1.split(' ').map(Number);

  const blocks = input2.map((li) => li.split('').map(Number));

  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];

  const queue = [[0, 0]];

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      // 유효 범위 벗어난 경우
      if (nx < 0 || nx >= N || ny < 0 || ny >= M) {
        continue;
      }

      // 괴물이 있는 경우
      if (blocks[nx][ny] === 0) {
        continue;
      }

      // 재방문인 경우
      if (blocks[nx][ny] > 1) {
        continue;
      }

      blocks[nx][ny] = blocks[x][y] + 1; // 블록에 현재까지 이동 거리 기록
      queue.push([nx, ny]);
    }
  }

  return blocks[N - 1][M - 1];
}

// test
const answer1 = 10;
const test1 = solve('5 6', '101010', '111111', '000001', '111111', '111111');
console.log(answer1 === test1);
