function solution(elements) {
  const circleSequence = [...elements, ...elements];
  const n = elements.length;

  const set = new Set();
  for (let i = 1; i <= n; i++) {
    let sum = 0;
    for (let j = 0; j < n; j++) {
      sum += circleSequence[i + j];
      set.add(sum);
    }
  }

  return set.size;
}
