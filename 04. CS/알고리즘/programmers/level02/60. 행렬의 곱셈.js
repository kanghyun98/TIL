// 통과 (쓸데없이 복잡하게 품)
function solution(arr1, arr2) {
  const rowLen = arr1.length;
  const colLen = arr2[0].length;
  const innerLen = arr1[0].length;

  const resArr = Array(rowLen)
    .fill()
    .map((v) => Array(colLen));

  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      let sum = 0;
      for (let k = 0; k < innerLen; k++) {
        sum += arr1[i][k] * arr2[k][j];
      }
      resArr[i][j] = sum;
    }
  }

  return resArr;
}

// 간결하게 만든 코드
function solution(arr1, arr2) {
  return arr1.map((row) => {
    return arr2[0].map((_, i) => {
      return row.reduce((acc, cur, idx) => acc + cur * arr2[idx][i], 0);
    });
  });
}
