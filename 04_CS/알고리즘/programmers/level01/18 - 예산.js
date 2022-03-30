function solution(d, budget) {
  let usedMoney = 0,
    i = 0,
    count = 0;

  d.sort((a, b) => a - b);

  while (usedMoney <= budget) {
    usedMoney += d[i];
    count += 1;
    i += 1;
  }

  return count - 1;
}
