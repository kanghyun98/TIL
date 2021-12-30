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

  const [len, numStr] = inputList;
  const numArr = numStr.split(' ');

  let min = Number(numArr[0]);
  let max = Number(numArr[0]);

  numArr.forEach((num) => {
    const number = Number(num);
    if (number < min) {
      min = number;
    }

    if (number > max) {
      max = number;
    }
  });

  console.log(min, max);

  /////////////////////////////
  process.exit();
});

// 방법2
// 최대 최소 구할 때 Math.max(), Math.min()을 사용하는 것도 방법인 것 같다!
