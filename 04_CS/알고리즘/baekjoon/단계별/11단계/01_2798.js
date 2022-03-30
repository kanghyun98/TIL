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

  // 입력
  const [info, nums] = inputList;
  const [len, targetNum] = info.split(' ').map(Number);
  const numArr = nums.split(' ').map(Number);

  // 브루트 포스 알고리즘
  const resultsArr = [];

  // 5C3
  for (let i = 0; i < len - 2; i++) {
    for (let j = i + 1; j < len - 1; j++) {
      for (let k = j + 1; k < len; k++) {
        resultsArr.push(numArr[i] + numArr[j] + numArr[k]);
      }
    }
  }

  // 크기 순 정렬 후 타겟 숫자보다 작은 값 반환
  resultsArr.sort((a, b) => a - b);
  const targetIndex = resultsArr.findIndex((res) => res > targetNum);
  const resultIndex =
    targetIndex !== -1 ? targetIndex - 1 : resultsArr.length - 1; // 모든 경우에서 합이 targetNum을 넘지 않는 경우 고려

  console.log(resultsArr[resultIndex]);

  /////////////////////////////
  process.exit();
});
