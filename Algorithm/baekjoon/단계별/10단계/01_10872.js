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

  const factorial = (n) => {
    if (n <= 1) return 1;

    return n * factorial(n - 1);
  };

  console.log(factorial(num));

  /////////////////////////////
  process.exit();
});
