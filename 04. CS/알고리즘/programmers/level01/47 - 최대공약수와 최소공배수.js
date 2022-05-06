function gcd(x, y) {
  while (y) {
    [x, y] = x > y ? [y, x % y] : [x, y % x];
  }
  return x;
}

function lcm(x, y) {
  return (x * y) / gcd(x, y);
}

function solution(a, b) {
  const gcdVal = gcd(a, b);
  const lcmVal = lcm(a, b);

  return [gcdVal, lcmVal];
}
