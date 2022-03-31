function solution(n, arr1, arr2) {
  const arrBin1 = arr1.map((num) => Number(num.toString(2)));
  const arrBin2 = arr2.map((num) => Number(num.toString(2)));

  const combineArr = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    const sumBin = arrBin1[i] + arrBin2[i];

    // n자리 만들기
    const sumBinStr =
      Array(n - String(sumBin).length)
        .fill(0)
        .join('') + sumBin;

    combineArr[i] = sumBinStr.replace(/0/g, ' ').replace(/1|2/g, '#');
  }

  return combineArr;
}
