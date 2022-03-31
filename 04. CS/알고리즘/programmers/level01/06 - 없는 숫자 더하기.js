// 총합에서 부분합을 빼주어서 구함

function solution(numbers) {
  const allSum = 45;
  const subSum = numbers.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  const answer = allSum - subSum;
  return answer;
}
