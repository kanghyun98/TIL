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

  const [len, ...arr] = inputList;
  const setList = new Set(arr);

  const compare = (a, b) => {
    if (a.length > b.length) {
      return 1;
    } else {
      if (a.length === b.length) {
        return a > b ? 1 : -1;
      }

      return -1;
    }
  };

  const sortedArr = [...setList].sort(compare);

  let result = '';
  sortedArr.forEach((item) => {
    result += `${item}\n`;
  });

  console.log(result);

  /////////////////////////////
  process.exit();
});
