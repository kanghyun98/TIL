// targetNum까지 분해합을 구하고
// 그 중 분해합 결과가 tragetNum과 같은 index가 생성자

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

  const [targetNum] = inputList.map(Number);

  const makeNum = (n) => {
    const numArr = String(n).split('').map(Number);
    let res = n;
    numArr.forEach((num) => {
      res += num;
    });

    return res;
  };

  const resultArr = [];

  for (let i = 0; i <= targetNum; i++) {
    resultArr.push(makeNum(i));
  }

  const targetIndex = resultArr.findIndex((res) => res === targetNum);

  const result = targetIndex !== -1 ? targetIndex : 0;
  console.log(result);

  /////////////////////////////
  process.exit();
});
