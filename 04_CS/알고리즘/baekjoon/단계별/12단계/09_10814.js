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

  const infoArr = arr.map((item) => {
    return item.split(' ');
  });

  const compare = (a, b) => {
    const numA = Number(a[0]);
    const numB = Number(b[0]);

    return numA > numB ? 1 : numA < numB ? -1 : 0;
  };

  const sortedArr = [...infoArr].sort(compare);

  let result = '';
  sortedArr.forEach((inner) => {
    result += `${inner[0]} ${inner[1]}\n`;
  });

  console.log(result);

  /////////////////////////////
  process.exit();
});
