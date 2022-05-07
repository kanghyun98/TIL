function solution(cacheSize, cities) {
  const MISS_TIME = 5;
  const HIT_TIME = 1;

  const cache = [];
  let executeTime = 0;

  if (cacheSize === 0) return cities.length * 5;

  for (const city of cities) {
    const cityName = city.toLowerCase();
    const cacheIdx = cache.indexOf(cityName);
    if (cacheIdx !== -1) {
      // hit
      cache.splice(cacheIdx, 1);
      executeTime += HIT_TIME;
    } else {
      // miss
      if (cache.length >= cacheSize) cache.shift();
      executeTime += MISS_TIME;
    }

    cache.push(cityName);
  }

  return executeTime;
}
