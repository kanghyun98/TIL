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

  let answer = '';

  for (let i = 0; i < num; i++) {
    const [a, b] = testArr[i].split(' ');
    const numA = Number(a);
    const numB = Number(b);

    answer += numA + numB + '\n';
  }

  console.log(answer);

  /////////////////////////////
  process.exit();
});
