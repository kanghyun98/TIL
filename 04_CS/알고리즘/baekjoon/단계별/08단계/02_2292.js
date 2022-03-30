// 계차 수열
// 타겟이 중앙으로부터 몇번째 줄에 존재하는지 파악
// 각 줄의 끝번호를 구해서 문제를 해결

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

  // 계차수열
  const [targetNum] = inputList;

  let lastNum = 1;
  let n = 0;

  while (true) {
    lastNum = lastNum + 6 * n;

    if (lastNum >= targetNum) break;

    n += 1;
  }

  console.log(n + 1);

  /////////////////////////////
  process.exit();
});
