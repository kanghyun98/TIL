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

  const checkFunc = (arr) => {
    const [c, a, b] = [...arr].sort((a, b) => b - a);

    let result;

    if (c === 0) return;

    if (c ** 2 !== a ** 2 + b ** 2) {
      result = 'wrong';
    } else {
      result = 'right';
    }

    return result;
  };

  inputList.forEach((val) => {
    const numArr = val.split(' ').map(Number);
    const result = checkFunc(numArr);
    if (result) {
      console.log(result);
    }
  });

  /////////////////////////////
  process.exit();
});
