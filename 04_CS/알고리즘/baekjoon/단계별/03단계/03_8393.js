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

  let total = 0;
  for (let i = 0; i < num; i++) {
    total = total + i + 1;
  }

  console.log(total);

  /////////////////////////////
  process.exit();
});
