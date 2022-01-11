function solution(arr) {
  let min = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
  }

  return arr.length !== 1 ? arr.filter((num) => num !== min) : [-1];
}

// 모범 답안, 최솟값을 Math.min으로 쉽게 구할 수 있었을텐데.. 깜쓰빡스
function solution(arr) {
  arr.splice(arr.indexOf(Math.min(...arr)), 1);

  if (arr.length < 1) return [-1];

  return arr;
}
