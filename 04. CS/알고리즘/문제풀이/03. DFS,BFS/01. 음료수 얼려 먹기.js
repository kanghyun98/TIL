// 뚫린 부분: 0, 칸막이 부분: 1
// 이어져 있으면 1개로 간주, 총 몇 개의 새로운 블록이 생길 수 있는지
// dfs
function solve(input1, ...input2) {
  const [N, M] = input1.split(' ').map(Number);

  const blocks = input2.map((li) => li.split('').map(Number));

  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];

  const dfs = (x, y) => {
    // 유효범위 벗어나는 경우
    if (x < 0 || x >= N || y < 0 || y >= M) {
      return;
    }

    // 칸막이인 경우
    if (blocks[x][y] === 1) {
      return;
    }

    blocks[x][y] = 1;
    for (let i = 0; i < 4; i++) {
      dfs(x + dx[i], y + dy[i]);
    }
  };

  // 전체 확인
  let count = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (blocks[i][j] === 0) {
        count++;
        dfs(i, j);
      }
    }
  }

  return count;
}

// test
const answer1 = 3;
const test1 = solve('4 5', '00110', '00011', '11111', '00000');
console.log(answer1 === test1);

const answer2 = 8;
const test2 = solve(
  '15 14',
  '00000111100000',
  '11111101111110',
  '11011101101110',
  '11011101100000',
  '11011111111111',
  '11011111111100',
  '11000000011111',
  '01111111111111',
  '00000000011111',
  '01111111111000',
  '00011111111000',
  '00000001111000',
  '11111111110011',
  '11100011111111',
  '11100011111111'
);
console.log(answer2 === test2);
