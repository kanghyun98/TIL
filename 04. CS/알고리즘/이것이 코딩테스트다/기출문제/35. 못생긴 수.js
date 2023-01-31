// 못생긴 수: 2, 3, 5를 소인수로 갖는 숫자 (1 포함)
function solve(n) {
  const arr2 = makeArr(2, n);
  const arr3 = makeArr(3, n);
  const arr5 = makeArr(5, n);

  const uglyAllNums = [1, ...arr2, ...arr3, ...arr5];

  const uglyNums = [...new Set(uglyAllNums)]; // 중복 제거
  uglyNums.sort((a, b) => a - b); // 정렬

  const answer = uglyNums[n - 1];
  return answer;
}

function makeArr(i, n) {
  return Array(n)
    .fill(1)
    .map((one, idx) => (idx + 1) * i);
}
