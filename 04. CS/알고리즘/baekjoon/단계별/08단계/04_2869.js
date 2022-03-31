// 목표 높이 - 하루 올라갈 수 있는 최고 높이를 구하고,
// 해당 값을 가지고 하루에 올라간 높이를 나눠주면 몇 일 걸리는지 구할 수 있다.

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
  const [values] = inputList;

  // v: 목표 높이, a: 올라간 높이, b: 내려온 높이
  const [a, b, v] = values.split(' ');
  const numV = Number(v);
  const numA = Number(a);
  const numB = Number(b);

  const dayHeight = numA; // 하루 올라갈 수 있는 최고 높이
  const dayResult = numA - numB; // 하루가 끝나고 최종 올라간 높이

  const days = Math.ceil((numV - dayHeight) / dayResult) + 1;
  console.log(days);

  /////////////////////////////
  process.exit();
});

// 시간초과 풀이
///////////////////////////////
const [values] = inputList;

// v: 높이, a: 올라간 높이, b: 내려온 높이
const [a, b, v] = values.split(' ');

const numV = Number(v);
const numA = Number(a);
const numB = Number(b);

let today = 0;
let days = 1;

while (true) {
  today += numA;

  if (today >= numV) {
    break;
  }

  today -= numB;
  days += 1;
}

console.log(days);

/////////////////////////////
