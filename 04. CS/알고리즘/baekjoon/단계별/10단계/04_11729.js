// 공식: Hanoi(n) = 2 * Hanoi(n-1) + 1 이므로
// Hanoi(n) = 2^n - 1

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

  const [num] = inputList.map(Number);

  const countHanoi = (n) => {
    return 2 ** n - 1;
  };

  // a -> c 로 옮기는 함수
  const hanoi = (n, a, b, c) => {
    if (n === 1) {
      result += `${a} ${c}\n`;
      return;
    }

    hanoi(n - 1, a, c, b); // a -> b (n-1개)

    result += `${a} ${c}\n`; // a -> c (1개)

    hanoi(n - 1, b, a, c); // b -> c (n-1개)
  };

  let result = '';
  result += countHanoi(num) + '\n';
  hanoi(num, 1, 2, 3);

  console.log(result);
  /////////////////////////////
  process.exit();
});
