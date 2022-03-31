// 목표 타겟이 대각선 기준으로 몇번째 줄인지 구하고,
// 해당

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

  const [targetNum] = inputList;

  let n = 0;
  let sumNum = 1; // 홀: 분모 올림, 짝: 분자 올림
  let result;

  while (true) {
    n += sumNum;

    if (n >= targetNum) {
      const beforeNum = n - sumNum;

      // 분모 or 분자
      const firVal = targetNum - beforeNum; // 올림
      const secVal = sumNum - firVal + 1; // 내림

      result = sumNum % 2 === 0 ? `${firVal}/${secVal}` : `${secVal}/${firVal}`;

      break;
    }

    sumNum += 1;
  }

  console.log(result);

  /////////////////////////////
  process.exit();
});
