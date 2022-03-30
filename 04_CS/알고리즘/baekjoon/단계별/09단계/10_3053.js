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

  const [radius] = inputList;

  const euclidCircle = radius * radius * Math.PI;
  const taxiCircle = radius * radius * 2;

  console.log(euclidCircle);
  console.log(taxiCircle);

  /////////////////////////////
  process.exit();
});
