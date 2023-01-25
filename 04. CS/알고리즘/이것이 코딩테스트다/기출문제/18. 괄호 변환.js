// 균형잡힌 괄호 문자열: (, )의 개수가 같음
// 올바른 괄호 문자열: (, )의 짝이 맞음

function solution(p) {
  const answer = makeRightBracket(p);
  return answer;
}

function makeRightBracket(str) {
  if (isEmpty(str)) {
    return '';
  }

  const splitPoint = findPointForSplit(str); // 2
  const isRight = str[0] === '(';

  const u = str.slice(0, splitPoint + 1);
  const v = makeRightBracket(str.slice(splitPoint + 1));

  return isRight ? u + v : '(' + v + ')' + makeReverse(u);
}

function isEmpty(str) {
  return str.length === 0;
}

// 두 "균형잡힌 괄호 문자열" u, v로 분리하는 지점 구하기 (u: 더 이상 분리 X, v: 빈 문자열 가능)
function findPointForSplit(str) {
  let checkN = 0; // 0이면 좌측은 분리되지 않는 균형잡힌 괄호 문자열
  let point = 0;

  for (let i = 0; i < str.length; i++) {
    str[i] === str[0] ? checkN++ : checkN--;
    if (checkN === 0) {
      return point;
    }
    point++;
  }

  return 0;
}

function makeReverse(str) {
  const cutOffStr = str.slice(1, -1);
  let newStr = '';
  for (str of cutOffStr) {
    newStr += str === '(' ? ')' : '(';
  }

  return newStr;
}
