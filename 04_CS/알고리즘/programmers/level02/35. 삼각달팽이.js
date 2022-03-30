// i번째 입력: (n-i)개를 한 방향으로 입력, 0부터 시작
function solution(n) {
  const arr = Array(n)
    .fill()
    .map(() => Array());

  let num = 0;
  let row = -1;
  let col = 0;

  for (let i = 0; i < n; i++) {
    // i번째 입력
    for (let j = i; j < n; j++) {
      // 방향
      if (i % 3 === 0) arr[++row][col] = ++num;
      else if (i % 3 === 1) arr[row][++col] = ++num;
      else arr[--row][--col] = ++num;
    }
  }

  return arr.flat();
}
