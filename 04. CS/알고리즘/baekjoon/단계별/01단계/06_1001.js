const fs = require('fs');
const [a, b] = fs.readFileSync('/dev/stdin').toString().split(' ');

const numA = Number(a);
const numB = Number(b);

console.log(numA - numB);
