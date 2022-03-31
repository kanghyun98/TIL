// 방식은 1과 같다. 촐싹대다가 2번이나 틀렸네..ㅠ
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
  const [numM, numN] = inputList.map(Number);

  let resultArr = [];

  const checkSosu = (num) => {
    let isSosu = true;

    for (let i = 2; i < num; i++) {
      if (num % i === 0) {
        isSosu = false;
        break;
      }
    }

    if (num === 1) isSosu = false;
    if (num === 2) isSosu = true;

    return isSosu;
  };

  for (let num = numM; num <= numN; num++) {
    if (checkSosu(num)) {
      resultArr.push(num);
    }
  }

  if (resultArr.length > 0) {
    // 합
    let sum = 0;
    resultArr.forEach((value) => {
      sum += value;
    });

    // 최솟값
    const min = Math.min(...resultArr);

    console.log(sum);
    console.log(min);
  } else {
    console.log(-1);
  }

  /////////////////////////////
  process.exit();
});
