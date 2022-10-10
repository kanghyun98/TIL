// 문제
// 여러 개의 숫자 카드 중에서 가장 높은 숫자 카드 한 장을 뽑기
// 1. 숫자가 쓰인 카드들이 N x M 형태로 놓여있음
// 2. 먼저 뽑고자 하는 카드가 포함되어 있는 행을 선택
// 3. 그 다음 선택된 행에 포함된 카드들 중 가장 낮은 카드를 뽑아야 함
// 4. 따라서 처음 카드를 골라낼 행을 선택할 때, 이후에 해당 행에서 가장 숫자가 낮은 카드를 뽑을 것을 고려하여 최종적으로 가장 높은 숫자의 카드를 뽑을 수 있도록 전략을 세워야 함
// 1 <= N, M <= 100

// 아이디어
// 각 행의 가장 낮은 카드를 뽑아낸 후, 이 중 가장 큰 카드가 속한 행을 선택

function solve(input1, ...input2) {
  const [N, M] = input1.split(' ');

  const minList = [];

  // 각 행의 제일 작은 값 추출
  input2.forEach((input) => {
    const row = input.split(' ').map(Number);
    const minVal = getMin(row);
    minList.push(minVal);
  });

  const maxVal = getMax(minList); // 각 행의 작은 값 중 가장 큰 값 구하기
  return maxVal;
}

function getMin(arr) {
  let min = Number.MAX_SAFE_INTEGER;

  arr.forEach((n) => {
    if (n < min) min = n;
  });

  return min;
}

function getMax(arr) {
  let max = 0;

  arr.forEach((n) => {
    if (n > max) max = n;
  });

  return max;
}

// test
const answer1 = 2;
const test1 = solve('3 3', '3 1 2', '4 1 4', '2 2 2');
console.log(answer1 === test1);

const answer2 = 3;
const test2 = solve('2 4', '7 3 1 8', '3 3 3 4');
console.log(answer2 === test2);
