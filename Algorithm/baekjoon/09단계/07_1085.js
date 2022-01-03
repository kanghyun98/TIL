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

  const [x, y, w, h] = inputList[0].split(' ').map(Number);

  const diffArr = [x, w - x, y, h - y];
  const min = Math.min(...diffArr);

  console.log(min);

  /////////////////////////////
  process.exit();
});
