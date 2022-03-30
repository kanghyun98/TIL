// 자기 위치의 12, 9, 10시 방향의 값들 중 최솟값에 1을 더함

function solution(board) {
  let maxLen = 0;
  const rowLen = board.length;
  const colLen = board[0].length;

  if (rowLen === 1) return 1;

  for (let i = 1; i < rowLen; i++) {
    for (let j = 1; j < colLen; j++) {
      if (board[i][j]) {
        board[i][j] =
          Math.min(board[i - 1][j], board[i][j - 1], board[i - 1][j - 1]) + 1;

        maxLen = board[i][j] > maxLen ? board[i][j] : maxLen;
      }
    }
  }

  return maxLen ** 2;
}
