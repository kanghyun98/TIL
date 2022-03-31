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

  const [val] = inputList;

  const result = String(val).charCodeAt();
  console.log(result);

  /////////////////////////////
  process.exit();
});
