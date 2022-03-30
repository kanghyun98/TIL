// 재귀함수를 이용
// [a층 b호] = [a층 (b-1)호] + [(a-1)층 b호]

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

  const [testNum, ...testData] = inputList;

  // 값을 구하는 함수 (a: 층, b: 호수)
  const getNum = (a, b) => {
    if (a === 0) {
      return b;
    }

    if (b === 1) {
      return 1;
    }

    return getNum(a, b - 1) + getNum(a - 1, b);
  };

  for (let i = 0; i < testNum; i++) {
    const a = Number(testData[2 * i]);
    const b = Number(testData[2 * i + 1]);

    const result = getNum(a, b);
    console.log(result);
  }

  /////////////////////////////
  process.exit();
});
