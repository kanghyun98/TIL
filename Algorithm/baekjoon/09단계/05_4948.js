// 주어진 값 중 가장 큰 값을 찾고, 해당 값의 범위(n ~ 2*n)에 대한 소수 찾기
// 그 다음 이를 이용해 다른 숫자들의 범위에 대해서도 구함

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

  // 최댓값에 대한 소수 구하기
  const numArr = inputList.map(Number);
  const maxNum = Math.max(...numArr);

  const isPrimeArr = Array(2 * maxNum + 1).fill(true);

  for (let i = 2; i <= Math.ceil(Math.sqrt(2 * maxNum)); i++) {
    if (isPrimeArr[i]) {
      let t = 2;
      while (t * i <= 2 * maxNum) {
        isPrimeArr[t * i] = false;
        t++;
      }
    }
  }

  // 각 숫자별 소수 구하기
  let result = '';
  numArr.forEach((num) => {
    let count = 0;
    const start = num + 1;
    const end = 2 * num;

    for (let n = start; n <= end; n++) {
      if (isPrimeArr[n]) {
        count++;
      }
    }

    if (count !== 0) {
      result += count + '\n';
    }
  });

  console.log(result);

  /////////////////////////////
  process.exit();
});
