// 두 점
// d < r1 + r2 && d > Math.abs(r2 - r1);

// 한 점 (외접, 내접)
// d === r1 + r2 || (d === Math.abs(r2 - r1) && d !== 0);

// x (외부, 내부)
// d > r1 + r2 || d < Math.abs(r2 - r1);

// 무수히 많은 경우 (겹치는 경우)
// d === 0 && r1 === r2;

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

  const [len, ...testArr] = inputList;

  const countMeetFunc = (x1, y1, r1, x2, y2, r2) => {
    const d = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

    let count;

    if (d < r1 + r2 && d > Math.abs(r2 - r1)) {
      count = 2;
    } else if (d === r1 + r2 || (d === Math.abs(r2 - r1) && d !== 0)) {
      count = 1;
    } else if (d > r1 + r2 || d < Math.abs(r2 - r1)) {
      count = 0;
    } else if (d === 0 && r1 === r2) {
      count = -1;
    } else {
      return;
    }

    return count;
  };

  testArr.forEach((values) => {
    const [x1, y1, r1, x2, y2, r2] = values.split(' ').map(Number);
    const result = countMeetFunc(x1, y1, r1, x2, y2, r2);
    console.log(result);
  });

  /////////////////////////////
  process.exit();
});
