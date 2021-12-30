const fs = require('fs');
const [a, b, c] = fs.readFileSync('/dev/stdin').toString().split(' ');

const makeResult = (a, b, c) => {
  const numA = Number(a);
  const numB = Number(b);
  const numC = Number(c);

  console.log((numA + numB) % numC);
  console.log(((numA % numC) + (numB % numC)) % numC);
  console.log((numA * numB) % numC);
  console.log(((numA % numC) * (numB % numC)) % numC);
};

makeResult(a, b, c);
