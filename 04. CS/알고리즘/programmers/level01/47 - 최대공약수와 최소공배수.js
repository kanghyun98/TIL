function solution(n, m) {
  // 최대 공약수
  const getDiv = (num) => {
    const arr = [];
    for (let i = 1; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        arr.push(i);

        if (num !== i ** 2) {
          arr.push(num / i);
        }
      }
    }

    return arr;
  };

  const divN = getDiv(n);
  const divM = getDiv(m);

  const divBoth = divN.filter((num) => divM.includes(num));
  const gcf = Math.max(...divBoth);

  // 최소 공배수
  const getMul = (num, max) => {
    const arr = [];

    let i = 1;
    while (num * i <= max) {
      arr.push(num * i);
      i++;
    }

    return arr;
  };

  const mulN = getMul(n, n * m);
  const mulM = getMul(m, n * m);

  const mulBoth = mulN.filter((num) => mulM.includes(num));

  const lcm = Math.min(...mulBoth);

  return [gcf, lcm];
}

// 모범 답안, 재귀와 수학적 원리를 이용한 방식! 깔끔하다..
function calc_gcd(a, b) {
  if (b == 0) return a;
  return a > b ? calc_gcd(b, a % b) : calc_gcd(a, b % a);
}

function solution(a, b) {
  const gcd = calc_gcd(a, b);
  const lcm = (a * b) / gcd;

  return [gcd, lcm];
}
