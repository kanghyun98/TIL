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

  // 남은 한 개 구하는 함수
  const getResult = (arr) => {
    let count = 0;
    let other;

    for (let i = 1; i < arr.length; i++) {
      if (arr[0] === arr[i]) {
        count++;
      } else {
        other = arr[i];
      }
    }

    const result = count === 1 ? other : arr[0];

    return result;
  };

  // x, y 각각 분리
  let xArr = [];
  let yArr = [];

  inputList.forEach((val) => {
    const [x, y] = val.split(' ').map(Number);

    xArr.push(x);
    yArr.push(y);
  });

  // 결과 반환
  const targetX = getResult(xArr);
  const targetY = getResult(yArr);
  console.log(`${targetX} ${targetY}`);

  /////////////////////////////
  process.exit();
});
