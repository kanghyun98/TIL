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

  const [len, scoreStr] = inputList;

  const scoreArr = scoreStr.split(' ').map((score) => {
    return Number(score);
  });

  const max = Math.max(...scoreArr);

  const resultArr = scoreArr.map((score) => {
    return (score / max) * 100;
  });

  const resultMean = resultArr.reduce((acc, cur, index, { length }) => {
    return index === length - 1 ? (acc + cur) / length : acc + cur;
  }, 0);

  console.log(resultMean);

  /////////////////////////////
  process.exit();
});
