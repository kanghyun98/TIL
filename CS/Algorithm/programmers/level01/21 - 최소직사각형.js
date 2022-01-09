// 모든 값의 최대를 구하고,
// 맞은편이 크거나 값들 가운데 가장 큰 값
function solution(sizes) {
  const len = sizes.length;
  const smallArr = [];
  let maxNum = 0;

  for (let i = 0; i < len; i++) {
    maxNum = sizes[i][0] > maxNum ? sizes[i][0] : maxNum;
    maxNum = sizes[i][1] > maxNum ? sizes[i][1] : maxNum;

    sizes[i][0] >= sizes[i][1]
      ? smallArr.push(sizes[i][1])
      : smallArr.push(sizes[i][0]);
  }

  return maxNum * Math.max(...smallArr);
}
