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

  const makeNewWord = (len, word) => {
    let result = '';

    word.split('').forEach((spell) => {
      for (let i = 0; i < len; i++) {
        result += spell;
      }
    });

    return result;
  };

  inputList.forEach((input) => {
    const [len, word] = input.split(' ');

    if (word) {
      const result = makeNewWord(len, word);
      console.log(result);
    }
  });
  /////////////////////////////
  process.exit();
});
