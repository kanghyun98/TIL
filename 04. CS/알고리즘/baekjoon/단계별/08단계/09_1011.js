// 주어진 값의 절반 이전까지 1씩 증가시킨 값들의 합을 두배해주면 고점까지 찍고 내려온 것이 된다.
// 여기서 같은 값(또는 고점+1)을 몇 개 추가해주어도 돌아오는 것이 항상 보장된다.

// 17: 123 321 (5) => 12343211
// 12: 123 321 (0)
// 13: 123 321 (1) => 1233211
// 9: 12 21 (3) => 321

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

  const [testLen, ...tests] = inputList;

  const getCount = (num) => {
    const half = num / 2;

    let n = 0;
    let sum = 0;
    let count = 0;

    while (true) {
      count++;
      n++;
      sum += n;

      if (sum > half) {
        count = 2 * (count - 1); // 추가 이전 값 (n은 추가 이후 값)
        sum = 2 * (sum - n); // 추가 이전 값
        break;
      }
    }

    let lastNum = num - sum;

    while (n > 0) {
      count += Math.floor(lastNum / n);
      lastNum = lastNum % n;
      n--;
    }

    return count;
  };

  tests.forEach((test) => {
    const [x, y] = test.split(' ');
    const diff = Number(y) - Number(x);
    const result = getCount(diff);

    console.log(result);
  });

  /////////////////////////////
  process.exit();
});
