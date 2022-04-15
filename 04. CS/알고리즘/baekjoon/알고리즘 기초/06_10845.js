// 큐
/*
TODO: 큐 구현
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
  let result = '';
  const queue = [];

  const push = (num) => queue.push(num);

  const pop = () => {
    const popVal = queue.shift();
    const res = popVal ? popVal : -1;
    result += res + '\n';
  };

  const size = () => {
    result += queue.length + '\n';
  };

  const isEmpty = () => {
    const res = queue.length > 0 ? 0 : 1;
    result += res + '\n';
  };

  const front = () => {
    const val = queue[0];
    const res = val ? val : -1;
    result += res + '\n';
  };

  const back = () => {
    const val = queue[queue.length - 1];
    const res = val ? val : -1;
    result += res + '\n';
  };

  for (const order of orders) {
    const [orderType, num] = order.split(' ');

    if (orderType === 'push') push(Number(num));
    else if (orderType === 'pop') pop();
    else if (orderType === 'size') size();
    else if (orderType === 'empty') isEmpty();
    else if (orderType === 'front') front();
    else if (orderType === 'back') back();
  }

  console.log(result);

  /////////////////////////////
  process.exit();
});
