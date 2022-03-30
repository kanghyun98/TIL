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

  const changedSpells = ['c=', 'c-', 'dz=', 'd-', 'lj', 'nj', 's=', 'z='];

  let changedWord = word;

  changedSpells.forEach((spell) => {
    changedWord = changedWord.split(spell).join('@');
  });

  const spellArr = changedWord.trim().split('');
  const result = spellArr[0] ? spellArr.length : 0;
  console.log(result);

  /////////////////////////////
  process.exit();
});
