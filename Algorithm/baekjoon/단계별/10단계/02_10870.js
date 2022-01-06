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

  const [num] = inputList.map(Number);

  const getNthFibonacciNumber = (n) => {
    if (n <= 1) return n;

    return getNthFibonacciNumber(n - 1) + getNthFibonacciNumber(n - 2);
  };

  console.log(getNthFibonacciNumber(num));

  /////////////////////////////
  process.exit();
});
