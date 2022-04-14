// 괄호
/*
TODO: 올바른 괄호 문자열(Valid PS, VPS)인지 확인
stack을 사용하였으며, 
'('이면 stack에 push, ')'이면 stack에서 pop하였다.
stack이 비었는데 pop을 하거나, 종료 후 stack에 값이 남아있으면 VPS가 아니라고 판단했다.
*/

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputList = [];

rl.on('line', function (input) {
  inputList.push(input);
}).on('close', function () {
  ///////////////////////////////

  let result = '';
  const [len, ...list] = inputList;

  const OPEN = '(';

  for (const ps of list) {
    const stack = [];
    let isRight = 'YES';

    for (const p of ps) {
      if (p === OPEN) {
        stack.push(OPEN);
      } else {
        const popVal = stack.pop();
        if (!popVal) {
          isRight = 'NO';
        }
      }
    }

    if (stack.length > 0) isRight = 'NO';

    result += isRight + '\n';
  }

  console.log(result);

  /////////////////////////////
  process.exit();
});
