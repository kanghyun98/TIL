// 스택 수열
/*
TODO: 1부터 n까지의 수를 스택에 push, pop하여 입력과 동일한 결과 나오게 만들기 (불가능하면 'NO' 출력)
i=0 을 선언하고, 
입력값의 숫자 num이 i보다 크면, i~num push()하고 pop()해서 결과에 추가
입력값의 숫자 num이 i보다 작으면, pop()을 해서 결과에 추가, 그런데 이 값이 num과 다르면 'NO' 출력
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

  const stack = [];
  let i = 0;
  let isRight = true;

  for (let num of list) {
    num = Number(num);
    if (num >= i) {
      for (let j = i + 1; j <= num; j++) {
        stack.push(j);
        result += '+\n';
      }
      stack.pop();
      result += '-\n';
      i = num;
    } else {
      const popItem = stack.pop();
      if (popItem !== num) {
        isRight = false;
      }
      result += '-\n';
    }
  }

  result = isRight ? result : 'NO';
  console.log(result);

  /////////////////////////////
  process.exit();
});
