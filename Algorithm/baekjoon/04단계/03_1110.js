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

  const makeTwoWord = (n) => {
    const num = Number(n);
    if (num < 10) {
      return `0${num}`;
    } else {
      return `${num}`;
    }
  };

  const makeNewNum = (num) => {
    const [firstNum, secondNum] = makeTwoWord(num).split('');
    const sumNum = Number(firstNum) + Number(secondNum);
    const [leftNum, rightNum] = makeTwoWord(sumNum).split('');

    const newNum = secondNum + rightNum; // num의 오른쪽 + sumNum의 오른쪽

    return newNum;
  };

  let i = 1;
  let newNum = makeNewNum(num);

  while (true) {
    if (newNum === makeTwoWord(num)) {
      break;
    }

    newNum = makeNewNum(newNum);
    i++;
  }

  console.log(i);

  /////////////////////////////
  process.exit();
});
