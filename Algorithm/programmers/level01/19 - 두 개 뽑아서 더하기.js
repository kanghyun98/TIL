function solution(numbers) {
  const len = numbers.length;
  const arr = [];

  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      arr.push(numbers[i] + numbers[j]);
    }
  }

  return [...new Set(arr)].sort((a, b) => a - b);
}
