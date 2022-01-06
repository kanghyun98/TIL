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
  const [a, b, c] = inputList;
  const num = String(a * b * c);

  const numArr = num.split('');

  const resultObj = {};

  numArr.forEach((num) => {
    const index = Number(num);
    resultObj[index] ? (resultObj[index] += 1) : (resultObj[index] = 1);
  });

  for (let i = 0; i < 10; i++) {
    if (!resultObj[i]) {
      console.log(0);
    } else {
      console.log(resultObj[i]);
    }
  }

  /////////////////////////////
  process.exit();
});

// 더 효율적인 방법이 있을 것 같아 찾아보았다.
// 방법1

///////////////////////////////
const [a, b, c] = inputList;
const num = String(a * b * c);

for (let i = 0; i <= 9; i++) {
  console.log(num.split(i).length - 1);
}

/////////////////////////////

// 방법2
///////////////////////////////
const [a, b, c] = inputList;
const num = String(a * b * c);

for (let i = 0; i <= 9; i++) {
  let count = 0;
  for (let j = 0; j < num.length; j++) {
    if (num[j] == i) {
      count++;
    }
  }
  console.log(count);
}

/////////////////////////////
