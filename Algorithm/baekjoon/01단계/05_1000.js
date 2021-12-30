// 풀이 1 (틀렸다는데 왜 틀린지 모르겠다..)

// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question('input A and B: ', (input) => {
//   const [a, b] = input.split(' ');

//   if (a && b) {
//     const numA = Number(a);
//     const numB = Number(b);
//     if (numA && numB) {
//       console.log(numA + numB);
//     }
//   }

//   rl.close();
// });

// 풀이 2
const fs = require('fs');
const [a, b] = fs.readFileSync('/dev/stdin').toString().split(' ');

const numA = Number(a);
const numB = Number(b);

console.log(numA + numB);

`
피드백)
문제를 똑바로 읽고 풀자.
`;
