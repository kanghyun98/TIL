function solution(cacheSize, cities) {
  const cache = [];
  let executeTime = 0;

  if (cacheSize === 0) return cities.length * 5;

  for (const city of cities) {
    const cityName = city.toLowerCase();
    const cacheIdx = cache.findIndex((val) => val === cityName);
    if (cacheIdx !== -1) {
      // 포함
      cache.splice(cacheIdx, 1);
      cache.push(cityName);
      executeTime += 1;
    } else {
      // 포함x
      if (cache.length >= cacheSize) cache.shift();
      cache.push(cityName);
      executeTime += 5;
    }
  }

  return executeTime;
}
