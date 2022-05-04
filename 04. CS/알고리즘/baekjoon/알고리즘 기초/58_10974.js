// 모든 순열
/* 
TODO: N이 주어졌을 때, 1부터 N까지의 수로 이루어진 순열을 사전순으로 출력하
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const N = Number(inputList[0]);
let result = '';

const arr = [];
const dfs = () => {
  if (arr.length === N) {
    result += arr.join(' ') + '\n';
    return;
  }

  for (let i = 1; i <= N; i++) {
    const isFind = arr.find((n) => n === i);

    if (isFind) continue;

    arr.push(i);
    dfs();
    arr.pop();
  }
};

dfs();
console.log(result.trim());

/////////////////////////////
