// 쇠막대기
/*
TODO: 레이저로 잘린 쇠막대기 총 개수 구하기
'('가 자기 ')' 만날 떄까지 (만난 레이저 개수 + 1)이 해당 쇠막대기가 잘린 개수
각 쇠막대기마다 만난 레이저 개수: (현재 총 레이저 개수 - 시작되기 전 레이저 개수)
- '('를 만나면, stack에 (-1 * 현재 레이저 개수) push한다.
- ')'를 만나면, stack에서 pop을 해서, (현재 총 레이저 개수 - 시작되기 전 레이저 개수 + 1)를 결과값에 더한다.
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().split('\n');

///////////////////////////////

const [str] = inputList;
let result = 0;

const stack = [];
let raiserCount = 0;

for (let i = 0; i < str.length; i++) {
  if (str[i] === '(') {
    if (str[i + 1] === ')') {
      // 레이저
      raiserCount++;
      i++;
    } else {
      // 쇠막대기 시작
      stack.push(-1 * raiserCount);
    }
  } else {
    const minusVal = stack.pop();
    const counts = minusVal + raiserCount + 1;
    result += counts;
  }
}

console.log(result);

/////////////////////////////
