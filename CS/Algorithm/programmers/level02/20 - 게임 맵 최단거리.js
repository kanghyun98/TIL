// bfs를 이용한 방식
function solution(maps) {
  const moveRow = [1, 0, -1, 0];
  const moveCol = [0, 1, 0, -1];
  const n = maps.length - 1;
  const m = maps[0].length - 1;

  const queue = [[0, 0, 1]];

  if (n > 0 && n > 0 && !maps[n - 1][m] && !maps[n][m - 1]) {
    return -1;
  }

  while (queue.length > 0) {
    const [row, col, count] = queue.shift();

    if (row === n && col === m) {
      return count;
    }

    for (let i = 0; i < 4; i++) {
      const nextRow = row + moveRow[i];
      const nextCol = col + moveCol[i];

      if (
        nextRow >= 0 &&
        nextCol >= 0 &&
        nextRow <= n &&
        nextCol <= m &&
        maps[nextRow][nextCol] === 1
      ) {
        maps[nextRow][nextCol] = 0;
        queue.push([nextRow, nextCol, count + 1]);
      }
    }
  }

  return -1;
}

// 이전 행위를 제외하고, 막힌 부분 제외하고 재귀 (첫번째 풀이)
function solution(maps) {
  const cases = [];

  const findRoutine = (startPos, finPos, logMaps, count, copyType) => {
    let [curRow, curCol] = startPos;
    let [finRow, finCol] = finPos;
    const curMaps =
      copyType === 'deep'
        ? JSON.parse(JSON.stringify([...logMaps]))
        : [...logMaps];

    curMaps[curRow][curCol] = 0;

    const allDir = {
      up: [curRow - 1, curCol],
      down: [curRow + 1, curCol],
      left: [curRow, curCol - 1],
      right: [curRow, curCol + 1],
    };

    // 도착지 막혀있는 경우
    if (
      curMaps[0][0] &&
      !curMaps[finRow - 1][finCol] &&
      !curMaps[finRow][finCol - 1]
    )
      return;

    // 도착
    if (curRow === finRow && curCol === finCol) {
      cases.push(count);
      return;
    }

    // 다음에 이동 가능한 방향으로 재귀
    const canMoveDir = Object.keys(allDir).filter((val) => {
      const [nextRow, nextCol] = allDir[val];

      return (
        nextRow >= 0 &&
        nextRow < 5 &&
        nextCol >= 0 &&
        nextCol < 5 &&
        curMaps[nextRow][nextCol]
      );
    });

    if (!canMoveDir.length) return; // 갈 곳이 없을 경우

    canMoveDir.forEach((dir, _, arr) => {
      findRoutine(
        allDir[dir],
        finPos,
        curMaps,
        count + 1,
        arr.length > 1 ? 'deep' : 'shallow'
      );
    });
  };

  findRoutine([0, 0], [maps.length - 1, maps[0].length - 1], maps, 1, 'deep');

  return cases.length > 0 ? Math.min(...cases) : -1;
}
