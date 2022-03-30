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
  const [len, num] = inputList;
  const numArr = String(num).split('');

  const result = numArr.reduce((acc, cur) => {
    return acc + Number(cur);
  }, 0);

  console.log(result);

  /////////////////////////////
  process.exit();
});
