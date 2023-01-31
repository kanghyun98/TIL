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

  const N = Number(inputList[0]);

  const strN = String(N);
  const strNLen = strN.length;
  const halfPoint = strNLen / 2;

  const firNums = strN.slice(0, N).split('').map(Number);
  const secNums = strN.slice(N).split('').map(Number);

  const firSum = firNums.reduce((acc, cur) => acc + cur, 0);
  const secSum = secNums.reduce((acc, cur) => acc + cur, 0);

  const result = firSum === secSum ? 'LUCKY' : 'READY';
  console.log(result);

  /////////////////////////////
  process.exit();
});
