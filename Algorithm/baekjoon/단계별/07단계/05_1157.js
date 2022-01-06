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

  const [word] = inputList;
  const changedWord = word.toUpperCase();

  const spellArr = changedWord.split('');

  const resultObj = {};

  spellArr.forEach((spell) => {
    resultObj[spell] = resultObj[spell] ? resultObj[spell] + 1 : 1;
  });

  let maxKey;
  let isMaxMulti = false;

  Object.keys(resultObj).forEach((key) => {
    if (!maxKey) {
      maxKey = key;
    }

    if (resultObj[key] > resultObj[maxKey]) {
      maxKey = key;
      isMaxMulti = false; // 변경되면 초기화
    }

    if (resultObj[key] === resultObj[maxKey] && key !== maxKey) {
      isMaxMulti = true;
    }
  });

  const result = isMaxMulti ? '?' : maxKey;

  console.log(result);

  /////////////////////////////
  process.exit();
});
