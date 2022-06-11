function solution(n) {
  const arr = Array(n + 1).fill(0);

  arr[0] = 1;
  arr[2] = 3;

  for (let i = 4; i <= n; i += 2) {
    arr[i] = arr[i - 2] * 3;

    for (let j = i - 4; j >= 0; j -= 2) {
      arr[i] += arr[j] * 2;
    }
  }

  return arr[n];
}
