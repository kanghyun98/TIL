function solution(x) {
  const eachNumSum = String(x)
    .split('')
    .map(Number)
    .reduce((acc, cur) => acc + cur);

  return x % eachNumSum === 0;
}
