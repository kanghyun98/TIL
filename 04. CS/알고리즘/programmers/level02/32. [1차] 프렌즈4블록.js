function solution(m, n, board) {
  const bd = board.map((row) => row.split(''));
  let count = 0;

  while (true) {
    // 제거
    const colArr = Array(n)
      .fill()
      .map(() => new Set());

    for (let rowIdx = 0; rowIdx < m - 1; rowIdx++) {
      for (let colIdx = 0; colIdx < n - 1; colIdx++) {
        if (
          bd[rowIdx][colIdx] &&
          bd[rowIdx][colIdx] === bd[rowIdx][colIdx + 1] &&
          bd[rowIdx][colIdx + 1] === bd[rowIdx + 1][colIdx] &&
          bd[rowIdx + 1][colIdx] === bd[rowIdx + 1][colIdx + 1]
        ) {
          colArr[colIdx].add(rowIdx);
          colArr[colIdx].add(rowIdx + 1);
          colArr[colIdx + 1].add(rowIdx);
          colArr[colIdx + 1].add(rowIdx + 1);
        }
      }
    }

    const beforeCount = count;

    colArr.forEach((set, col) => {
      count += set.size; // 제거 개수 파악

      // 내리기
      for (const i of set) {
        bd[i][col] = '';
      }

      for (let j = m - 1; j >= 0; j--) {
        if (!bd[j][col]) {
          for (let k = j - 1; k >= 0; k--) {
            if (bd[k][col]) {
              bd[j][col] = bd[k][col];
              bd[k][col] = '';
              break;
            }
          }
        }
      }
    });

    if (beforeCount === count) break;
  }

  return count;
}
