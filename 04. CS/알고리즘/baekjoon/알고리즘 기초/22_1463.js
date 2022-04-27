// 1로 만들기
/*
1. X가 3으로 나누어 떨어지면, 3으로 나눈다.
2. X가 2로 나누어 떨어지면, 2로 나눈다.
3. 1을 뺀다.
TODO: 정수 N이 주어졌을 때, 위와 같은 연산 세 개를 적절히 사용해서 1을 만들려고 한다. 연산을 사용하는 횟수의 최솟값을 출력

dfs 방식을 이용하여 연산 사용하는 횟수가 최소가 되는 경우를 구한다
minCount를 넘어서는 연산의 경우, 그 자리에서 종료하여 실행시간을 단축한다.
*/

const fs = require('fs');
const inputList = fs.readFileSync('/dev/stdin').toString().split('\n');

///////////////////////////////

const [inputNum] = inputList.map(Number);
let minCount = inputNum;

const dfs = (n, count) => {
  if (count > minCount) return;

  if (n === 1) {
    minCount = count < minCount ? count : minCount;
    return;
  }

  if (n % 3 === 0) dfs(n / 3, count + 1);
  if (n % 2 === 0) dfs(n / 2, count + 1);
  dfs(n - 1, count + 1);
};

dfs(inputNum, 0);

console.log(minCount);

/////////////////////////////
