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

  // 산술평균
  const getMean = (arr) => {
    let sum = 0;
    arr.forEach((num) => {
      sum += num;
    });

    const mean = Math.round(sum / arr.length);
    return mean;
  };

  // 중앙값
  const getMedian = (arr) => {
    arr.sort((a, b) => a - b); // 정렬

    if (arr.length % 2 === 1) {
      // 홀수
      const idx = Math.ceil(arr.length / 2);
      return arr[idx - 1];
    } else {
      // 짝수
      const idx = arr.length / 2;
      return (arr[idx - 1] + arr[idx]) / 2;
    }
  };

  // 최빈값 (여러개면 두 번째로 작은 값)
  const getMode = (arr) => {
    const countArr = [];
    arr.forEach((num) => {
      countArr[num] = countArr[num] === undefined ? 1 : countArr[num] + 1;
    });

    const keysArr = Object.keys(countArr);
    let maxIdx = keysArr[0];

    keysArr.forEach((key) => {
      if (countArr[key] > countArr[maxIdx]) {
        maxIdx = key;
      }
    });

    const resultArr = [];
    keysArr.forEach((key) => {
      if (countArr[key] === countArr[maxIdx]) {
        resultArr.push(key);
      }
    });

    const res = resultArr.map(Number).sort((a, b) => a - b);

    const result = res[1] !== undefined ? res[1] : res[0];
    return result;
  };

  // 범위
  const getRange = (arr) => {
    arr.sort((a, b) => a - b); // 정렬

    const start = arr[0];
    const last = arr[arr.length - 1];

    return last - start;
  };

  const resultArr = [
    getMean(numArr),
    getMedian(numArr),
    getMode(numArr),
    getRange(numArr),
  ];

  let result = '';
  resultArr.forEach((num) => {
    result += num + '\n';
  });

  console.log(result);

  /////////////////////////////
  process.exit();
});
