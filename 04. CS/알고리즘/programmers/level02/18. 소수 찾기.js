// 모든 순열에 대해 만들고 소수인지 확인
// 순열(nPr)
const getPermutation = (arr, r) => {
  if (r === 1) return arr.map((val) => [val]);

  const result = [];
  arr.forEach((fixed, idx, origin) => {
    const rest = [...origin.slice(0, idx), ...origin.slice(idx + 1)];
    const permu = getPermutation(rest, r - 1);
    const attached = permu.map((val) => [fixed, ...val]);
    result.push(...attached);
  });

  return result;
};

// 소수 확인
const isPrime = (num) => {
  if (num < 2) return false;

  for (let n = 2; n <= Math.sqrt(num); n++) {
    if (num % n === 0) {
      return false;
    }
  }

  return true;
};

// 실행
function solution(numbers) {
  const numsArr = [];

  const arr = numbers.split('');
  for (let i = 1; i <= numbers.length; i++) {
    const perms = getPermutation(arr, i);
    perms.forEach((val) => {
      numsArr.push(Number(val.join('')));
    });
  }

  const data = new Set(numsArr);

  let answer = 0;
  for (const num of data) {
    answer += isPrime(num) ? 1 : 0;
  }

  return answer;
}
