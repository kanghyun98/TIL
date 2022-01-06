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

  const [num, ...testArr] = inputList;

  for (let i = 0; i < num; i++) {
    const [a, b] = testArr[i].split(' ');
    const numA = Number(a);
    const numB = Number(b);

    console.log(numA + numB);
  }

  /////////////////////////////
  process.exit();
});
