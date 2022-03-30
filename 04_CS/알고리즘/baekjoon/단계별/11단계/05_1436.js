// i가 666 부터 증가
// i를 문자열로 바꾸고 666 포함하면 count++
// count가 입력값이 될 때 종료

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

  let i = 666;
  let count = 1;
  let result;

  while (count <= targetNum) {
    if (String(i).includes('666')) {
      result = i;
      count++;
    }

    i++;
  }

  console.log(result);

  /////////////////////////////
  process.exit();
});
