const fs = require('fs');
const num = fs.readFileSync('/dev/stdin');

const makeResult = (num) => {
  if (num <= 1 || num > 4000) {
    return;
  }

  if (num % 4 === 0) {
    if (num % 100 !== 0 || num % 400 === 0) {
      console.log(1);
    } else {
      console.log(0);
    }
  } else {
    console.log(0);
  }
};

makeResult(num);
