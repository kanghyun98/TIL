const fs = require('fs');
const num = fs.readFileSync('/dev/stdin');

const makeResult = (num) => {
  if (num < 0 || num > 100) {
    return;
  }

  if (num >= 90) {
    console.log('A');
  } else if (num >= 80) {
    console.log('B');
  } else if (num >= 70) {
    console.log('C');
  } else if (num >= 60) {
    console.log('D');
  } else {
    console.log('F');
  }
};

makeResult(num);
