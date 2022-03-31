// num이 소수인지 파악하는데 Math.sqrt(num)까지만 나눠도 충분하다는 사실을 이용

function solution(nums) {
  let answer = 0;
  let len = nums.length;

  // 소수인지 파악하는 함수
  const isPrime = (num) => {
    if (num === 2) return true;
    if (num === 1) return false;

    let result = true;
    const targetNum = Math.ceil(Math.sqrt(num));

    for (let n = 2; n < targetNum; n++) {
      if (num % n === 0) {
        result = false;
        break;
      }
    }

    return result;
  };

  for (let i = 0; i < len - 2; i++) {
    for (let j = i + 1; j < len - 1; j++) {
      for (let k = j + 1; k < len; k++) {
        answer += isPrime(nums[i] + nums[j] + nums[k]) ? 1 : 0;
      }
    }
  }

  return answer;
}
