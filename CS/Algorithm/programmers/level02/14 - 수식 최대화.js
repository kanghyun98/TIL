function solution(expression) {
  // 경우의 수
  const comb = [
    ['+', '-', '*'],
    ['+', '*', '-'],
    ['-', '+', '*'],
    ['-', '*', '+'],
    ['*', '-', '+'],
    ['*', '+', '-'],
  ];

  // 계산기
  const calc = (arr, op) => {
    return arr.reduce((acc, cur) =>
      op === '*' ? acc * cur : op === '+' ? acc + cur : acc - cur
    );
  };

  // 재귀 함수
  const getCalcRes = (exp, opArr, lev = 2) => {
    if (lev < 0 || !/[\+\-\*]/.test(exp)) return Number(exp);

    const expList = exp.split(opArr[lev]);
    const resExp = expList.map((subExp) => getCalcRes(subExp, opArr, lev - 1));
    const result = calc(resExp, opArr[lev]);

    return result;
  };

  const result = comb.map((op) => Math.abs(getCalcRes(expression, op)));

  return Math.max(...result);
}
