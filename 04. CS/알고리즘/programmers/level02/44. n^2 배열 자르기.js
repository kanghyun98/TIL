// 모범 답안
function solution(n, left, right) {
  const answer = [];

  for (let i = left; i <= right; i++) {
    answer.push(Math.max(i % n, Math.floor(i / n)) + 1);
  }

  return answer;
}

// 통과 (약간 아쉽)
function solution(n, left, right) {
  const answer = [];

  const leftRow = Math.floor(left / n) + 1;
  const leftCol = (left + 1) % n || n;
  const rightRow = Math.floor(right / n) + 1;
  const rightCol = (right + 1) % n || n;

  for (let i = leftRow; i <= rightRow; i++) {
    const startCol = i === leftRow ? leftCol : 1;
    const finCol = i === rightRow ? rightCol : n;

    for (let j = startCol; j <= finCol; j++) {
      if (j <= i) answer.push(i);
      else answer.push(j);
    }
  }

  return answer;
}

// 시간초과 풀이!
function solution(n, left, right) {
  Array(n)
    .fill()
    .map((_, row) =>
      Array(n)
        .fill()
        .map((_, col) => (col <= row ? row + 1 : col + 1))
    )
    .flat()
    .slice(left, right + 1);
}
