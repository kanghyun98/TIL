function solution(rows, columns, queries) {
  const answer = [];

  // 기본 배열 만들기
  const arr = [];
  for (let i = 1; i <= rows; i++) {
    arr.push([...Array(columns)].map((_, j) => columns * (i - 1) + (j + 1)));
  }

  queries.forEach((query) => {
    const [x1, y1, x2, y2] = query;
    const queue = [];

    // x1에서 y1+1~y2, y2에서 x1+1~x2, x2에서 y2-1~y1, y1에서 x2-1~x1
    for (let y = y1; y < y2; y++) {
      queue.push(arr[x1 - 1][y]);
    }
    for (let x = x1; x < x2; x++) {
      queue.push(arr[x][y2 - 1]);
    }
    for (let y = y2 - 2; y >= y1 - 1; y--) {
      queue.push(arr[x2 - 1][y]);
    }
    for (let x = x2 - 2; x >= x1 - 1; x--) {
      queue.push(arr[x][y1 - 1]);
    }

    answer.push(Math.min(...queue)); // 최솟값 구하기
    queue.unshift(queue.pop());

    for (let y = y1; y < y2; y++) {
      arr[x1 - 1][y] = queue.shift();
    }
    for (let x = x1; x < x2; x++) {
      arr[x][y2 - 1] = queue.shift();
    }
    for (let y = y2 - 2; y >= y1 - 1; y--) {
      arr[x2 - 1][y] = queue.shift();
    }
    for (let x = x2 - 2; x >= x1 - 1; x--) {
      arr[x][y1 - 1] = queue.shift();
    }
  });

  return answer;
}
