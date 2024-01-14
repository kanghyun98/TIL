// bfs
function solution(board) {
  const N = board.length;
  const visitedList = [];

  const robotPos = [
    [0, 0],
    [0, 1],
  ];

  const queue = [[robotPos, 0]];
  visitedList.push(robotPos);

  while (queue.length > 0) {
    const [pos, cost] = queue.shift();
    const [pos1X, pos1Y] = pos[0];
    const [pos2X, pos2Y] = pos[1];
    // 도착
    if (
      (pos1X === N - 1 && pos1Y === N - 1) ||
      (pos2X === N - 1 && pos2Y === N - 1)
    ) {
      return cost;
    }

    const nextPosList = getNextPosList(pos, board); // 다음 좌표 목록
    nextPosList.forEach((nextPos) => {
      let isVisited = false;
      visitedList.forEach((visitedPos) => {
        if (
          visitedPos[0][0] === nextPos[0][0] &&
          visitedPos[0][1] === nextPos[0][1] &&
          visitedPos[1][0] === nextPos[1][0] &&
          visitedPos[1][1] === nextPos[1][1]
        ) {
          isVisited = true;
        }
      });

      if (!isVisited) {
        queue.push([nextPos, cost + 1]);
        visitedList.push(nextPos);
      }
    });
  }

  return 0;
}

// 이동 및 회전 후 좌표
function getNextPosList(prevPos, board) {
  const nextPosList = [];

  const [prev1X, prev1Y] = prevPos[0];
  const [prev2X, prev2Y] = prevPos[1];

  // 상하좌우 이동
  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];

  for (let i = 0; i < 4; i++) {
    const [next1X, next1Y] = [prev1X + dx[i], prev1Y + dy[i]];
    const [next2X, next2Y] = [prev2X + dx[i], prev2Y + dy[i]];

    if (!board[next1X] || !board[next2X]) {
      continue;
    }

    if (board[next1X][next1Y] === 0 && board[next2X][next2Y] === 0) {
      const nextPos = [
        [next1X, next1Y],
        [next2X, next2Y],
      ];

      nextPosList.push(nextPos);
    }
  }

  // 회전
  // 로봇이 가로인 경우
  if (prev1X === prev2X) {
    [1, -1].forEach((i) => {
      if (!board[prev1X + i] || !board[prev2X + i]) {
        return;
      }

      // 위(or 아래) 두 칸이 모두 비어있는 경우
      if (board[prev1X + i][prev1Y] === 0 && board[prev2X + i][prev2Y] === 0) {
        // 좌 기준 (위, 아래 회전)
        const nextLeftVerPos = [
          [prev1X, prev1Y],
          [prev1X + i, prev1Y],
        ];
        // 우 기준 (위, 아래 회전)
        const nextRightVerPos = [
          [prev2X, prev2Y],
          [prev2X + i, prev2Y],
        ];

        nextPosList.push(nextLeftVerPos);
        nextPosList.push(nextRightVerPos);
      }
    });
  }

  // 세로이 세로인 경우
  if (prev1Y === prev2Y) {
    [1, -1].forEach((i) => {
      if (!board[prev1X] || !board[prev2X]) {
        return;
      }

      // 좌(or 우) 두 칸이 모두 비어있는 경우
      if (board[prev1X][prev1Y + i] === 0 && board[prev2X][prev2Y + i] === 0) {
        // 위 기준 (좌,우 회전)
        const nextUpHorPos = [
          [prev1X, prev1Y],
          [prev1X, prev1Y + i],
        ];
        // 아래 기준 (좌,우 회전)
        const nextDownHorPos = [
          [prev2X, prev2Y],
          [prev2X, prev2Y + i],
        ];

        nextPosList.push(nextUpHorPos);
        nextPosList.push(nextDownHorPos);
      }
    });
  }

  return nextPosList;
}
