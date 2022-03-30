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

  let i = 0;
  let result = '';

  while (i < inputList.length) {
    const [a, b] = inputList[i].split(' ');
    sumNum = Number(a) + Number(b);
    i++;

    result += `${sumNum}\n`;
  }

  console.log(result);

  /////////////////////////////
  process.exit();
});
