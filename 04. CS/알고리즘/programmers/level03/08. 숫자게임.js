function solution(A, B) {
  A.sort((a, b) => a - b);
  B.sort((a, b) => a - b);

  let answer = 0;
  let i = 0;
  let j = 0;

  while (true) {
    if (i === A.length) {
      break;
    }

    if (B[i] > A[j]) {
      answer++;
    } else {
      while (B[i] <= A[j] && i !== A.length) i++;
      continue;
    }

    i++;
    j++;
  }

  return answer;
}
