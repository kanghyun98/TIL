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

  const [len, ...resultArr] = inputList;

  resultArr.forEach((result) => {
    let score = 0;

    result.split('X').forEach((res) => {
      for (let i = 1; i <= res.length; i++) {
        score += i;
      }
    });

    console.log(score);
  });

  /////////////////////////////
  process.exit();
});
