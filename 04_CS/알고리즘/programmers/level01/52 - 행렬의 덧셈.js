function solution(arr1, arr2) {
  return arr1.map((row1, rowIdx) =>
    row1.map((num, colIdx) => num + arr2[rowIdx][colIdx])
  );
}
