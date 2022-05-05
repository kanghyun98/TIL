// 집합
/* 
TODO: 비어있는 공집합 S가 주어졌을 때, 아래 연산을 수행
- add x: S에 x를 추가한다. (1 ≤ x ≤ 20) S에 x가 이미 있는 경우에는 연산을 무시한다.
- remove x: S에서 x를 제거한다. (1 ≤ x ≤ 20) S에 x가 없는 경우에는 연산을 무시한다.
- check x: S에 x가 있으면 1을, 없으면 0을 출력한다. (1 ≤ x ≤ 20)
- toggle x: S에 x가 있으면 x를 제거하고, 없으면 x를 추가한다. (1 ≤ x ≤ 20)
- all: S를 {1, 2, ..., 20} 으로 바꾼다.
- empty: S를 공집합으로 바꾼다. 
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const [len, ...list] = inputList;

const bitMask = Array(21).fill(0);

const add = (x) => (bitMask[x] = 1);
const remove = (x) => (bitMask[x] = 0);
const check = (x) => (bitMask[x] ? 1 : 0);
const toggle = (x) => (bitMask[x] = bitMask[x] ? 0 : 1);
const all = () => {
  for (let i = 1; i <= 20; i++) {
    bitMask[i] = 1;
  }
};
const empty = () => {
  for (let i = 1; i <= 20; i++) {
    bitMask[i] = 0;
  }
};

let result = '';

list.forEach((order) => {
  const arr = order.split(' ');
  const orderType = arr[0];
  const x = Number(arr[1]);

  switch (orderType) {
    case 'add':
      add(x);
      break;
    case 'remove':
      remove(x);
      break;
    case 'check':
      result += check(x) + '\n';
      break;
    case 'toggle':
      toggle(x);
      break;
    case 'all':
      all();
      break;
    case 'empty':
      empty();
      break;
  }
});

console.log(result.trim());

/////////////////////////////
