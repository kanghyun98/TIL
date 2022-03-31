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

  let i = 0;
  while (true) {
    const [a, b] = inputList[i].split(' ');
    const result = Number(a) + Number(b);
    i++;

    if (result === 0) {
      break;
    }

    console.log(result);
  }

  /////////////////////////////
  process.exit();
});
