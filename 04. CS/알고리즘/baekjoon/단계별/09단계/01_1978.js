// 소수의 개수 구하기
// 각 숫자마다 2 ~ n-1 로 나누어 하나라도 나머지가 0이면 false

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inputList = [];

rl.on('line', function (input) {
  inputList.push(input);
}).on('close', function () {
  ///////////////////////////////

  const [len, values] = inputList;

  let count = 0;
  const numArr = values.split(' ').map(Number);

  numArr.forEach((num) => {
    let isSosu = true;
    for (let i = 2; i < num; i++) {
      if (num % i === 0) {
        isSosu = false;
        break;
      }
    }

    if (num === 1) isSosu = false;
    if (num === 2) isSosu = true;

    if (isSosu) count++;
  });

  console.log(count);

  /////////////////////////////
  process.exit();
});
