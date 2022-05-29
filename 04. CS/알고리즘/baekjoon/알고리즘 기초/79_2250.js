// 트리의 높이와 너비
/* 
TODO: 주어진 이진트리를 위의 규칙에 따라 그릴 때에 너비가 가장 넓은 레벨과 그 레벨의 너비를 계산
조건) 너비가 가장 넓은 레벨이 두 개가 있으면, 번호가 작은 레벨을 답으로 함
중위 순회(왼쪽 자식, 루트, 오른쪽 자식)
폭: 노드 개수 (중위순회하면서 순차적으로 삽입)
깊이: 노드의 깊이 (재귀의 깊이에 따른 값 삽입)
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const [len, ...list] = inputList;

// 이진 트리 생성
const tree = {};
const checkRoot = {};
let root = 0;

list.forEach((li) => {
  const [parent, left, right] = li.split(' ').map(Number);
  tree[parent] = [left, right];

  // root 찾기 위해
  checkRoot[parent] = (checkRoot[parent] || 0) + 1;
  if (left !== -1) checkRoot[left] = (checkRoot[parent] || 0) + 1;
  if (right !== -1) checkRoot[right] = (checkRoot[parent] || 0) + 1;
});

for (const key in checkRoot) {
  if (checkRoot[key] === 1) root = Number(key);
}

// 중위 순회하면서 (lev=depth, 위치값=count)로 넣어줌
const widthOfLevel = {};
let count = 0;
const inorder = (node, depth) => {
  if (node !== -1) {
    inorder(tree[node][0], depth + 1);

    count++;
    if (!widthOfLevel[depth]) widthOfLevel[depth] = [];
    widthOfLevel[depth].push(count);

    inorder(tree[node][1], depth + 1);
  }
};

inorder(root, 1); // 중위순회

// 최대 너비와 해당 레벨 구하기
let maxLev = 1;
let maxWidth = 1;
for (const lev in widthOfLevel) {
  const eachArr = widthOfLevel[lev];
  const arrLen = eachArr.length;

  if (arrLen > 1) {
    const diff = eachArr[arrLen - 1] - eachArr[0] + 1;
    if (diff > maxWidth) {
      maxLev = lev;
      maxWidth = diff;
    }
  }
}

console.log(`${maxLev} ${maxWidth}`);

/////////////////////////////
