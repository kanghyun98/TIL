function solution(n) {
  let answer = 1;
  let minNum = 3;
  let continuousCount = 2;

  while (n >= minNum) {
    if ((n - minNum) % continuousCount === 0) answer++;

    continuousCount++;
    minNum += continuousCount;
  }

  return answer;
}

// 2연속:  3부터 2씩 증가 3 + 2k = n
// 3연속:  6부터 3씩 증가 6 + 3k
// 4연속:  10부터 4씩 증가 10 + 4k
// ... => (n - minNum) % countinousCount === 0
