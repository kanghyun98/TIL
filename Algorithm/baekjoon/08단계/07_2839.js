// 5 * a + 3 * b = N
// N에서 3*i를 빼주면서 5로 나눠떨어지는 지점을 파악한다.

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

  const [totalWeight] = inputList;

  const trials = Math.floor(totalWeight / 3);

  let result;

  for (let i = 0; i <= trials; i++) {
    if ((totalWeight - 3 * i) % 5 === 0) {
      const unit3 = i;
      const unit5 = (totalWeight - 3 * i) / 5;
      result = unit3 + unit5;

      break;
    }

    if (i === trials) {
      result = -1;
    }
  }

  console.log(result);

  /////////////////////////////
  process.exit();
});
