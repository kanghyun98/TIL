function solution(n) {
  let answer = 0;

  for (let i = 0; i < n; i++) {
    const chess = Array(n).fill(undefined); // 각 열마다 퀸의 행 위치
    chess[0] = i;

    answer += putQueen(chess, 1);
  }

  return answer;
}

function putQueen(chess, currCol) {
  if (currCol === chess.length) {
    return 1;
  }

  let count = 0;
  for (let row = 0; row < chess.length; row++) {
    chess[currCol] = row;
    if (checkPossible(chess, currCol)) {
      count += putQueen(chess, currCol + 1);
    }
  }

  return count;
}

function checkPossible(chess, currCol) {
  for (let prevCol = 0; prevCol < currCol; prevCol++) {
    const [x1, y1] = [chess[currCol], currCol];
    const [x2, y2] = [chess[prevCol], prevCol];

    // 같은 행 or 열
    if (x1 === x2 || y1 === y2) {
      return false;
    }

    // 대각선
    if (Math.abs(x1 - x2) === Math.abs(y1 - y2)) {
      return false;
    }
  }

  return true;
}
