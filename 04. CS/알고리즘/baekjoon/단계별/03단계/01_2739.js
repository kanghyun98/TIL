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

  const [num] = inputList;

  for (let i = 0; i < 9; i++) {
    console.log(`${num} * ${i + 1} = ${num * (i + 1)}`);
  }

  /////////////////////////////
  process.exit();
});
