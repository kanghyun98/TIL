// findIndex를 사용했더니 계속 시간초과 뜸..!

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

  const [len, arr] = inputList;
  const numArr = arr.split(' ').map(Number);

  // 중복 없는, 정렬된 배열
  const someArr = [...new Set(numArr)].sort((a, b) => {
    return a > b ? 1 : a < b ? -1 : 0;
  });

  // 각 숫자별 값 반환
  let resultObj = {}; // idx가 자기보다 작은 좌표 개수
  someArr.forEach((val, idx) => {
    resultObj[val] = idx;
  });

  // 순서대로 대입
  let resultArr = [];
  numArr.forEach((num) => {
    resultArr.push(resultObj[num]);
  });

  const result = resultArr.join(' ');

  console.log(result);

  /////////////////////////////
  process.exit();
});
