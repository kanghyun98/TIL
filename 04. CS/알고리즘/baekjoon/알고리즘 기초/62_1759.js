// 암호 만들기
/* 
TODO: C개의 문자들이 모두 주어졌을 때, 가능성 있는 암호들을 모두 구하기 (자릿수: L)
조건) 최소 한개의 모음, 두 개의 자음을 포함하는지
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const [L, C] = inputList[0].split(' ').map(Number);

const arr = inputList[1].split(' ');
arr.sort();

const isMoemArr = arr.map((alp) => {
  let flag = false;
  for (a of 'aeiou') {
    if (alp === a) flag = true;
  }
  return flag;
});

let result = '';
const visited = Array(C).fill(false);
let newArr = [];

const dfs = (lev, moemCount, jaemCount) => {
  if (newArr.length === L) {
    if (moemCount > 0 && jaemCount > 1) {
      result += newArr.join('') + '\n';
    }
    return;
  }

  for (let i = lev; i < C; i++) {
    isMoemArr[i] ? moemCount++ : jaemCount++; // 모음인지 자음인지
    newArr.push(arr[i]);

    dfs(i + 1, moemCount, jaemCount);

    // 되돌리기
    newArr.pop();
    isMoemArr[i] ? moemCount-- : jaemCount--;
  }
};

dfs(0, 0, 0);

console.log(result.trim());

/////////////////////////////
