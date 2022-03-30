// 에라토스테네스의 체
function solution(n) {
  const arr = Array(n + 1).fill(1); // idx와 실제 값 동일
  arr[0] = arr[1] = 0;

  for (let i = 2; i <= n; i++) {
    if (arr[i]) {
      let k = 2;
      while (k * i <= n) {
        arr[k * i] = 0;
        k++;
      }
    }
  }

  return arr.filter((num) => num).length;
}
