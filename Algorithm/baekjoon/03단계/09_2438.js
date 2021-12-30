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

  const [num] = inputList;

  let answer = '';

  for (let i = 1; i <= num; i++) {
    answer = '';

    for (let j = 0; j < i; j++) {
      answer += '*';
    }

    console.log(answer);
  }

  /////////////////////////////
  process.exit();
});
