// 테트로미노
/* 
TODO: 테트로미노가 놓인 칸에 쓰인 수들의 합의 최댓값을 구하기
dfs 방식을 이용
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const [lenStr, ...list] = inputList;
const [rowLen, colLen] = lenStr.split(' ').map(Number);
const arr = list.map((li) => li.split(' ').map(Number));

let result = 0;

const dr = [-1, 0, 1, 0];
const dc = [0, 1, 0, -1];

const visit = [...Array(rowLen)].map(() => Array(colLen).fill(0));

const dfs = (row, col, len, sum) => {
  if (len === 4) {
    result = Math.max(result, sum);
    return;
  }

  // 상하좌우
  for (let i = 0; i < 4; i++) {
    const nRow = row + dr[i];
    const nCol = col + dc[i];
    if (
      nRow >= 0 &&
      nRow < rowLen &&
      nCol >= 0 &&
      nCol < colLen &&
      !visit[nRow][nCol]
    ) {
      if (len === 2) {
        visit[nRow][nCol] = 1;
        dfs(row, col, len + 1, sum + arr[nRow][nCol]); // ㅗ모양
        visit[nRow][nCol] = 0;
      }
      visit[nRow][nCol] = 1;
      dfs(nRow, nCol, len + 1, sum + arr[nRow][nCol]);
      visit[nRow][nCol] = 0;
    }
  }
};

for (let r = 0; r < rowLen; r++) {
  for (let c = 0; c < colLen; c++) {
    visit[r][c] = 1;
    dfs(r, c, 1, arr[r][c]);
    visit[r][c] = 0;
  }
}

console.log(result);

/////////////////////////////
