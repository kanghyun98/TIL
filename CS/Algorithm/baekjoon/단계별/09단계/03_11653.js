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

  const [val] = inputList.map(Number);

  const getResultArr = (num) => {
    let i = 2;
    let resultArr = [];
    let lastNum = num;

    while (true) {
      if (lastNum % i === 0) {
        resultArr.push(i);
        lastNum = lastNum / i;
      } else {
        i++;
      }

      if (lastNum === 1) break;
    }

    return resultArr;
  };

  const result = getResultArr(val);
  result.forEach((num) => console.log(num));

  /////////////////////////////
  process.exit();
});
