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
  const numArr = arr.map((nums) => {
    return nums.split(' ').map(Number);
  });

  const compare = (a, b) => {
    if (a[1] > b[1]) {
      return 1;
    } else {
      if (a[1] === b[1]) {
        return a[0] > b[0] ? 1 : -1;
      }

      return -1;
    }
  };

  numArr.sort(compare);

  let result = '';
  numArr.forEach((inner) => {
    result += `${inner[0]} ${inner[1]}\n`;
  });

  console.log(result);

  /////////////////////////////
  process.exit();
});
