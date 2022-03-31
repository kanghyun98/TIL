// counting sort
// 백준에서 nodejs에 대한 메모리 오류 문제 해결을 하지 않아서 정상적으로 결과가 도출되어도 틀렸다고 뜬다! (젠장)

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

  const [len, ...arr] = inputList;
  const numArr = arr.map(Number);

  const makeCumsumCount = (arr) => {
    const countArr = [];

    arr.forEach((num) => {
      countArr[num] = countArr[num] === undefined ? 1 : countArr[num] + 1;
    });

    const keysArr = Object.keys(countArr);
    let cumsum = 0;

    keysArr.forEach((key) => {
      countArr[key] += cumsum;
      cumsum = countArr[key];
    });

    return countArr;
  };

  const countingSort = (arr) => {
    const sortedArr = [];
    const cumsumCountArr = makeCumsumCount(arr);
    const len = arr.length;

    let target, idx;
    for (let i = len - 1; i >= 0; i--) {
      target = arr[i];
      idx = cumsumCountArr[target] - 1;
      sortedArr[idx] = target;

      cumsumCountArr[target]--;
    }

    return sortedArr;
  };

  const sortedArr = countingSort(numArr);

  let result = '';
  sortedArr.forEach((num) => {
    result += num + '\n';
  });

  console.log(result);

  /////////////////////////////
  process.exit();
});
