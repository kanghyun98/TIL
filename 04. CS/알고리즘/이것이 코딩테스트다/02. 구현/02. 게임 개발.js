// 규칙
// 1. 현재 방향을 기준으로 왼쪽 방향부터 갈 곳을 정함
// 2. 캐릭터의 왼쪽 방향에 가보지 않은 칸이 존재하면, 왼쪽 방향으로 회전 -> 한칸 전진
//    가보지 않은 칸이 없다면, 왼쪽 방향으로 회전 -> 1번으로 돌아감
// 3. 네 방향 모두 갈 곳이 없으면, 방향 유지한 채로 한칸 뒤로 감 -> 1번으로 돌아감

// 방문한 칸의 수 구하기
function solve(input1, input2, ...input3) {
  const [N, M] = input1.split(' ').map(Number);
  let [x, y, dir] = input2.split(' ').map(Number); // 북: 0, 동: 1, 남: 2, 서: 3
  const userMap = input3.map((row) => row.split(' ').map(Number));

  // 북, 동, 남, 서
  const dx = [1, 0, -1, 0];
  const dy = [0, -1, 0, 1];

  let count = 0;
  let turn = 0;

  // 초기 위치
  userMap[x][y] = 1;
  count++;

  while (true) {
    dir = turnLeft(dir);
    const nx = x + dx[dir];
    const ny = y + dy[dir];

    // 왼쪽 visited x
    if (userMap[nx][ny] === 0) {
      x = nx;
      y = ny;

      userMap[nx][ny] = 1;
      count++;
      turn = 0;

      continue;
    } else {
      // 왼쪽 visited o
      turn++;
    }

    // 갈 곳 X -> 후진
    if (turn === 4) {
      x = x - dx[dir];
      y = y - dy[dir];
      turn = 0;

      // 뒤가 바다인 경우
      if (x <= 0 || x >= N - 1 || y <= 0 || y >= M - 1) {
        break;
      }
    }
  }

  return count;
}

function turnLeft(direction) {
  return direction - 1 >= 0 ? direction - 1 : 3;
}

// test
const answer1 = 3;
const test1 = solve('4 4', '1 1 0', '1 1 1 1', '1 0 0 1', '1 1 0 1', '1 1 1 1');
console.log(answer1 === test1);
