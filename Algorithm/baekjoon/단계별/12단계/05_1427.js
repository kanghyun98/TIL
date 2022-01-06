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

  const numArr = String(inputList).split('').map(Number);

  numArr.sort((a, b) => b - a);

  const result = numArr.join('');
  console.log(result);

  /////////////////////////////
  process.exit();
});
