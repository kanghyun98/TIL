// 나보다 큰 사람만 몇명인지가 나의 순위.

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

  const [num, ...peopleInfo] = inputList;

  const infoArr = peopleInfo.map((info) => {
    return info.split(' ').map(Number);
  });

  let resultArr = [];
  let myInfo, otherInfo;

  for (let i = 0; i < num; i++) {
    let count = 1;

    for (let j = 0; j < num; j++) {
      myInfo = infoArr[i];
      otherInfo = infoArr[j];

      if (otherInfo[0] > myInfo[0] && otherInfo[1] > myInfo[1]) {
        count++;
      }
    }

    resultArr.push(count);
  }

  let result = '';
  resultArr.forEach((res) => {
    result += `${res} `;
  });

  console.log(result);

  /////////////////////////////
  process.exit();
});
