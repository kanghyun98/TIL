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

  const DIVIDE_NUM = 42;

  const resultArr = inputList.map((num) => {
    return num % DIVIDE_NUM;
  });

  const resultSet = new Set(resultArr);

  console.log(resultSet.size);

  /////////////////////////////
  process.exit();
});
