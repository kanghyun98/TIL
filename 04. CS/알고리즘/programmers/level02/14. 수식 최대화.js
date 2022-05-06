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
  const getCalcRes = (exp, opArr, idx = 2) => {
    if (idx < 0) return Number(exp);

    const expList = exp.split(opArr[idx]);
    const resExp = expList.map((subExp) => getCalcRes(subExp, opArr, idx - 1));

    return calc(resExp, opArr[idx]);
  };

  const result = comb.map((op) => Math.abs(getCalcRes(expression, op)));

  return Math.max(...result);
}
