// ABCDE
/* 
TODO: 다음과 같은 친구 관계를 가진 사람 A, B, C, D, E가 존재하는지 구하기
- A는 B와 친구다.
- B는 C와 친구다.
- C는 D와 친구다.
- D는 E와 친구다.
-> 그래프(인접 리스트)와 dfs를 이용하여 해결
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const [info, ...list] = inputList;
const [peopleCnt, friendsCnt] = info.split(' ').map(Number);

// graph
const arr = [...Array(peopleCnt)].map(() => []);
list.forEach((str) => {
  const [i, j] = str.split(' ').map(Number);
  arr[i].push(j);
  arr[j].push(i);
});

const visited = Array(peopleCnt).fill(false);

let result = 0;

const dfs = (depth, nowIdx) => {
  if (depth === 4) {
    result = 1;
    return;
  }

  if (result === 1) return;

  arr[nowIdx].forEach((nextIdx) => {
    if (!visited[nextIdx]) {
      visited[nextIdx] = true;
      dfs(depth + 1, nextIdx);
      visited[nextIdx] = false;
    }
  });
};

for (let i = 0; i < peopleCnt; i++) {
  visited[i] = true;
  dfs(0, i);
  visited[i] = false;
}

console.log(result);

/////////////////////////////
