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

  const [num] = inputList;

  // 한수인지 확인
  const checkHansuFunc = (n) => {
    let result = true;
    const arr = String(n).split('');

    // 두자릿수 숫자면 무조건 true
    if (arr.length <= 2) {
      return true;
    }

    const diff = Number(arr[1]) - Number(arr[0]);

    for (let i = 0; i < arr.length - 1; i++) {
      if (!result) {
        return false; // false가 한번이라도 나오면 실행x
      }

      if (Number(arr[i + 1]) - Number(arr[i]) === diff) {
        result = true;
      } else {
        result = false;
      }
    }

    return result;
  };

  // 1 ~ n 중 한수의 개수 파악
  const countHansuFunc = (n) => {
    let count = 0;

    for (let i = 1; i <= n; i++) {
      if (checkHansuFunc(i)) {
        count += 1;
      }
    }

    return count;
  };

  const result = countHansuFunc(num);
  console.log(result);

  /////////////////////////////
  process.exit();
});
