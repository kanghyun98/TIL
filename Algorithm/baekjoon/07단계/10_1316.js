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

  const [len, ...wordArr] = inputList;

  const checkGroupWord = (word) => {
    const checkArr = [word[0]]; // 초기값

    for (let i = 1; i < word.length; i++) {
      if (word[i - 1] !== word[i]) {
        checkArr.push(word[i]);
      }
    }

    const set = new Set(checkArr);
    const isGroupWord = set.size === checkArr.length ? true : false;
    return isGroupWord;
  };

  let count = 0;
  wordArr.forEach((word) => {
    if (checkGroupWord(word)) {
      count += 1;
    }
  });

  console.log(count);

  /////////////////////////////
  process.exit();
});
