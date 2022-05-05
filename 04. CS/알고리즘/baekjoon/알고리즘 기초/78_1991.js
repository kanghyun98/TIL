// 트리 순회
/* 
TODO: 이진 트리를 입력받아 전위 순회, 중위 순회, 후위 순회한 결과를 출력
전위 순회한 결과 : ABDCEFG // (루트) (왼쪽 자식) (오른쪽 자식)
중위 순회한 결과 : DBAECFG // (왼쪽 자식) (루트) (오른쪽 자식)
후위 순회한 결과 : DBEGFCA // (왼쪽 자식) (오른쪽 자식) (루트)
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const [len, ...list] = inputList;
const tree = {};
list.forEach((str) => {
  const [parent, left, right] = str.split(' ');
  tree[parent] = [left, right];
});

const preorderArr = [];
const preorder = (node) => {
  if (node !== '.') {
    preorderArr.push(node);
    preorder(tree[node][0]);
    preorder(tree[node][1]);
  }
};

const inorderArr = [];
const inorder = (node) => {
  if (node !== '.') {
    inorder(tree[node][0]);
    inorderArr.push(node);
    inorder(tree[node][1]);
  }
};

const postorderArr = [];
const postorder = (node) => {
  if (node !== '.') {
    postorder(tree[node][0]);
    postorder(tree[node][1]);
    postorderArr.push(node);
  }
};

preorder('A');
inorder('A');
postorder('A');
console.log(preorderArr.join(''));
console.log(inorderArr.join(''));
console.log(postorderArr.join(''));

/////////////////////////////
