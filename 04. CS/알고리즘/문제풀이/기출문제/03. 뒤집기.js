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

  const nums = inputList[0].split('').map(Number);

  let flag = -1; // 0 or 1, init: -1

  const eachCount = [0, 0];

  nums.forEach((num) => {
    if (num !== flag) {
      eachCount[num] += 1;
      flag = num;
    }
  });

  const answer = Math.min(...eachCount);
  console.log(answer);

  /////////////////////////////
  process.exit();
});
