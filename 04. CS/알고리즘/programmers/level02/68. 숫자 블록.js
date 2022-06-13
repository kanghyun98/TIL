function solution(begin, end) {
  const arr = [];

  for (let n = begin; n <= end; n++) {
    arr.push(getNumber(n));
  }

  return arr;
}

function getNumber(num) {
  const MAX = 10000000;

  if (num === 1) return 0;

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0 && num / i <= MAX) return num / i;
  }

  return 1;
}
