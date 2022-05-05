// 부분수열의 합
/* 
TODO: N개의 정수로 이루어진 수열이 있을 때, 크기가 양수인 부분수열 중에서 그 수열의 원소를 다 더한 값이 S가 되는 경우의 수를 구하기
dfs로 모두 확인
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const [N, S] = inputList[0].split(' ').map(Number);
const arr = inputList[1].split(' ').map(Number);

let count = S ? 0 : -1;
const dfs = (idx, sum) => {
  if (idx === N) {
    if (sum === S) count++;
    return;
  }

  dfs(idx + 1, sum + arr[idx]);
  dfs(idx + 1, sum);
};

dfs(0, 0);

console.log(count);

/////////////////////////////
