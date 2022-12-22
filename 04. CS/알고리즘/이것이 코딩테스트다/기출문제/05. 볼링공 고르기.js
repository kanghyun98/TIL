// 다른 무게 조합 만들기
// 전체 - 같은 무게 고른 조합
function solve(...inputs) {
  const [N, M] = inputs[0].split(' ').map(Number);
  const weightList = inputs[1].split(' ').map(Number);

  // 무게별 개수 파악
  const eachWeightCount = {};

  weightList.forEach((w) => {
    if (eachWeightCount[w] === undefined) eachWeightCount[w] = 0;
    eachWeightCount[w]++;
  });

  // 계산
  let count = getNC2(N); // NC2

  Object.keys(eachWeightCount).forEach((w) => {
    const dupCount = getNC2(eachWeightCount[w]);
    count -= dupCount;
  });

  return count;
}

function getNC2(n) {
  return (n * (n - 1)) / 2;
}

// test
const answer1 = 8;
const test1 = solve('5 3', '1 3 2 3 2');
console.log(answer1 === test1);

const answer2 = 25;
const test2 = solve('8 5', '1 5 4 3 2 4 5 2');
console.log(answer2 === test2);
