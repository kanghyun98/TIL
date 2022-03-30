// 마진을 구하여 고정값을 넘어가는 시점을 구함

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
  const [values] = inputList;

  // A 고정 비용, B 가변 비용, C 가격
  const [a, b, c] = values.split(' ');

  const numA = Number(a);
  const numB = Number(b);
  const numC = Number(c);

  const margin = numC - numB;

  const count = Math.floor(numA / margin) + 1;

  const result = margin <= 0 ? -1 : count;

  console.log(result);

  /////////////////////////////
  process.exit();
});
