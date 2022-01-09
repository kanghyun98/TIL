// O(N^2) 정렬: 버블, 삽입, 선택 정렬
// 비교와 교환 중 교환이 더 많은 시간이 소요되므로 버블, 삽입 정렬이 아닌 선택 정렬 선택

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

  const selectionSort = (arr) => {
    const len = arr.length;

    for (let i = 0; i < len; i++) {
      let minIndex = i;

      for (let j = i; j < len; j++) {
        if (arr[minIndex] > arr[j]) {
          minIndex = j;
        }
      }

      const val = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = val;
    }

    return arr;
  };

  const sortedArr = selectionSort(numArr);

  let result = '';
  sortedArr.forEach((num) => {
    result += num + '\n';
  });

  console.log(result);

  /////////////////////////////
  process.exit();
});
