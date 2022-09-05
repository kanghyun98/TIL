function solution(n, k) {
  const answer = [];
  const numList = Array(n)
    .fill()
    .map((_, k) => k + 1);

  let fact = factorial(n);

  while (n > 0) {
    if (k === 0) {
      answer.push(numList.pop());
      n -= 1;
      continue;
    }

    fact = fact / n;
    const idx = Math.ceil(k / fact) - 1;

    answer.push(numList[idx]);
    numList.splice(idx, 1);

    n -= 1;
    k %= fact;
  }

  return answer;
}

function factorial(x) {
  let val = 1;
  let i = 1;
  while (i <= x) {
    val *= i++;
  }

  return val;
}
