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
  const [sentence] = inputList;

  const wordArr = sentence.trim().split(' ');

  let result = 0;
  if (wordArr[0]) {
    result = wordArr.length;
  }

  console.log(result);

  /////////////////////////////
  process.exit();
});
