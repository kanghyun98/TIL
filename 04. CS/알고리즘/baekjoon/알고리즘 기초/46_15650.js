// N과 M (2)
/* 
TODO: 자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하기
- 1부터 N까지 자연수 중에서 중복 없이 M개를 고른 수열
- 고른 수열은 오름차순이어야 한다.
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const [N, M] = inputList[0].split(' ').map(Number);

const arr = [];
const dfs = (lev) => {
  if (arr.length === M) {
    console.log(arr.join(' '));
    return;
  }

  for (let i = lev; i <= N; i++) {
    const isFind = arr.find((n) => n === i);

    if (isFind) continue;

    arr.push(i);
    dfs(i + 1);
    arr.pop();
  }
};

dfs(1);

/////////////////////////////
