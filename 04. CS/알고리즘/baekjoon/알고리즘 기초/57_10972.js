// 다음 순열
/* 
TODO: 사전순으로 다음에 오는 순열을 구하기
뒤에서부터 내림차순 아닌 위치값을 기준으로 split
- 우측항에서 기준값보다 큰 숫자 중 제일 작은 수와 기준값 교체
- 우측항을 내림차순으로 정렬
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

///////////////////////////////

const len = Number(inputList[0]);
const arr = inputList[1].split(' ').map(Number);
let result = -1;

for (let i = len - 1; i > 0; i--) {
  if (arr[i] > arr[i - 1]) {
    const leftArr = arr.filter((_, idx) => idx < i - 1);
    let target = arr[i - 1];
    const rightArr = arr.filter((_, idx) => idx >= i);

    let smallestIdxOfBiggers = 0;
    rightArr.forEach((val, idx) => {
      if (val > target && rightArr[smallestIdxOfBiggers] > val) {
        smallestIdxOfBiggers = idx;
      }
    });

    const changedTarget = rightArr[smallestIdxOfBiggers];
    rightArr[smallestIdxOfBiggers] = target;
    rightArr.sort((a, b) => a - b);

    result = [...leftArr, changedTarget, ...rightArr].join(' ');
    break;
  }
}

console.log(result);

/////////////////////////////
