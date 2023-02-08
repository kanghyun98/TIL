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

  const [info, ...arr] = inputList;

  const [N, C] = info.split(' ').map(Number);
  const nums = arr.map(Number).sort((a, b) => a - b); // 정렬

  let start = 1;
  let end = nums[N - 1] - nums[0];
  let answer = 0;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    let target = nums[0];
    let count = 1;

    for (let i = 1; i < N; i++) {
      // 다음 집이 최대 거리보다 멀리 있는 경우 설치
      if (nums[i] >= target + mid) {
        target = nums[i];
        count += 1;
      }
    }

    if (count >= C) {
      start = mid + 1;
      answer = mid;
    } else {
      end = mid - 1;
    }
  }

  console.log(answer);

  /////////////////////////////
  process.exit();
});
