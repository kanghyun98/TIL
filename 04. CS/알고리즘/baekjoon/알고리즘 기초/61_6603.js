// 로또
/* 
TODO: 49가지 수 중 k(k>6)개의 수를 골라 집합 S를 만든 다음 그 수만 가지고 6개 고르기
kC6
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

let result = '';

const arr = [];
const dfs = (lev, len, list) => {
  if (arr.length === 6) {
    result += arr.join(' ') + '\n';
    return;
  }

  for (let i = lev; i < len; i++) {
    arr.push(list[i]);
    dfs(i + 1, len, list);
    arr.pop();
  }
};

inputList.forEach((str) => {
  const [len, ...list] = str.split(' ').map(Number);

  dfs(0, len, list);
  result += '\n';
});

console.log(result.trim());

/////////////////////////////
