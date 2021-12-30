const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let arr = [];

rl.on('line', function (input) {
  arr.push(input);
}).on('close', function () {
  ///////////////////////////////
  const [x, y] = arr;

  const numX = Number(x);
  const numY = Number(y);

  if (numX > 0 && numY > 0) {
    console.log(1);
  } else if (numX < 0 && numY > 0) {
    console.log(2);
  } else if (numX < 0 && numY < 0) {
    console.log(3);
  } else if (numX > 0 && numY < 0) {
    console.log(4);
  } else {
    return;
  }

  /////////////////////////////
  process.exit();
});
