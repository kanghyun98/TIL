// 각 자릿수별로 합을 구한 후 문자열로 추가해준다.
// 자릿수를 맞추기 위해 0을 작은 숫자의 앞에 추가해준다.

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

  const [values] = inputList;
  const [a, b] = values.split(' ');

  // 길이 맞추기
  let bigLenNum, smallLenNum;

  if (a.length >= b.length) {
    bigLenNum = a.split('');
    smallLenNum = b.split('');
  } else {
    bigLenNum = b.split('');
    smallLenNum = a.split('');
  }

  const diff = bigLenNum.length - smallLenNum.length;

  for (let i = 0; i < diff; i++) {
    smallLenNum.unshift('0');
  }

  // 각 자리별 덧셈
  const resultArr = [];

  let plus = 0; // 넘김
  const len = bigLenNum.length;

  for (let i = 1; i <= len; i++) {
    let sum = Number(bigLenNum[len - i]) + Number(smallLenNum[len - i]) + plus; // 뒤에서 부터

    if (sum < 10 || i === len) {
      // 10보다 작은 경우 or 마지막
      plus = 0;
    } else {
      // 10보다 큰 경우
      sum = sum - 10;
      plus = 1;
    }

    resultArr.unshift(sum);
  }

  const result = resultArr.join('');
  console.log(result);

  /////////////////////////////
  process.exit();
});
