// 난 진법 구하는 방식을 직접 구현했는데 초간단한 방법이 있었다.
// 10 -> n :: num.toString(n)
// n -> 10 :: Number.parseInt(num, n)

function solution(n) {
  // 10 -> n 진법
  const get10toNJinsu = (targetNum, n) => {
    let res = [];
    let last = 0;

    while (true) {
      if (targetNum < n) {
        res.unshift(targetNum);
        break;
      }

      last = targetNum % n;

      res.unshift(last);
      targetNum = (targetNum - last) / n;
    }

    return res.join('');
  };

  // n -> 10 진법
  const getNto10Jinsu = (targetNum, n) => {
    let res = 0;
    let i = 0;

    String(targetNum)
      .split('')
      .map(Number)
      .reverse()
      .forEach((num) => {
        res += num * n ** i;
        i += 1;
      });

    return res;
  };

  const num3 = get10toNJinsu(n, 3);
  const reverseNum3 = String(num3).split('').reverse().join('');
  const answer = getNto10Jinsu(reverseNum3, 3);

  return answer;
}

// 모범 답안
const solution = (n) => {
  return parseInt([...n.toString(3)].reverse().join(''), 3);
};
