function solution(p) {
  const findPoint = (str) => {
    let num = 0;
    let idx = 0;

    for (const target of str) {
      target === str[0] ? num++ : num--;

      if (num === 0) return [idx, str[0] === '(']; // 올바른 괄호 문자열 or 균형잡힌 괄호 문자열

      idx++;
    }

    return [0, false];
  };

  const makeReverse = (str) => {
    const cutOffStr = str.slice(1, -1);
    let newStr = '';
    for (str of cutOffStr) {
      newStr += str === '(' ? ')' : '(';
    }

    return newStr;
  };

  const loopFunc = (str) => {
    // 1
    if (str.length < 1) return '';

    // 2
    const [splitPoint, isPerfect] = findPoint(str);
    const u = str.slice(0, splitPoint + 1);
    const v = loopFunc(str.slice(splitPoint + 1));

    // 3 or 4
    return isPerfect ? u + v : '(' + v + ')' + makeReverse(u);
  };

  return loopFunc(p);
}
