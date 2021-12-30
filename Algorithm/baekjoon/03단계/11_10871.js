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

  let answer = '';

  const [infoStr, numStr] = inputList;

  const [num, x] = infoStr.split(' ');
  const numArr = numStr.split(' ');

  for (let i = 0; i < num; i++) {
    if (Number(numArr[i]) < Number(x)) {
      answer += `${numArr[i]} `;
    }
  }

  console.log(answer);

  /////////////////////////////
  process.exit();
});
