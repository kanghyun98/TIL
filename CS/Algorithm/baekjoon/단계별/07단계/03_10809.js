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
  const allSpell = 'abcdefghijklmnopqrstuvwxyz';

  const allSpellArr = allSpell.split(''); // 알파벳 전체
  const wordArr = word.split(''); // 타겟 언어

  let result = '';

  allSpellArr.forEach((w) => {
    const index = wordArr.findIndex((spell) => spell === w);
    result += `${index} `;
  });

  console.log(result);

  /////////////////////////////
  process.exit();
});
