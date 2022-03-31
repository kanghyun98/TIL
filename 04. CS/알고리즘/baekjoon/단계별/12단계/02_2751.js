// O(nlogn) 정렬: 병합, 힙 정렬

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inputList = [];

rl.on('line', function (input) {
  inputList.push(input);
}).on('close', function () {
  ///////////////////////////////

  const [len, ...arr] = inputList;
  const numArr = arr.map(Number);

  // leftArr과 rightArr이 각각 정렬되어 있어야 함
  const mergeFunc = (leftArr = [], rightArr = []) => {
    let mergedArr = [];
    const leftLen = leftArr ? leftArr.length : 0;
    const rightLen = rightArr ? rightArr.length : 0;
    const totalLen = leftLen + rightLen;

    let min;
    let i = 0; // left index
    let j = 0; // right index

    while (mergedArr.length < totalLen) {
      // 끝에 도달했을 경우
      if (leftArr[i] === undefined) {
        for (let n = j; n < rightLen; n++) {
          mergedArr.push(rightArr[n]);
        }

        return mergedArr;
      }

      if (rightArr[j] === undefined) {
        for (let n = i; n < leftLen; n++) {
          mergedArr.push(leftArr[n]);
        }

        return mergedArr;
      }

      // 하나라도 끝에 도달하기 전
      min = leftArr[i] < rightArr[j] ? leftArr[i++] : rightArr[j++];
      mergedArr.push(min);
    }
  };

  const mergeSort = (arr) => {
    if (arr.length < 2) {
      return arr;
    }

    const leftLen = Math.floor(arr.length / 2);

    const leftArr = mergeSort(arr.splice(0, leftLen));
    const rightArr = mergeSort(arr);

    const sortedArr = mergeFunc(leftArr, rightArr);
    return sortedArr;
  };

  // 결과
  const sortedArr = mergeSort(numArr);

  let result = '';
  sortedArr.forEach((num) => {
    result += num + '\n';
  });

  console.log(result);

  /////////////////////////////
  process.exit();
});

// merge sort 모범 답안
const merge = (leftArr, rightArr) => {
  const mergedArr = [];

  while (leftArr.length && rightArr.length) {
    leftArr[0] < rightArr[0]
      ? mergedArr.push(leftArr.shift())
      : mergedArr.push(rightArr.shift());
  }

  while (leftArr.length) mergedArr.push(leftArr.shift());
  while (rightArr.length) mergedArr.push(rightArr.shift());

  return mergedArr;
};

const mergeSort = (arr) => {
  if (arr.length < 2) {
    return arr; // 원소 1개이면 그대로 반환
  }

  const leftLen = Math.floor(arr.length / 2); // 왼쪽 배열 길이 설정

  const leftArr = mergeSort(arr.splice(0, leftLen)); // slice 이용 가능
  const rightArr = mergeSort(arr);

  return merge(leftArr, rightArr);
};
