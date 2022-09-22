function solution(n, stations, w) {
  let count = 0;
  let point = 1;

  const width = w * 2 + 1;

  stations.forEach((station) => {
    const coverStart = station - w < 1 ? 1 : station - w;

    while (point < coverStart) {
      count++;
      point += width;
    }

    point = station + w + 1;
  });

  while (point <= n) {
    count++;
    point += width;
  }

  return count;
}
