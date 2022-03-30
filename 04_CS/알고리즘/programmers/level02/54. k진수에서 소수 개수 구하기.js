function solution(n, k) {
  let count = 0;
  const changedNum = n.toString(k);
  changedNum.split(0).forEach((v) => {
    if (isPrime(Number(v))) count++;
  });

  return count;
}

function isPrime(num) {
  if (num < 2) return false;

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }

  return true;
}
