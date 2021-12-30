const fs = require('fs');
const [a, b] = fs.readFileSync('/dev/stdin').toString().split(' ');

const makeResult = (a, b) => {
  const numA = Number(a);
  const numB = Number(b);

  if (numA > numB) {
    console.log('>');
  } else if (numA < numB) {
    console.log('<');
  } else if (numA === numB) {
    console.log('==');
  } else {
    return;
  }
};

makeResult(a, b);
