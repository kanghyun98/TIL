// 에디터
/*
TODO: 커서 움직임이나 삭제, 입력 후 결과 도출
stack 2개를 만들어 커서 움직임이나 삭제, 입력에 아래처럼 동작하게 만든다.
L: stack1.pop -> stack2.push
D: stack2.shift -> stack1.pop
B: stack1.pop
P: stack1.push(item)

결과를 도출할 때 두번째 stack은 역순으로 넣어줘야하므로 reverse() 해준다.
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

  const [initStr, len, ...list] = inputList;

  const stack1 = initStr.split('');
  const stack2 = [];

  for (const order of list) {
    const [orderType, newStr] = order.split(' ');

    if (orderType === 'L') {
      const item = stack1.pop();
      if (item) stack2.push(item);
    } else if (orderType === 'D') {
      const item = stack2.pop();
      if (item) stack1.push(item);
    } else if (orderType === 'B') {
      stack1.pop();
    } else if (orderType === 'P') {
      stack1.push(newStr);
    }
  }

  const result = stack1.join('') + stack2.reverse().join('');

  console.log(result);

  /////////////////////////////
  process.exit();
});
