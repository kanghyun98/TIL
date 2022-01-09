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

  let max = Number(inputList[0]);

  inputList.forEach((num) => {
    const number = Number(num);

    if (number > max) {
      max = number;
    }
  });

  const index = inputList.findIndex((num) => {
    return Number(num) === max;
  });

  console.log(max);
  console.log(index + 1);

  /////////////////////////////
  process.exit();
});
