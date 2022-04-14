// 스택
/*
TODO: 스택을 직접 구현
각 기능을 추상화하여 함수로 만들어서 구현하였다.
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
  const [len, ...orders] = inputList;

  const stack = [];
  let result = '';

  // 추상화
  const push = (num) => stack.push(num);

  const pop = () => {
    const popVal = stack.pop();
    const res = popVal ? popVal : -1;
    result += res + '\n';
  };

  const size = () => {
    result += stack.length + '\n';
  };

  const isEmpty = () => {
    const res = stack.length > 0 ? 0 : 1;
    result += res + '\n';
  };

  const top = () => {
    const item = stack[stack.length - 1];
    const res = item ? item : -1;
    result += res + '\n';
  };

  for (const order of orders) {
    const [orderType, num] = order.split(' ');

    if (orderType === 'push') push(Number(num));
    else if (orderType === 'pop') pop();
    else if (orderType === 'size') size();
    else if (orderType === 'empty') isEmpty();
    else if (orderType === 'top') top();
  }

  console.log(result);
  /////////////////////////////
  process.exit();
});
