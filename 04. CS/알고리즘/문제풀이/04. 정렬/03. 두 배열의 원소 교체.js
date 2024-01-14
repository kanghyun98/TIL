// K번의 교환 이후, A가 최대가 되는 A 조합의 합 구하기
// A의 제일 작은 원소 <-> B의 제일 큰 원소
function solve(...inputs) {
  const [N, K] = inputs[0].split(' ').map(Number);
  const arrA = inputs[1].split(' ').map(Number);
  const arrB = inputs[2].split(' ').map(Number);

  // A는 오름차순, B는 내림차순 정렬
  arrA.sort((a, b) => a - b);
  arrB.sort((a, b) => b - a);

  for (let i = 0; i < K; i++) {
    arrA[i] = arrB[i];
  }

  const answer = arrA.reduce((acc, cur) => acc + cur, 0);
  return answer;
}

// test
const answer1 = 26;
const test1 = solve('5 3', '1 2 5 4 3', '5 5 6 6 5');
console.log(answer1 === test1);
