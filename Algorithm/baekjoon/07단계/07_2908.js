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

  const [numbers] = inputList;
  const [a, b] = numbers.split(' ');

  const makeReverseNum = (num) => {
    const numArr = String(num).split('');
    const revereseNum = [...numArr].reverse().join('');
    return Number(revereseNum);
  };

  const numA = makeReverseNum(a);
  const numB = makeReverseNum(b);

  const result = numA > numB ? numA : numB;
  console.log(result);

  /////////////////////////////
  process.exit();
});
