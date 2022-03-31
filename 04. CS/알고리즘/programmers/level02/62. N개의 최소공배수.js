function solution(arr) {
  return arr.reduce((acc, cur) => calc_lcm(acc, cur));
}

function calc_lcm(a, b) {
  const gcd = calc_gcd(a, b);
  return (a * b) / gcd;
}

function calc_gcd(a, b) {
  if (b == 0) return a;
  return a > b ? calc_gcd(b, a % b) : calc_gcd(a, b % a);
}
