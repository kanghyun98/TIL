// N과 M (4)
/* 
TODO: 자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하기
- 1부터 N까지 자연수 중에서 중복 없이 M개를 고른 수열
- 같은 수를 여러 번 골라도 된다.
- 고른 수열은 비내림차순이어야 한다.
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

let result = '';
const [N, M] = inputList[0].split(' ').map(Number);

const arr = [];
const dfs = (lev) => {
  if (arr.length === M) {
    result += arr.join(' ') + '\n';
    return;
  }

  for (let i = lev; i <= N; i++) {
    arr.push(i);
    dfs(i);
    arr.pop();
  }
};

dfs(1);

console.log(result.trim());

/////////////////////////////
