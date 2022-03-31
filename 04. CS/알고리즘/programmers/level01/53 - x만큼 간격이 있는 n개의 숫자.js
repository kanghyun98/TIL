function solution(x, n) {
  const arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push(x * i);
  }
  return arr;
}

// 모범 답안, 빈 배열 만들고 map으로 돌리니 확실히 코드가 간결하긴하다..!
function solution(x, n) {
  return Array(n)
    .fill(x)
    .map((v, i) => (i + 1) * v);
}
