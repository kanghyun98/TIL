function solution(begin, end) {
  const arr = [];

  for (let n = begin; n <= end; n++) {
    arr.push(getNumber(n));
  }

  return arr;
}

// 약수 중 가장 큰 값 (본인 제외)
function getNumber(num) {
  const MAX = 10000000;

  if (num === 1) return 0;

  const list = [];

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0 && i <= MAX) {
      list.push(i);

      if (num / i <= MAX && num / i !== num) {
        list.push(num / i);
      }
    }
  }

  if (list.length > 0) {
    return Math.max(...list);
  }

  return 1;
}
