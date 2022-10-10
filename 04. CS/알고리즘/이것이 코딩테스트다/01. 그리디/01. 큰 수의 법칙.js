// 문제
// 다양한 수로 이루어진 배열이 있을 때, 주어진 수들을 M번 더하여 가장 큰 수를 만드는 법칙
// 배열의 특정한 인덱스(번호)에 해당하는 수가 연속해서 K번을 초과하여 더해질 수 없음
// 배열의 크기: N(2 <= N <= 1000), 숫자가 더해지는 횟수: M(1 <= M <= 10,000), 제한된 덧셈 횟수: K(1 <= K <= 10,000)

// 아이디어
// 내림차순 정렬 후(혹은 가장 큰 수와 두번째로 큰 수를 구한 후),
// 가장 큰 값을 K번 더하고 두번째로 큰 값을 1번 더하고, 다시 가장 큰 값을 K번 더하는 것을 반복하여 구하는 방식 이용
// quotient = M // K + 1
// remainder = M % K + 1
// 가장 큰 수를 더하는 횟수 = K * quotient + remainder
// 두번째로 큰 수를 더하는 횟수 = 남은 횟수

function solve(input1, input2) {
  const [N, M, K] = input1.split(' ').map(Number);
  const numArr = input2.split(' ').map(Number);

  numArr.sort((a, b) => b - a); // 오름차순 정렬

  const max1 = numArr[0]; // 가장 큰 수
  const max2 = numArr[1]; // 두번째로 큰 수

  // 위 로직 활용
  const quotient = Math.floor(M / (K + 1));
  const remainder = M % (K + 1);

  const max1SumCount = K * quotient + remainder;
  const max2SumCount = M - max1SumCount;

  const answer = max1 * max1SumCount + max2 * max2SumCount;

  return answer;
}

// test
const answer1 = 46;
const test1 = solve('5 8 3', '2 4 5 4 6');
console.log(test1 === answer1);
