function solution(k, tangerine) {
  const tangerineCount = {};
  tangerine.forEach((size) => {
    if (!tangerineCount[size]) tangerineCount[size] = 0;
    tangerineCount[size]++;
  });

  const sortedTangerineCountKeys = Object.keys(tangerineCount).sort(
    (a, b) => tangerineCount[b] - tangerineCount[a]
  );

  let result = 0;
  let count = 0;
  while (count < k) {
    const key = sortedTangerineCountKeys[result];
    count += tangerineCount[key];
    result++;
  }

  return result;
}
