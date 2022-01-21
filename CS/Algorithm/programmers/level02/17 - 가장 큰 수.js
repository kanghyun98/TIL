// 순열(nPn)을 이용한 방법, 시간초과!
const getPermutation = (arr, select) => {
  const result = [];

  if (select === 1) return arr.map((val) => [val]);

  arr.forEach((fixed, idx, origin) => {
    const rest = [...origin.slice(0, idx), ...origin.slice(idx + 1)];
    const permu = getPermutation(rest, select - 1);
    const attached = permu.map((val) => [fixed, ...val]);
    result.push(...attached);
  });

  return result;
};

function solution(numbers) {
  const permuList = getPermutation(numbers, numbers.length);

  const allNums = permuList.map((vals) => {
    return vals.reduce((acc, cur) => acc + String(cur));
  });

  return `${Math.max(...allNums.map(Number))}`;
}

// 두번째 풀이
function solution(numbers) {
  const answer = [...numbers]
    .map(String)
    .sort((a, b) => b + a - (a + b))
    .join('');

  return answer[0] === '0' ? '0' : answer;
}
