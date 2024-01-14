//  예를 들어, 5까지 만들 수 있다면. 다음 숫자가 7인 경우, 5 ~ 12(5 + 7)까지도 만들 수 있다는 로직 활용
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

  const N = Number(inputList[0]);
  const nums = inputList[1].split(' ').map(Number);
  const sortedNums = nums.sort((a, b) => a - b);

  let answer = 1;

  for (let i = 0; i < N; i++) {
    if (answer < sortedNums[i]) {
      break;
    }

    answer += sortedNums[i];
  }

  console.log(answer);

  /////////////////////////////
  process.exit();
});
