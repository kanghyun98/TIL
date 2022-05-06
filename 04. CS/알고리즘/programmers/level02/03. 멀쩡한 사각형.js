// 축소(by 최대 공약수) => 전체 - 서로소인 사각형의 최단 거리로 이동 칸 수 * gcd  => ((w + h)/gcd - 1) * gcd
function solution(w, h) {
  const gcd = calc_gcd(w, h);
  return w * h - (w + h - gcd);
}

function calc_gcd(a, b) {
  if (b === 0) return a;
  return a > b ? calc_gcd(b, a % b) : calc_gcd(a, b % a);
}

// 기울기를 이용한 다른 풀이 방법
function solution(w, h) {
  const slope = h / w;
  let result = 0;

  for (let i = 1; i <= w; i++) {
    result += Math.ceil(slope * i);
  }

  return (h * w - result) * 2;
}
