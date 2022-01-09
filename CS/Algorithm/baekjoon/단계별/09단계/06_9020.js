// 가장 큰 숫자보다 작은 소수들을 구함
// 각 숫자별로 소수 하나씩 돌리면서 숫자 - 소수 === 소수 가 되는지 확인

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

  const [testLen, ...test] = inputList;
  numArr = test.map(Number);

  const maxNum = Math.max(...numArr);

  const isPrimeArr = Array(maxNum + 1).fill(true);

  for (let i = 2; i <= Math.ceil(Math.sqrt(maxNum)); i++) {
    if (isPrimeArr[i]) {
      let t = 2;
      while (t * i <= maxNum) {
        isPrimeArr[t * i] = false;
        t++;
      }
    }
  }

  const primeArr = [];
  for (let num = 2; num <= maxNum; num++) {
    if (isPrimeArr[num]) {
      primeArr.push(num);
    }
  }

  const getPartition = (num) => {
    const halfNum = num / 2;
    let i = 0;
    let fir, sec, last;

    while (true) {
      last = num - primeArr[i];

      if (primeArr.includes(last)) {
        fir = primeArr[i];
        sec = last;
      }

      i++;

      if (halfNum < primeArr[i]) break;
    }

    return `${fir} ${sec}`;
  };

  numArr.forEach((num) => {
    const result = getPartition(num);
    console.log(result);
  });

  /////////////////////////////
  process.exit();
});
