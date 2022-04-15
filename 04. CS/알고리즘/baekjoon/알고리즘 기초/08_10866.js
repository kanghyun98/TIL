// 덱
/*
TODO: 덱(Deque) 구현
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
  const deque = [];

  const push_front = (num) => deque.unshift(num);
  const push_back = (num) => deque.push(num);

  const pop_front = () => {
    const popVal = deque.shift();
    const res = popVal ? popVal : -1;
    result += res + '\n';
  };

  const pop_back = () => {
    const popVal = deque.pop();
    const res = popVal ? popVal : -1;
    result += res + '\n';
  };

  const size = () => {
    result += deque.length + '\n';
  };

  const isEmpty = () => {
    const res = deque.length > 0 ? 0 : 1;
    result += res + '\n';
  };

  const front = () => {
    const val = deque[0];
    const res = val ? val : -1;
    result += res + '\n';
  };

  const back = () => {
    const val = deque[deque.length - 1];
    const res = val ? val : -1;
    result += res + '\n';
  };

  for (const order of orders) {
    const [orderType, num] = order.split(' ');

    if (orderType === 'push_front') push_front(num);
    else if (orderType === 'push_back') push_back(num);
    else if (orderType === 'pop_front') pop_front();
    else if (orderType === 'pop_back') pop_back();
    else if (orderType === 'size') size();
    else if (orderType === 'empty') isEmpty();
    else if (orderType === 'front') front();
    else if (orderType === 'back') back();
  }

  console.log(result);

  /////////////////////////////
  process.exit();
});
