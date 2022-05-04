// 차이를 최대로
/* 
TODO: 배열에 들어있는 정수의 순서를 적절히 바꿔서 다음 식의 최댓값을 구하기
|A[0] - A[1]| + |A[1] - A[2]| + ... + |A[N-2] - A[N-1]|
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const len = Number(inputList[0]);
const arr = inputList[1].split(' ').map(Number);

let result = 0;

const newArr = [];
const visited = Array(len).fill(0);

const dfs = () => {
  if (newArr.length === len) {
    let sum = 0;
    newArr.forEach((v, idx) => {
      if (idx < newArr.length - 1) {
        const next = newArr[idx + 1] || 0;
        sum += Math.abs(v - next);
      }
    });

    result = Math.max(sum, result);
    return;
  }

  for (let i = 0; i < len; i++) {
    if (!visited[i]) {
      visited[i] = 1;
      newArr.push(arr[i]);
      dfs();
      newArr.pop();
      visited[i] = 0;
    }
  }
};

dfs();
console.log(result);

/////////////////////////////
