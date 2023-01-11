// 1. 국어 - 내림차순
// 2. 영어 - 오름차순
// 3. 수학 - 내림차순
// 4. 이름 - 사전순(오름차순)
const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const [len, ...list] = inputList;

const infoArr = list.map((li) => {
  const [name, ...scoresStr] = li.split(' ');
  const scores = scoresStr.map(Number);

  return [name, ...scores];
});

infoArr.sort((a, b) => {
  const korDesc = b[1] - a[1];
  const engAsc = a[2] - b[2];
  const mathDesc = b[3] - a[3];

  if (korDesc) return korDesc;
  if (engAsc) return engAsc;
  if (mathDesc) return mathDesc;
  if (a[0] < b[0]) return -1;
  if (a[0] > b[0]) return 1;
  return 0;
});

let answer = '';
infoArr.forEach((info) => {
  answer += info[0] + '\n';
});

console.log(answer);
/////////////////////////////
