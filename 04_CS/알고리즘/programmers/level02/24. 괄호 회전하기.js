// 회전시켜 나올 수 있는 모든 문자열
const getAllStr = (str) => {
  const result = [];
  for (let i = 0; i < str.length; i++) {
    result.push(str);
    str = str.slice(1) + str[0];
  }
  return result;
};

// 올바른 괄호문자열인지 확인하기 위한 함수 -> stack 3개 만들자
const checkRightStr = (str) => {
  const stack = [];
  let isOkay = true;
  for (const x of str.split('')) {
    switch (x) {
      case '(':
        stack.push('(');
        break;
      case '{':
        stack.push('{');
        break;
      case '[':
        stack.push('[');
        break;
      case ')':
        isOkay = stack.pop() === '(';
        break;
      case '}':
        isOkay = stack.pop() === '{';
        break;
      case ']':
        isOkay = stack.pop() === '[';
        break;
    }

    if (!isOkay) return;
  }

  return isOkay && stack.length === 0;
};

function solution(s) {
  const allCase = getAllStr(s);

  let count = 0;
  allCase.forEach((one) => {
    if (checkRightStr(one)) count++;
  });

  return count;
}
